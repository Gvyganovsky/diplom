<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\Product $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="product-form">

    <?php $form = ActiveForm::begin(['options' => ['enctype' => 'multipart/form-data']]); ?>

    <?= $form->field($model, 'name')->textInput(['maxlength' => true])->label('Имя') ?>

    <?= $form->field($model, 'imageFiles')->fileInput(['multiple' => true, 'accept' => 'image/*'])->label('Фотографии') ?>

    <?= $form->field($model, 'brand')->textInput(['maxlength' => true])->label('Брэнд') ?>

    <?= $form->field($model, 'model')->textInput(['maxlength' => true])->label('Модель') ?>

    <?= $form->field($model, 'category')->textInput(['maxlength' => true])->label('Категория') ?>

    <?= $form->field($model, 'price')->textInput(['maxlength' => true])->label('Цена') ?>

    <?= $form->field($model, 'description')->textarea(['rows' => 6])->label('Описание') ?>

    <?= $form->field($model, 'count')->textInput()->label('Количество') ?>

    <div class="form-group">
        <?= Html::submitButton('Сохранить', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
