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

            $cancelButton = '<img src="path_to_cancel_button_image" alt="Cancel Order" class="cancel-order-button" data-order-id="' . $order->id . '">';
            $orderDetails[] = [
                'orderId' => $order->id,
                'createdAt' => date('Y-m-d H:i:s', $order->createdAt),
                'products' => $products,
                'cancelButton' => $cancelButton,
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

    $order = Order::findOne($orderId);

    if ($order !== null) {
        OrderProduct::deleteAll(['order_id' => $orderId]);

        if ($order->delete()) {
            return ['success' => true, 'message' => 'Заказ успешно отменен.'];
        } else {
            return ['success' => false, 'message' => 'Произошла ошибка при отмене заказа.'];
        }
    } else {
        return ['success' => false, 'message' => 'Заказ не найден.'];
    }
}
}
