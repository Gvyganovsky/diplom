<?php

namespace app\models;

use Yii;
use yii\web\UploadedFile;

class Product extends \yii\db\ActiveRecord
{
    public $imageFiles;

    public static function tableName()
    {
        return 'product';
    }

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
                $fileNames = [];
                foreach ($this->imageFiles as $file) {
                    $fileNames[] = $file->baseName . '.' . $file->extension;
                }
                $this->image = json_encode($fileNames);
            }
            return true;
        }
        return false;
    }

    public function upload()
    {
        if (empty($this->imageFiles)) {
            return false;
        }

        $uploadedFiles = [];
        $uploadPath = 'uploads/products/' . $this->id . '/';

        if (!is_dir($uploadPath)) {
            mkdir($uploadPath, 0777, true);
        }

        // Удаляем старые фотографии перед загрузкой новых
        $this->deleteOldImages($uploadPath);

        foreach ($this->imageFiles as $file) {
            $fileName = $file->baseName . '.' . $file->extension;
            $filePath = $uploadPath . $fileName;

            if ($file->saveAs($filePath)) {
                $uploadedFiles[] = $fileName;
            } else {
                return false;
            }
        }

        $this->image = json_encode($uploadedFiles);
        return true;
    }

    private function deleteOldImages($uploadPath)
    {
        if (is_dir($uploadPath)) {
            $files = glob($uploadPath . '*', GLOB_MARK);
            foreach ($files as $file) {
                if (!is_dir($file)) {
                    unlink($file);
                }
            }
        }
    }
}
