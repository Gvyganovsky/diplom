<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Response;
use app\models\Basket;
use app\models\Order;
use app\models\OrderProduct;

class BasketController extends Controller
{
    // Отключаем проверку CSRF для действия добавления в корзину
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

        // Добавляем товары в заказ и сохраняем их
        foreach ($basketItems as $basketItem) {
            $orderProduct = new OrderProduct();
            $orderProduct->order_id = $order->id;
            $orderProduct->product_id = $basketItem->product;
            $orderProduct->quantity = $basketItem->count;
            if (!$orderProduct->save()) {
                // Если сохранение не удалось, откатываем транзакцию и возвращаем ошибку
                $order->delete(); // Удаляем созданный заказ
                return ['success' => false, 'message' => 'Произошла ошибка при добавлении товаров в заказ.'];
            }
        }

        // Удаляем все записи из корзины пользователя
        Basket::deleteAll(['user' => $userId]);

        return ['success' => true, 'message' => 'Заказ успешно оформлен.'];
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
                $basketItem->count += 1;
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
}
