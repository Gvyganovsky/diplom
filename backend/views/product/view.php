<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/** @var yii\web\View $this */
/** @var app\models\Product $model */

$this->title = $model->name;
$this->params['breadcrumbs'][] = ['label' => 'Продукты', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="product-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Обновить', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Удалить', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Вы уверены, что хотите удалить?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'id',
            [
                'attribute' => 'name',
                'label' => 'Имя',
            ],
            [
                'attribute' => 'image',
                'label' => 'Фотографии',
            ],
            [
                'attribute' => 'brand',
                'label' => 'Брэнд',
            ],
            [
                'attribute' => 'model',
                'label' => 'Модель',
            ],
            [
                'attribute' => 'category',
                'label' => 'Категория',
            ],
            [
                'attribute' => 'price',
                'label' => 'Цена',
            ],
            [
                'attribute' => 'description',
                'label' => 'Описание',
            ],
            [
                'attribute' => 'count',
                'label' => 'Количество',
            ],
        ],
    ]) ?>

</div>