<?php

use app\models\OrderProduct;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/** @var yii\web\View $this */
/** @var app\models\OrderProductSearch $searchModel */
/** @var yii\data\ActiveDataProvider $dataProvider */

$this->title = 'Товары заказов';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="order-product-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Создать товар в заказе', ['create'], ['class' => 'btn btn-success']) ?>
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
                'attribute' => 'order_id',
                'label' => 'id заказа',
            ],
            [
                'attribute' => 'product_id',
                'label' => 'id продукта',
            ],
            [
                'attribute' => 'quantity',
                'label' => 'количество',
            ],
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, OrderProduct $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id' => $model->id]);
                }
            ],
        ],
    ]); ?>

</div>