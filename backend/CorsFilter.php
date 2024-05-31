<?php
namespace app\filters;

use Yii;
use yii\base\ActionFilter;

class CorsFilter extends ActionFilter
{
    public function beforeAction($action)
    {
        Yii::$app->response->headers->set('Access-Control-Allow-Origin', '*');
        Yii::$app->response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        Yii::$app->response->headers->set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (Yii::$app->request->isOptions) {
            Yii::$app->response->statusCode = 200;
            Yii::$app->response->content = '';
            Yii::$app->end();
            return false;
        }

        return parent::beforeAction($action);
    }
}
