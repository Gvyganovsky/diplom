<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\User $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="user-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'login')->textInput(['maxlength' => true])->label('Логин') ?>

    <?= $form->field($model, 'email')->textInput(['maxlength' => true])->label('Почта') ?>

    <?= $form->field($model, 'phone')->textInput(['maxlength' => true])->label('Телефон') ?>

    <?= $form->field($model, 'address')->textInput(['maxlength' => true])->label('Адресс') ?>

    <?= $form->field($model, 'password')->passwordInput(['maxlength' => true])->label('Пароль') ?>

    <?php if ($model->admin == 1) : ?>
        <?= $form->field($model, 'admin')->textInput()->label('Админ') ?>
    <?php endif; ?>

    <div class="form-group">
        <?= Html::submitButton('Сохранить', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>