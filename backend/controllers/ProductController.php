<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\Product;
use yii\web\NotFoundHttpException;
use app\models\ProductSearch;
use yii\filters\VerbFilter;
use yii\web\UploadedFile;

class ProductController extends Controller
{
    public function beforeAction($action)
    {
        $allowedActions = ['products', 'product'];

        if (in_array($action->id, $allowedActions)) {
            return true;
        }

        if (Yii::$app->user->isGuest || Yii::$app->user->identity->admin === 0) {
            $this->redirect(['/site/login']);
            return false;
        }

        return true;
    }

    public function behaviors()
    {
        return array_merge(
            parent::behaviors(),
            [
                'verbs' => [
                    'class' => VerbFilter::className(),
                    'actions' => [
                        'delete' => ['POST'],
                    ],
                ],
            ]
        );
    }

    public function actionIndex()
    {
        $searchModel = new ProductSearch();
        $dataProvider = $searchModel->search($this->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    public function actionCreate()
    {
        $model = new Product();

        if ($this->request->isPost) {
            $model->load($this->request->post());

            $model->imageFiles = UploadedFile::getInstances($model, 'imageFiles');

            if ($model->save()) {
                if ($model->upload()) {
                    return $this->redirect(['view', 'id' => $model->id]);
                } else {
                    Yii::$app->session->setFlash('error', 'Failed to upload files. Please check your files and try again.');
                    return $this->redirect(['create']);
                }
            } else {
                Yii::$app->session->setFlash('error', 'Failed to save product.');
            }
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }

    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($this->request->isPost) {
            $model->load($this->request->post());
            $newFiles = UploadedFile::getInstances($model, 'imageFiles');

            if (!empty($newFiles)) {
                $existingFiles = json_decode($model->image, true);
                if (!is_array($existingFiles)) {
                    $existingFiles = [];
                }

                foreach ($newFiles as $file) {
                    $existingFiles[] = $file->baseName . '.' . $file->extension;
                }

                $model->imageFiles = $newFiles;
                $model->image = json_encode($existingFiles);
            }

            if ($model->save()) {
                if (!empty($newFiles) && !$model->upload()) {
                    Yii::$app->session->setFlash('error', 'Failed to upload files. Please check your files and try again.');
                }

                return $this->redirect(['view', 'id' => $model->id]);
            }
        }

        return $this->render('update', [
            'model' => $model,
        ]);
    }

    protected function findModel($id)
    {
        if (($model = Product::findOne(['id' => $id])) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }

    public function actionProducts()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        $products = Product::find()->where(['>', 'count', 0])->all();

        return $products;
    }

    public function actionProduct($id)
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        $product = Product::findOne($id);

        if ($product !== null) {
            return $product;
        } else {
            throw new NotFoundHttpException("Продукт не найден!");
        }
    }

    public function actionDelete($id)
    {
        $model = $this->findModel($id);
        $relatedOrders = \app\models\OrderProduct::find()->where(['product_id' => $id])->exists();

        if ($relatedOrders) {
            Yii::$app->session->setFlash('error', 'Cannot delete the product as there are orders related to it.');
            return $this->redirect(['index']);
        }

        $uploadPath = 'uploads/products/' . $model->id . '/';
        if (is_dir($uploadPath)) {
            $this->deleteDirectory($uploadPath);
        }

        $model->delete();

        return $this->redirect(['index']);
    }

    private function deleteDirectory($dirPath)
    {
        if (!is_dir($dirPath)) {
            return;
        }

        $files = glob($dirPath . '*', GLOB_MARK);
        foreach ($files as $file) {
            if (is_dir($file)) {
                $this->deleteDirectory($file);
            } else {
                unlink($file);
            }
        }

        rmdir($dirPath);
    }
}
