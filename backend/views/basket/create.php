<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var app\models\Basket $model */

$this->title = 'Создать корзину';
$this->params['breadcrumbs'][] = ['label' => 'Baskets', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="basket-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
