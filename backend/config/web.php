<?php

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
    'id' => 'basic',
    'name' => 'AgroScout',
    'language' => 'ru-RU',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'components' => [
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'AgroScout',
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => true,
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'mailer' => [
            'class' => \yii\symfonymailer\Mailer::class,
            'viewPath' => '@app/mail',
            // send all mails to a file by default.
            'useFileTransport' => true,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
                'GET product/<id:\d+>' => 'product/product',
                'GET products' => 'product/products',

                'POST checkout' => 'basket/checkout',
                'POST basket/add' => 'basket/add',
                'GET basket/get' => 'basket/get',
                'POST basket/count' => 'basket/count',

                'POST basket/cancel' => 'basket/cancel',

                'GET orders' => 'order/orders',

                'POST signup' => 'user/signup',
                'POST signin' => 'user/signin',
                'GET user/<id:\d+>' => 'user/user',
                'GET users' => 'user/users',
                'GET user/get-data' => 'user/get-data',
                'userWeb' => 'user-web/index',
            ],
        ],
        'response' => [
            'class' => 'yii\web\Response',
            'on beforeSend' => function ($event) {
                $response = $event->sender;
                $response->headers->set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none';");
                $response->headers->set('X-Frame-Options', 'DENY');
                $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
                $response->headers->set('X-Content-Type-Options', 'nosniff');
            },
        ],
    ],
    'params' => $params,
];


// if (YII_ENV_DEV) {
//     $config['bootstrap'][] = 'debug';
//     $config['modules']['debug'] = [
//         'class' => 'yii\debug\Module',
//         'allowedIPs' => ['127.0.0.1', '::1', '*'],
//     ];

//     $config['bootstrap'][] = 'gii';
//     $config['modules']['gii'] = [
//         'class' => 'yii\gii\Module',
//         'allowedIPs' => ['127.0.0.1', '::1', '*'],
//     ];
// }

return $config;
