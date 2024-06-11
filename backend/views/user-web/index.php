<?php

use app\models\User;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/** @var yii\web\View $this */
/** @var app\models\UserSearch $searchModel */
/** @var yii\data\ActiveDataProvider $dataProvider */

$this->title = 'Пользователи';
?>

<?php if (!Yii::$app->user->isGuest && Yii::$app->user->identity->admin === 1) : ?>
    <div class="user-index">
        <h1><?= Html::encode($this->title) ?></h1>

        <p>
            <?= Html::a('Создать пользователя', ['create'], ['class' => 'btn btn-success']) ?>
        </p>

        <?php // echo $this->render('_search', ['model' => $searchModel]); 
        ?>

        <?= GridView::widget([
            'dataProvider' => $dataProvider,
            'filterModel' => $searchModel,
            'columns' => [
                ['class' => 'yii\grid\SerialColumn'],
                [
                    'attribute' => 'id',
                    'label' => 'ID',
                ],
                [
                    'attribute' => 'login',
                    'label' => 'Логин',
                ],
                [
                    'attribute' => 'email',
                    'label' => 'Почта',
                ],
                [
                    'attribute' => 'phone',
                    'label' => 'Телефон',
                ],
                [
                    'attribute' => 'address',
                    'label' => 'Адрес',
                ],
                [
                    'class' => ActionColumn::className(),
                    'urlCreator' => function ($action, User $model, $key, $index, $column) {
                        return Url::toRoute([$action, 'id' => $model->id]);
                    }
                ],
            ],
        ]); ?>
    </div>
<?php else : ?>
    <div class="alert alert-warning">
        <p>Вы не являетесь администратором. Пожалуйста, вернитесь на <a href="http://dp-viganovsky.xn--80ahdri7a.site/">главную страницу</a>.</p>
    </div>
<?php endif; ?>