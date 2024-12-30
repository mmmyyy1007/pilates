<?php

namespace App\Lesson\Models;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    /**
     * モデルに関連付けるテーブル
     *
     * @var string
     */
    protected $table = 'lessons';

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
}
