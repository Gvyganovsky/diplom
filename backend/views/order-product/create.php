<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var app\models\OrderProduct $model */

$this->title = 'Создать продукт в заказе';
$this->params['breadcrumbs'][] = ['label' => 'Продукт в заказе', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="order-product-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>