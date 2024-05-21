<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\Product;
use yii\web\NotFoundHttpException;

class ProductController extends Controller
{
    public function actionProducts()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

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
