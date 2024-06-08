<?php

namespace app\models;

use Yii;
use yii\web\UploadedFile;

class Product extends \yii\db\ActiveRecord
{
    public $imageFiles;

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
            [['imageFiles'], 'file', 'skipOnEmpty' => true, 'extensions' => 'png, jpg', 'maxFiles' => 10],
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
            'imageFiles' => 'Upload Images',
            'brand' => 'Brand',
            'model' => 'Model',
            'category' => 'Category',
            'price' => 'Price',
            'description' => 'Description',
            'count' => 'Count',
        ];
    }

    public function beforeSave($insert)
    {
        if (parent::beforeSave($insert)) {
            if (is_array($this->imageFiles) && !empty($this->imageFiles)) {
                $this->image = json_encode(array_map(function ($file) {
                    return basename($file);
                }, $this->imageFiles));
            }
            return true;
        }
        return false;
    }

    public function upload()
    {
        if ($this->validate()) {
            $uploadedFiles = [];
            foreach ($this->imageFiles as $file) {
                $dir = 'uploads/' . $file->baseName;
                if (!is_dir($dir)) {
                    mkdir($dir, 0777, true);
                }
                $filePath = $dir . '/' . $file->baseName . '.' . $file->extension;
                if ($file->saveAs($filePath)) {
                    $uploadedFiles[] = $file->baseName . '.' . $file->extension;
                }
            }
            $this->imageFiles = $uploadedFiles;
            return true;
        } else {
            return false;
        }
    }
}
