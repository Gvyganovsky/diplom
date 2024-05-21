<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\User;
use yii\web\UnprocessableEntityHttpException;
use yii\web\ConflictHttpException;


class UserController extends Controller
{
    public function actionSignup()
    {
        $model = new User();
        $model->load(Yii::$app->request->post(), '');

        if ($model->save()) {
            Yii::$app->response->statusCode = 201;
            return ['message' => 'Успешная регистрация!', 'user' => $model];
        } else {
            if ($model->hasErrors()) {
                Yii::$app->response->statusCode = 422;
                throw new UnprocessableEntityHttpException('Ошибка валидации', 422, null, $model->getErrors());
            } else {
                Yii::$app->response->statusCode = 409;
                throw new ConflictHttpException('Этот адрес электронной почты уже используется', 409);
            }
        }
    }

    public function actionSignIn()
    {
        $request = Yii::$app->request->post();
        $user = User::findOne(['email' => $request['email']]);

        if ($user && $user->validatePassword($request['password'])) {
            return ['message' => 'Успешная авторизация!', 'user' => $user];
        }

        Yii::$app->response->statusCode = 401;
        return ['message' => 'Ошибка авторизации', 'errors' => 'Неверный логин или пароль'];
    }
}
