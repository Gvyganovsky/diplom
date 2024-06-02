<?php

namespace app\controllers;

use Yii;
use yii\rest\Controller;
use app\models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use app\models\UserSearch;
use yii\filters\VerbFilter;
use yii\web\NotFoundHttpException;

class UserController extends Controller
{
    /**
     * @inheritDoc
     */
    public function behaviors()
    {
        return array_merge(
            parent::behaviors(),
            [
                'verbs' => [
                    'class' => VerbFilter::className(),
                    'actions' => [
                        'delete' => ['POST'],
                    ],
                ],
            ]
        );
    }

    /**
     * Lists all User models.
     *
     * @return string
     */
    public function actionIndex()
    {
        $searchModel = new UserSearch();
        $dataProvider = $searchModel->search($this->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single User model.
     * @param int $id ID
     * @return string
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new User model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return string|\yii\web\Response
     */
    public function actionCreate()
    {
        $model = new User();

        if ($this->request->isPost) {
            if ($model->load($this->request->post()) && $model->save()) {
                return $this->redirect(['view', 'id' => $model->id]);
            }
        } else {
            $model->loadDefaultValues();
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }

    /**
     * Updates an existing User model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param int $id ID
     * @return string|\yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($this->request->isPost && $model->load($this->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        }

        return $this->render('update', [
            'model' => $model,
        ]);
    }

    /**
     * Finds the User model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param int $id ID
     * @return User the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = User::findOne(['id' => $id])) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }

    public function generateToken($userId)
    {
        $secretKey = 'c8qC@34V1zgM#T!k%Fp5vD@7^Rp6fKb!';
        $payload = [
            'user_id' => $userId,
            'exp' => time() + 3600
        ];
        $token = JWT::encode($payload, $secretKey, 'HS256');
        return $token;
    }

    public static function getUserFromToken($token)
    {
        $secretKey = 'c8qC@34V1zgM#T!k%Fp5vD@7^Rp6fKb!';
        try {
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
            return User::findOne($decoded->user_id);
        } catch (\Exception $e) {
            return null;
        }
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
            return ['message' => 'Успешная регистрация!', 'token' => $token];
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

        $jsonData = json_decode($request->getRawBody(), true);

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
            return ['message' => 'Успешная авторизация!', 'token' => $token];
        }

        Yii::$app->response->statusCode = 401;
        return ['message' => 'Ошибка авторизации', 'errors' => 'Неверный логин или пароль'];
    }

    public function actionUsers()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        $authHeader = Yii::$app->request->getHeaders()->get('Authorization');
        if (!$authHeader) {
            Yii::$app->response->statusCode = 401;
            return ['message' => 'Ошибка авторизации', 'errors' => 'Токен отсутствует'];
        }

        $token = str_replace('Bearer ', '', $authHeader);
        $currentUser = $this->getUserFromToken($token);

        if (!$currentUser || $currentUser->admin != 1) {
            Yii::$app->response->statusCode = 403;
            return ['message' => 'Доступ запрещен', 'errors' => 'Недостаточно прав'];
        }

        $users = User::find()->all();

        if ($users) {
            return ['message' => 'Список пользователей', 'users' => $users];
        } else {
            Yii::$app->response->statusCode = 404;
            return ['message' => 'Пользователи не найдены'];
        }
    }

    public function actionUser($id)
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        $authHeader = Yii::$app->request->getHeaders()->get('Authorization');
        if (!$authHeader) {
            Yii::$app->response->statusCode = 401;
            return ['message' => 'Ошибка авторизации', 'errors' => 'Токен отсутствует'];
        }

        $token = str_replace('Bearer ', '', $authHeader);
        $currentUser = $this->getUserFromToken($token);

        if (!$currentUser || $currentUser->admin != 1) {
            Yii::$app->response->statusCode = 403;
            return ['message' => 'Доступ запрещен', 'errors' => 'Недостаточно прав'];
        }

        $user = User::findOne($id);

        if ($user) {
            return ['message' => 'Пользователь найден', 'user' => $user];
        } else {
            Yii::$app->response->statusCode = 404;
            return ['message' => 'Пользователь не найден'];
        }
    }

    /**
     * Returns user data based on token.
     * @return \yii\web\Response
     */
    public function actionGetData()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        $authHeader = Yii::$app->request->getHeaders()->get('Authorization');
        if (!$authHeader) {
            Yii::$app->response->statusCode = 401;
            return ['message' => 'Ошибка авторизации', 'errors' => 'Токен отсутствует'];
        }

        $token = str_replace('Bearer ', '', $authHeader);
        $user = $this->getUserFromToken($token);

        if ($user) {
            return ['message' => 'Пользователь найден', 'user' => $user];
        } else {
            Yii::$app->response->statusCode = 401;
            return ['message' => 'Ошибка авторизации', 'errors' => 'Неверный токен'];
        }
    }
}
