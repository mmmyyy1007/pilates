<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class ConvertCamelToSnake
{
    public function handle(Request $request, Closure $next)
    {
        // データを再帰的にスネークケースに変換
        $convertedData = $this->convertKeysToSnakeCase($request->all());

        // リクエストデータを置き換え
        $request->replace($convertedData);

        return $next($request);
    }

    private function convertKeysToSnakeCase(array $data): array
    {
        $result = [];
        foreach ($data as $key => $value) {
            $snakeKey = Str::snake($key);
            if (is_array($value)) {
                // 配列やネストされたデータの場合、再帰的に変換
                $result[$snakeKey] = $this->convertKeysToSnakeCase($value);
            } else {
                // 値がスカラー型の場合、そのまま代入
                $result[$snakeKey] = $value;
            }
        }
        return $result;
    }
}
