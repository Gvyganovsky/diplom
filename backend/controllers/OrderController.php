<?php

namespace app\controllers;

use Yii;
use yii\rest\Controller;
use yii\web\Response;
use app\models\Order;
use app\models\OrderProduct;
use app\models\Product;

class OrderController extends Controller
{
    public function actionOrders($userId)
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        // Получаем заказы пользователя
        $orders = Order::find()
            ->where(['user' => $userId])
            ->with(['orderProducts.product'])
            ->all();

        // Формируем ответ
        $orderDetails = [];
        foreach ($orders as $order) {
            $products = [];
            foreach ($order->orderProducts as $orderProduct) {
                $product = $orderProduct->product;
                $products[] = [
                    'productId' => $product->id,
                    'productName' => $product->name,
                    'productImage' => $product->image, // Предполагается, что поле 'image' хранит URL изображения
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
}
