<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\Product;
use yii\web\NotFoundHttpException;
use app\models\ProductSearch;
use yii\filters\VerbFilter;

class ProductController extends Controller
{
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
     * Lists all User models.
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
     * Displays a single User model.
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
     * Creates a new User model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return string|\yii\web\Response
     */
    public function actionCreate()
    {
        $model = new Product();

        if ($this->request->isPost) {
            if ($model->load($this->request->post()) && $model->save()) {
                return $this->redirect(['view', 'id' => $model->id]);
            }
        } else {
            $model->loadDefaultValues();
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }

    /**
     * Updates an existing User model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param int $id ID
     * @return string|\yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($this->request->isPost && $model->load($this->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        }

        return $this->render('update', [
            'model' => $model,
        ]);
    }

    /**
     * Finds the User model based on its primary key value.
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

        $model->delete();

        return $this->redirect(['index']);
    }
}
