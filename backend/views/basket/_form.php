<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\Basket $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="basket-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'user')->label('Пользователь') ?>

    <?= $form->field($model, 'product')->label('Продукт') ?>

    <?= $form->field($model, 'count')->label('Количество') ?>

    <div class="form-group">
        <?= Html::submitButton('Сохранить', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>