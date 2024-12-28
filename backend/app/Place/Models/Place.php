<?php

namespace App\Place\Models;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
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
    // protected $primaryKey = 'user_id';
}
