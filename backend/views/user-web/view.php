<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/** @var yii\web\View $this */
/** @var app\models\User $model */

$this->title = $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Пользователи', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="user-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Обновить', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
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
                'attribute' => 'password',
                'label' => 'Пароль',
            ],
        ],
    ]) ?>

</div>
