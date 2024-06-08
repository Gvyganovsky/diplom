<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/** @var yii\web\View $this */
/** @var app\models\OrderProduct $model */

$this->title = $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Продукты в заказе', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="order-product-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Обновить', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Удалить', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Вы уверены, что хотете удалить?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'id',
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
        ],
    ]) ?>

</div>