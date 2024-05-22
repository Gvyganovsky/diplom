<?php

namespace app\controllers;

use Yii;
use yii\rest\Controller;
use app\models\User;

class UserController extends Controller
{
    public function actionSignup()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
    
        $csrfToken = Yii::$app->request->getHeaders()->get('X-CSRF-Token');
        if (!$csrfToken) {
            Yii::$app->response->statusCode = 400;
            return ['message' => 'Ошибка запроса', 'errors' => 'Отсутствует CSRF токен'];
        }
    
        $model = new User();
        $model->load(Yii::$app->request->getBodyParams(), '');
    
        if ($model->save()) {
            Yii::$app->response->statusCode = 201;
            return ['message' => 'Успешная регистрация!', 'user' => $model];
        } else {
            if ($model->hasErrors()) {
                Yii::$app->response->statusCode = 422;
                return [
                    'message' => 'Ошибка валидации',
                    'errors' => $model->getErrors()
                ];
            } else {
                Yii::$app->response->statusCode = 409;
                return ['message' => 'Этот адрес электронной почты уже используется'];
            }
        }
    }    

    public function actionSignin()
    {
        $request = Yii::$app->request;
        $csrfToken = $request->getHeaders()->get('X-CSRF-Token');

        if (!$csrfToken) {
            Yii::$app->response->statusCode = 400;
            return ['message' => 'Ошибка запроса', 'errors' => 'Отсутствует CSRF токен'];
        }

        $email = $request->getBodyParam('email');
        $password = $request->getBodyParam('password');

        if (!$email || !$password) {
            Yii::$app->response->statusCode = 400;
            return ['message' => 'Ошибка запроса', 'errors' => 'Некорректные данные'];
        }

        $user = User::findOne(['email' => $email]);
        if ($user && $user->validatePassword($password)) {
            return ['message' => 'Успешная авторизация!', 'user' => $user];
        }

        Yii::$app->response->statusCode = 401;
        return ['message' => 'Ошибка авторизации', 'errors' => 'Неверный логин или пароль'];
    }
}

