<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\Product;
use yii\web\NotFoundHttpException;
use app\models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ProductController extends Controller
{
    protected function getUserFromToken($token)
    {
        $secretKey = 'c8qC@34V1zgM#T!k%Fp5vD@7^Rp6fKb!';
        try {
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
            return User::findOne($decoded->user_id);
        } catch (\Exception $e) {
            return null;
        }
    }

    public function actionProducts()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        $authHeader = Yii::$app->request->getHeaders()->get('Authorization');
        if (!$authHeader) {
            Yii::$app->response->statusCode = 401;
            return ['message' => 'Ошибка авторизации', 'errors' => 'Токен отсутствует'];
        }

        $token = str_replace('Bearer ', '', $authHeader);
        $currentUser = $this->getUserFromToken($token);

        if (!$currentUser) {
            Yii::$app->response->statusCode = 403;
            return ['message' => 'Доступ запрещен', 'errors' => 'Неверный токен'];
        }

        $products = Product::find()->all();

        return $products;
    }

    public function actionView($id)
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        $product = Product::findOne($id);

        if ($product !== null) {
            return $product;
        } else {
            throw new NotFoundHttpException("Продукт не найден!");
        }
    }
}
