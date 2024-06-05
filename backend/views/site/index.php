<?php

/** @var yii\web\View $this */

use yii\bootstrap5\Html;

$this->title = 'Админ панель';
?>

<div class="site-index">
    <?php if (!Yii::$app->user->isGuest && Yii::$app->user->identity->admin === 1) : ?>
        <div class="list-group">
            <?= Html::a('Управление продуктами', ['/product'], ['class' => 'list-group-item list-group-item-action']) ?>
            <?= Html::a('Управление пользователями', ['/user-web'], ['class' => 'list-group-item list-group-item-action']) ?>
            <?= Html::a('Управление корзиной', ['/basket'], ['class' => 'list-group-item list-group-item-action']) ?>
            <?= Html::a('Управление заказами', ['/order'], ['class' => 'list-group-item list-group-item-action']) ?>
            <?= Html::a('Управление товарами в заказе', ['/order-product'], ['class' => 'list-group-item list-group-item-action']) ?>
        </div>
    <?php endif; ?>

    <?php if (Yii::$app->user->isGuest) : ?>
        <?= Html::a('Login', ['/site/login'], ['class' => 'nav-link btn btn-primary login']) ?>
    <?php else : ?>
        <?= Html::a(
            'Logout (' . Yii::$app->user->identity->login . ')',
            ['/site/logout'],
            ['class' => 'nav-link btn btn-danger logout', 'data-method' => 'post']
        ) ?>
    <?php endif; ?>
</div>
