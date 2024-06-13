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
                // Extract file names
                $fileNames = [];
                foreach ($this->imageFiles as $file) {
                    $fileNames[] = $file->baseName . '.' . $file->extension;
                }
                // Save as JSON array of file names
                $this->image = json_encode($fileNames);
            }
            return true;
        }
        return false;
    }

    public function upload()
    {
        if ($this->validate()) {
            $uploadedFiles = [];

            // Assume $id is the ID of the current product instance
            $uploadPath = 'uploads/products/' . $this->id . '/';

            // Create directory if it doesn't exist
            if (!is_dir($uploadPath)) {
                mkdir($uploadPath, 0777, true);
            }

            foreach ($this->imageFiles as $file) {
                $fileName = $file->baseName . '.' . $file->extension;
                $filePath = $uploadPath . $fileName;

                if ($file->saveAs($filePath)) {
                    $uploadedFiles[] = $fileName;
                } else {
                    // Handle error saving file if needed
                    return false;
                }
            }

            // Update imageFiles attribute with uploaded file names
            $this->imageFiles = $uploadedFiles;
            return true;
        } else {
            return false;
        }
    }
}
