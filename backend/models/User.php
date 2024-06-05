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
 * @property int $admin

 * @property Basket[] $baskets
 * @property Order[] $orders
 */
class User extends \yii\db\ActiveRecord implements \yii\web\IdentityInterface
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
            ['admin', 'boolean'],
            ['email', 'unique', 'targetClass' => self::class, 'message' => 'Этот адрес электронной почты уже используется'],
            ['password', 'string', 'min' => 6],
            ['password', 'match', 'pattern' => '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/', 'message' => 'Пароль должен содержать минимум 6 символов, хотя бы одну заглавную букву, одну прописную букву и один специальный символ'],
            ['login', 'match', 'pattern' => '/^[a-zA-Z]{3,20}$/', 'message' => 'Логин должен содержать только латинские символы и иметь длину от 3 до 20 символов'],
            ['phone', 'match', 'pattern' => '/^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/', 'message' => 'Некорректный формат телефона'],
            ['address', 'match', 'pattern' => '/г\..+|ул\..+|д\..+/', 'message' => 'Адрес должен содержать ключевые слова "г.", "ул." и "д."'],
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
            if ($this->isNewRecord || $this->isAttributeChanged('password')) {
                $this->password = Yii::$app->security->generatePasswordHash($this->password);
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

    /**
     * Finds user by username.
     *
     * @param string $email
     * @return static|null
     */

    ###########################################
    ### Identity интерфейс ###
    ###########################################

    /**
     * {@inheritdoc}
     */
    public static function findIdentity($id)
    {
        return self::findOne($id);
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['access_token' => $token]);
    }

    /**
     * Finds user by username
     *
     * @param string $email
     * @return static|null
     */
    public static function findByUsername($email)
    {
        return self::find()->where(['email' => $email])->one();
    }

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * {@inheritdoc}
     */
    public function getAuthKey()
    {
    }

    /**
     * {@inheritdoc}
     */
    public function validateAuthKey($authKey)
    {
    }

    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return bool if password provided is valid for current user
     */
    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password);
    }
    
}
