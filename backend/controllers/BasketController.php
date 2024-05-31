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
use yii\filters\VerbFilter;
use yii\web\NotFoundHttpException;

class BasketController extends Controller
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
     * Lists all Basket models.
     *
     * @return string
     */
    public function actionIndex()
    {
        $searchModel = new BasketSearch();
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
        $model = new Basket();

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
     * @return Basket the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Basket::findOne(['id' => $id])) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }

    // Отключаем проверку CSRF для действий добавления, обновления и удаления из корзины
    public $enableCsrfValidation = false;

    public function actionCheckout($userId)
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        // Создаем новый заказ
        $order = new Order();
        $order->user = $userId;
        $order->createdAt = time(); // Установим текущую дату и время создания заказа
        if (!$order->save()) {
            return ['success' => false, 'message' => 'Произошла ошибка при создании заказа.'];
        }

        // Получаем товары из корзины пользователя
        $basketItems = Basket::find()
            ->where(['user' => $userId])
            ->all();

        // Начинаем транзакцию
        $transaction = Yii::$app->db->beginTransaction();
        try {
            foreach ($basketItems as $basketItem) {
                $productItem = Product::findOne($basketItem->product);

                // Проверяем наличие товара на складе
                if ($productItem === null || $productItem->count < $basketItem->count) {
                    // Откатываем транзакцию и возвращаем ошибку
                    $transaction->rollBack();
                    return ['success' => false, 'message' => 'Недостаточно товара на складе.'];
                }

                // Уменьшаем количество товара на складе
                $productItem->count -= $basketItem->count;
                if (!$productItem->save()) {
                    // Откатываем транзакцию и возвращаем ошибку
                    $transaction->rollBack();
                    return ['success' => false, 'message' => 'Произошла ошибка при обновлении количества товара на складе.'];
                }

                // Добавляем товары в заказ
                $orderProduct = new OrderProduct();
                $orderProduct->order_id = $order->id;
                $orderProduct->product_id = $basketItem->product;
                $orderProduct->quantity = $basketItem->count;
                if (!$orderProduct->save()) {
                    // Откатываем транзакцию и возвращаем ошибку
                    $transaction->rollBack();
                    return ['success' => false, 'message' => 'Произошла ошибка при добавлении товаров в заказ.'];
                }
            }

            // Удаляем все записи из корзины пользователя
            Basket::deleteAll(['user' => $userId]);

            // Подтверждаем транзакцию
            $transaction->commit();

            return ['success' => true, 'message' => 'Заказ успешно оформлен.'];
        } catch (\Exception $e) {
            // Откатываем транзакцию в случае ошибки
            $transaction->rollBack();
            return ['success' => false, 'message' => 'Произошла ошибка при оформлении заказа.'];
        }
    }

    public function actionAdd()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        // Получаем данные в формате JSON из тела запроса
        $jsonData = json_decode(Yii::$app->request->getRawBody(), true);

        // Проверяем, что данные содержат необходимые поля
        if (isset($jsonData['user'], $jsonData['product'], $jsonData['count'])) {
            $user = $jsonData['user'];
            $product = $jsonData['product'];
            $count = $jsonData['count'];

            // Проверяем, существует ли запись в корзине для данного пользователя и товара
            $basketItem = Basket::findOne(['user' => $user, 'product' => $product]);

            if ($basketItem !== null) {
                // Если запись существует, увеличиваем счетчик на 1
                $basketItem->count += $count;
            } else {
                // Создаем новую запись в корзине
                $basketItem = new Basket();
                $basketItem->user = $user;
                $basketItem->product = $product;
                $basketItem->count = $count;
            }

            // Сохраняем запись в базе данных
            if ($basketItem->save()) {
                return ['success' => true, 'message' => 'Товар успешно добавлен в корзину.'];
            } else {
                return ['success' => false, 'message' => 'Произошла ошибка при добавлении товара в корзину.'];
            }
        } else {
            return ['success' => false, 'message' => 'Недостаточно данных для добавления товара в корзину.'];
        }
    }

    public function actionGet($userId)
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $basketItems = Basket::find()
            ->where(['user' => $userId])
            ->all();

        return $basketItems;
    }

    public function actionDelete()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        // Получаем данные в формате JSON из тела запроса
        $jsonData = json_decode(Yii::$app->request->getRawBody(), true);

        // Проверяем, что данные содержат необходимые поля
        if (isset($jsonData['userId'], $jsonData['productId'])) {
            $userId = $jsonData['userId'];
            $productId = $jsonData['productId'];

            // Проверяем, существует ли запись в корзине для данного пользователя и товара
            $basketItem = Basket::findOne(['user' => $userId, 'product' => $productId]);

            if ($basketItem !== null) {
                // Удаляем запись из корзины
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
