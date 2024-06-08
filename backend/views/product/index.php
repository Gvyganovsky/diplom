<?php

use app\models\Product;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/** @var yii\web\View $this */
/** @var app\models\ProductSearch $searchModel */
/** @var yii\data\ActiveDataProvider $dataProvider */

$this->title = 'Продукты';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="product-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Создать продукт', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

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
                'attribute' => 'count',
                'label' => 'Количество',
            ],
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Product $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id' => $model->id]);
                 }
            ],
        ],
    ]); ?>


</div>
