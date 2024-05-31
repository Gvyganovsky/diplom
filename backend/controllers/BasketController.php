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
    public $enableCsrfValidation = false;

    public function actionCheckout($userId)
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
    
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

        if (isset($jsonData['user'], $jsonData['product'], $jsonData['count'])) {
            $user = $jsonData['user'];
            $product = $jsonData['product'];
            $count = $jsonData['count'];

            $basketItem = Basket::findOne(['user' => $user, 'product' => $product]);

            if ($basketItem !== null) {
                $basketItem->count += $count;
            } else {
                $basketItem = new Basket();
                $basketItem->user = $user;
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

        $jsonData = json_decode(Yii::$app->request->getRawBody(), true);

        if (isset($jsonData['userId'], $jsonData['productId'], $jsonData['count'])) {
            $userId = $jsonData['userId'];
            $productId = $jsonData['productId'];
            $count = $jsonData['count'];

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

        if (isset($jsonData['userId'], $jsonData['productId'])) {
            $userId = $jsonData['userId'];
            $productId = $jsonData['productId'];

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
