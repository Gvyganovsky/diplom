<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Response;
use app\models\Basket;

class BasketController extends Controller
{
    // Отключаем проверку CSRF для действия добавления в корзину
    public $enableCsrfValidation = false;

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
}
