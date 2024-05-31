<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Response;
use app\models\Basket;
use app\models\Order;
use app\models\Product;
use app\models\OrderProduct;

class BasketController extends Controller
{
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

    public function actionUpdate()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        // Получаем данные в формате JSON из тела запроса
        $jsonData = json_decode(Yii::$app->request->getRawBody(), true);

        // Проверяем, что данные содержат необходимые поля
        if (isset($jsonData['userId'], $jsonData['productId'], $jsonData['count'])) {
            $userId = $jsonData['userId'];
            $productId = $jsonData['productId'];
            $count = $jsonData['count'];

            // Проверяем, существует ли запись в корзине для данного пользователя и товара
            $basketItem = Basket::findOne(['user' => $userId, 'product' => $productId]);

            if ($basketItem !== null) {
                // Обновляем количество товара в корзине
                $basketItem->count = $count;

                // Сохраняем запись в базе данных
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
