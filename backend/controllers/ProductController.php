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

    /**
     * @inheritDoc
     */
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

    /**
     * Lists all Product models.
     *
     * @return string
     */
    public function actionIndex()
    {
        $searchModel = new ProductSearch();
        $dataProvider = $searchModel->search($this->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Product model.
     * @param int $id ID
     * @return string
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new Product model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return string|\yii\web\Response
     */
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
                    // Handle upload error
                    Yii::$app->session->setFlash('error', 'Failed to upload files.');
                }
            }
        } else {
            $model->loadDefaultValues();
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }


    /**
     * Updates an existing Product model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param int $id ID
     * @return string|\yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);
    
        // Декодируем JSON в массив, если это необходимо
        $model->imageFiles = json_decode($model->image, true);
    
        if ($model->load(Yii::$app->request->post())) {
            // Получаем экземпляры загруженных файлов
            $newFiles = UploadedFile::getInstances($model, 'imageFiles');
    
            // Удаляем старые файлы перед сохранением новых
            $this->deleteOldFiles($model);
    
            // Если были загружены новые файлы
            if ($newFiles !== null) {
                $fileNames = [];
                foreach ($newFiles as $file) {
                    // Делаем что-то с каждым файлом (например, сохраняем его)
                    $fileName = $file->baseName . '.' . $file->extension;
                    $file->saveAs('uploads/products/' . $id . '/' . $fileName);
                    // Сохраняем имя файла для дальнейшего использования
                    $fileNames[] = $fileName;
                }
                // Присваиваем имена файлов модели
                $model->imageFiles = $fileNames;
            }
    
            // Сохраняем модель
            if ($model->save()) {
                return $this->redirect(['view', 'id' => $model->id]);
            }
        }
    
        // Отображаем форму для редактирования
        return $this->render('update', [
            'model' => $model,
        ]);
    }
    
    private function deleteOldFiles($model)
    {
        $oldFiles = json_decode($model->image, true);
        if (!empty($oldFiles)) {
            foreach ($oldFiles as $file) {
                $filePath = Yii::getAlias('@webroot') . '/uploads/products/' . $model->id . '/' . $file;
                if (file_exists($filePath)) {
                    unlink($filePath);
                }
            }
        }
    }
    
    /**
     * Finds the Product model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param int $id ID
     * @return Product the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
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

        // Delete the directory with product images
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
