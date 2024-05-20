<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\Product;

class ProductController extends Controller
{
    public function actionProducts()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        $products = Product::find()->all();

        return $products;
    }
}
