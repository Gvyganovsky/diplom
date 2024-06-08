<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\BasketSearch $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="basket-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id')->label('ID') ?>

    <?= $form->field($model, 'user')->label('Пользователь') ?>

    <?= $form->field($model, 'product')->label('Продукт') ?>

    <?= $form->field($model, 'count')->label('Количество') ?>

    <div class="form-group">
        <?= Html::submitButton('Искать', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Сбросить', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
