<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Response;
use app\models\Basket;
use app\models\BasketSearch;
use app\models\Order;
use app\models\Product;
use app\models\OrderProduct;
use app\controllers\UserController;
use yii\filters\VerbFilter;
use yii\web\NotFoundHttpException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class BasketController extends Controller
{
    /**
     * @inheritDoc
     */
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => \yii\filters\VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
        ];
    }


    public function actionIndex()
    {
        $searchModel = new BasketSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

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
        $model = new Basket();

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
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

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
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
     * @return Basket the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Basket::findOne($id)) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }
    public $enableCsrfValidation = false;

    public function actionCheckout()
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

        $order = new Order();
        $order->user = $userId;
        $order->createdAt = time();
        if (!$order->save()) {
            return ['success' => false, 'message' => 'Произошла ошибка при создании заказа.'];
        }

        $basketItems = Basket::find()
            ->where(['user' => $userId])
            ->all();

        $transaction = Yii::$app->db->beginTransaction();
        try {
            foreach ($basketItems as $basketItem) {
                $productItem = Product::findOne($basketItem->product);

                if ($productItem === null || $productItem->count < $basketItem->count) {
                    $transaction->rollBack();
                    return ['success' => false, 'message' => 'Недостаточно товара на складе.'];
                }

                $productItem->count -= $basketItem->count;
                if (!$productItem->save()) {
                    $transaction->rollBack();
                    return ['success' => false, 'message' => 'Произошла ошибка при обновлении количества товара на складе.'];
                }

                $orderProduct = new OrderProduct();
                $orderProduct->order_id = $order->id;
                $orderProduct->product_id = $basketItem->product;
                $orderProduct->quantity = $basketItem->count;
                if (!$orderProduct->save()) {
                    $transaction->rollBack();
                    return ['success' => false, 'message' => 'Произошла ошибка при добавлении товаров в заказ.'];
                }
            }
            Basket::deleteAll(['user' => $userId]);

            $transaction->commit();

            return ['success' => true, 'message' => 'Заказ успешно оформлен.'];
        } catch (\Exception $e) {
            $transaction->rollBack();
            return ['success' => false, 'message' => 'Произошла ошибка при оформлении заказа.'];
        }
    }

    public function actionAdd()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $jsonData = json_decode(Yii::$app->request->getRawBody(), true);

        if (isset($jsonData['token'], $jsonData['product'], $jsonData['count'])) {
            $token = $jsonData['token'];
            $product = $jsonData['product'];
            $count = $jsonData['count'];

            $user = UserController::getUserFromToken($token);

            if (!$user) {
                Yii::$app->response->statusCode = 401;
                return ['success' => false, 'message' => 'Пользователь не авторизован.'];
            }

            $userId = $user->id;

            $basketItem = Basket::findOne(['user' => $userId, 'product' => $product]);

            if ($basketItem !== null) {
                $basketItem->count += $count;
            } else {
                $basketItem = new Basket();
                $basketItem->user = $userId;
                $basketItem->product = $product;
                $basketItem->count = $count;
            }

            if ($basketItem->save()) {
                return ['success' => true, 'message' => 'Товар успешно добавлен в корзину.'];
            } else {
                return ['success' => false, 'message' => 'Произошла ошибка при добавлении товара в корзину.'];
            }
        } else {
            return ['success' => false, 'message' => 'Недостаточно данных для добавления товара в корзину.'];
        }
    }

    public function actionGet()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $authHeader = Yii::$app->request->headers->get('Authorization');
        if (!$authHeader) {
            return ['success' => false, 'message' => 'Токен пользователя отсутствует в заголовках запроса.'];
        }

        list($type, $token) = explode(' ', $authHeader, 2);
        if (strcasecmp($type, 'Bearer') != 0) {
            return ['success' => false, 'message' => 'Неверный тип токена.'];
        }

        $user = UserController::getUserFromToken($token);
        if (!$user) {
            Yii::$app->response->statusCode = 401;
            return ['success' => false, 'message' => 'Пользователь не авторизован.'];
        }

        $userId = $user->id;

        $basketItems = Basket::find()
            ->where(['user' => $userId])
            ->all();

        return $basketItems;
    }

    public function actionCount()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $jsonData = json_decode(Yii::$app->request->getRawBody(), true);

        if (isset($jsonData['token'], $jsonData['productId'], $jsonData['count'])) {
            $token = $jsonData['token'];
            $productId = $jsonData['productId'];
            $count = $jsonData['count'];

            $user = UserController::getUserFromToken($token);

            if (!$user) {
                Yii::$app->response->statusCode = 401;
                return ['success' => false, 'message' => 'Пользователь не авторизован.'];
            }

            $userId = $user->id;

            $basketItem = Basket::findOne(['user' => $userId, 'product' => $productId]);

            if ($basketItem !== null) {
                $basketItem->count = $count;

                if ($basketItem->save()) {
                    return ['success' => true, 'message' => 'Количество товара успешно обновлено.'];
                } else {
                    return ['success' => false, 'message' => 'Произошла ошибка при обновлении количества товара.'];
                }
            } else {
                return ['success' => false, 'message' => 'Товар не найден в корзине.'];
            }
        } else {
            return ['success' => false, 'message' => 'Недостаточно данных для обновления количества товара.'];
        }
    }

    public function actionDelete()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $jsonData = json_decode(Yii::$app->request->getRawBody(), true);

        if (isset($jsonData['token'], $jsonData['productId'])) {
            $token = $jsonData['token'];
            $productId = $jsonData['productId'];

            $user = UserController::getUserFromToken($token);

            if (!$user) {
                Yii::$app->response->statusCode = 401;
                return ['success' => false, 'message' => 'Пользователь не авторизован.'];
            }

            $userId = $user->id;

            $basketItem = Basket::findOne(['user' => $userId, 'product' => $productId]);

            if ($basketItem !== null) {
                if ($basketItem->delete()) {
                    return ['success' => true, 'message' => 'Товар успешно удален из корзины.'];
                } else {
                    return ['success' => false, 'message' => 'Произошла ошибка при удалении товара из корзины.'];
                }
            } else {
                return ['success' => false, 'message' => 'Товар не найден в корзине.'];
            }
        } else {
            return ['success' => false, 'message' => 'Недостаточно данных для удаления товара из корзины.'];
        }
    }
}
