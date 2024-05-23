<?php

namespace app\controllers;

use Yii;
use yii\rest\Controller;
use app\models\User;
use Firebase\JWT\JWT;

class UserController extends Controller
{
    protected function generateToken($userId)
    {
        $secretKey = 'c8qC@34V1zgM#T!k%Fp5vD@7^Rp6fKb!';
        $payload = [
            'user_id' => $userId,
            'exp' => time() + 3600
        ];
        $token = JWT::encode($payload, $secretKey, 'HS256');
        return $token;
    }

    public function actionSignup()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        $csrfToken = Yii::$app->request->getHeaders()->get('X-CSRF-Token');
        if (!$csrfToken) {
            Yii::$app->response->statusCode = 400;
            return ['message' => 'Ошибка запроса', 'errors' => 'Отсутствует CSRF токен'];
        }

        $jsonData = json_decode(Yii::$app->request->getRawBody(), true);

        $model = new User();
        $model->load($jsonData, ''); 

        if ($model->save()) {
            $token = $this->generateToken($model->id);
            Yii::$app->response->statusCode = 201;
            return ['message' => 'Успешная регистрация!', 'user' => $model, 'token' => $token];
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

        $jsonData = json_decode(Yii::$app->request->getRawBody(), true);

        if (!isset($jsonData['email']) || !isset($jsonData['password'])) {
            Yii::$app->response->statusCode = 400;
            return ['message' => 'Ошибка запроса', 'errors' => 'Некорректные данные'];
        }

        $email = $jsonData['email'];
        $password = $jsonData['password'];

        if (!$email || !$password) {
            Yii::$app->response->statusCode = 400;
            return ['message' => 'Ошибка запроса', 'errors' => 'Некорректные данные'];
        }

        $user = User::findOne(['email' => $email]);
        if ($user && $user->validatePassword($password)) {
            $token = $this->generateToken($user->id);
            return ['message' => 'Успешная авторизация!', 'user' => $user, 'token' => $token];
        }

        Yii::$app->response->statusCode = 401;
        return ['message' => 'Ошибка авторизации', 'errors' => 'Неверный логин или пароль'];
    }
}
