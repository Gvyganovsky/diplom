<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\User;
use app\models\UserSearch;
use yii\web\NotFoundHttpException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class UserWebController extends Controller
{
    /**
     * @inheritDoc
     */
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => \yii\filters\VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
        ];
    }

    /**
     * @inheritDoc
     */
    // public function beforeAction($action)
    // {
    //     $authHeader = Yii::$app->request->getHeaders()->get('Authorization');
    //     if (parent::beforeAction($action)) {
    //         // Проверяем наличие заголовка авторизации
    //         $authHeader = Yii::$app->request->getHeaders()->get('Authorization');
    //         Yii::info('Authorization header: ' . $authHeader); // Добавим логи
    //         if (!$authHeader) {
    //             Yii::$app->response->statusCode = 401;
    //             echo json_encode(['message' => 'Ошибка авторизации', 'errors' => 'Токен отсутствует']);
    //             exit;
    //         }
    //         // Извлекаем токен из заголовка
    //         $token = str_replace('Bearer ', '', $authHeader);
    //         Yii::info('Extracted token: ' . $token); // Добавим логи
    
    //         // Получаем текущего пользователя по токену
    //         $currentUser = $this->getUserFromToken($token);
    
    //         if (!$currentUser || $currentUser->admin != 1) {
    //             Yii::$app->response->statusCode = 403;
    //             echo json_encode(['message' => 'Доступ запрещен', 'errors' => 'Недостаточно прав']);
    //             exit;
    //         }
    
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    
    /**
     * Lists all User models.
     *
     * @return string
     */
    public function actionIndex()
    {
        $searchModel = new UserSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

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

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
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

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
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
        if (($model = User::findOne($id)) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }

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
}
