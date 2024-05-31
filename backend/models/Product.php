<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "product".
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $image
 * @property string|null $brand
 * @property string|null $model
 * @property string|null $category
 * @property float|null $price
 * @property string|null $description
 * @property int|null $count
 *
 * @property Basket[] $baskets
 * @property OrderProduct[] $orderProducts
 */
class Product extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'product';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['image', 'description', 'category'], 'string'],
            [['price'], 'number'],
            [['count'], 'integer'],
            [['name', 'brand', 'model'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'image' => 'Image',
            'brand' => 'Brand',
            'model' => 'Model',
            'price' => 'Price',
            'description' => 'Description',
            'count' => 'Count',
        ];
    }

    /**
     * Gets query for [[Baskets]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getBaskets()
    {
        return $this->hasMany(Basket::class, ['product' => 'id']);
    }

    /**
     * Gets query for [[OrderProducts]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getOrderProducts()
    {
        return $this->hasMany(OrderProduct::class, ['product_id' => 'id']);
    }
}
