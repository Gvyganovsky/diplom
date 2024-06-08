<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\OrderProduct $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="order-product-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'order_id')->textInput(['maxlength' => true])->label('ID заказа') ?>

    <?= $form->field($model, 'product_id')->textInput(['maxlength' => true])->label('ID продукта') ?>

    <?= $form->field($model, 'quantity')->textInput(['maxlength' => true])->label('Количество') ?>

    <div class="form-group">
        <?= Html::submitButton('Сохранить', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>