<?php

namespace App\Place\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Database\Factories\PlaceFactory;

class Place extends Model
{
    use HasFactory;

    /**
     * モデルに関連付けるテーブル
     *
     * @var string
     */
    protected $table = 'places';

    /**
     * テーブルに関連付ける主キー
     *
     * @var string
     */
    protected $keyType = 'string';
    protected $primaryKey = 'id';

    /**
     * モデルのIDを自動増分するか
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * 明示的にファクトリを指定
     */
    protected static function newFactory()
    {
        return PlaceFactory::new();
    }
}
