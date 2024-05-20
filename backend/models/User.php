<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "user".
 *
 * @property int $id
 * @property string $login
 * @property string $email
 * @property string $phone
 * @property string $address
 * @property string $password
 *
 * @property Basket[] $baskets
 * @property Order[] $orders
 */
class User extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['login', 'email', 'phone', 'address', 'password'], 'required'],
            ['email', 'email'],
            ['email', 'unique', 'targetClass' => self::class, 'message' => 'Этот адрес электронной почты уже используется'],
            ['password', 'string', 'min' => 8],
            ['password', 'match', 'pattern' => '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/', 'message' => 'Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру'],
            ['login', 'match', 'pattern' => '/^[а-яА-Я]+$/u', 'message' => 'Логин должен содержать только кириллические символы'],
            ['login', 'string', 'min' => 3, 'max' => 20, 'tooShort' => 'Логин должен содержать минимум 3 символа', 'tooLong' => 'Логин должен содержать максимум 20 символов'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'login' => 'Login',
            'email' => 'Email',
            'phone' => 'Phone',
            'address' => 'Address',
            'password' => 'Password',
        ];
    }

    public function beforeSave($insert)
    {
        if (parent::beforeSave($insert)) {
            if ($this->isNewRecord || !empty($this->password)) {
                $this->password_hash = Yii::$app->security->generatePasswordHash($this->password);
                $this->auth_key = Yii::$app->security->generateRandomString();
            }
            return true;
        }
        return false;
    }

    /**
     * Gets query for [[Baskets]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getBaskets()
    {
        return $this->hasMany(Basket::class, ['user' => 'id']);
    }

    /**
     * Gets query for [[Orders]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getOrders()
    {
        return $this->hasMany(Order::class, ['user' => 'id']);
    }
}
