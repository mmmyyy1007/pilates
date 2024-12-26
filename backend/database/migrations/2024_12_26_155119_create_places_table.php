<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('places')) { // ここで存在チェック
            Schema::create('places', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->string('name');
                $table->boolean('display_flag');
                $table->integer('order_no');
                $table->unsignedBigInteger('user_id');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('places');
    }
};
