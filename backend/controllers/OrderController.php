<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Response;
use app\models\Order;
use app\models\OrderProduct;
use app\models\OrderSearch;
use yii\filters\VerbFilter;
use yii\web\NotFoundHttpException;

class OrderController extends Controller
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
     * Lists all Orders models.
     *
     * @return string
     */
    public function actionIndex()
    {
        $searchModel = new OrderSearch();
        $dataProvider = $searchModel->search($this->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Order model.
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
     * Creates a new Order model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return string|\yii\web\Response
     */
    public function actionCreate()
    {
        $model = new Order();

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
     * @return Order the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Order::findOne(['id' => $id])) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }

    public function actionOrder()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $orders = Order::find()->all();

        return $orders;
    }

    public function actionOrders()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $authHeader = Yii::$app->request->headers->get('Authorization');
        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            return ['success' => false, 'message' => 'Токен пользователя отсутствует в заголовках запроса.'];
        }

        $token = $matches[1];
        $user = UserController::getUserFromToken($token);
        if (!$user) {
            Yii::$app->response->statusCode = 401;
            return ['success' => false, 'message' => 'Пользователь не авторизован.'];
        }

        $userId = $user->id;

        $orders = Order::find()
            ->where(['user' => $userId])
            ->with(['orderProducts.product'])
            ->all();

        $orderDetails = [];
        foreach ($orders as $order) {
            $products = [];
            foreach ($order->orderProducts as $orderProduct) {
                $product = $orderProduct->product;
                $products[] = [
                    'productId' => $product->id,
                    'productName' => $product->name,
                    'productImage' => $product->image,
                    'quantity' => $orderProduct->quantity,
                ];
            }

            $orderDetails[] = [
                'orderId' => $order->id,
                'createdAt' => date('Y-m-d H:i:s', $order->createdAt),
                'products' => $products,
            ];
        }

        return [
            'success' => true,
            'orders' => $orderDetails,
        ];
    }

    public function actionDelete($orderId)
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $authHeader = Yii::$app->request->headers->get('Authorization');
        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            return ['success' => false, 'message' => 'Токен пользователя отсутствует в заголовках запроса.'];
        }

        $token = $matches[1];
        $user = UserController::getUserFromToken($token);
        if (!$user) {
            Yii::$app->response->statusCode = 401;
            return ['success' => false, 'message' => 'Пользователь не авторизован.'];
        }

        $order = Order::findOne(['id' => $orderId, 'user' => $user->id]);
        if ($order === null) {
            Yii::$app->response->statusCode = 404;
            return ['success' => false, 'message' => 'Заказ не найден.'];
        }

        OrderProduct::deleteAll(['order_id' => $orderId]);
        if ($order->delete()) {
            return ['success' => true, 'message' => 'Заказ успешно отменен.'];
        } else {
            return ['success' => false, 'message' => 'Ошибка при отмене заказа.'];
        }
    }
}
