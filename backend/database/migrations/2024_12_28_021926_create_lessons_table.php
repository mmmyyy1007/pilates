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
        if (!Schema::hasTable('lessons')) { // ここで存在チェック
            Schema::create('lessons', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->dateTime('start_datetime')->nullable(false);
                $table->dateTime('end_datetime')->nullable(false);
                $table->string('place')->nullable(false);
                $table->unsignedBigInteger('user_id')->nullable(false);
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
