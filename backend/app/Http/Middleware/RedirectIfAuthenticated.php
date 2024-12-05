<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  ...$guards
     * @return mixed
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                // JSONリクエストの場合、409 Conflictを返す
                if ($request->expectsJson()) {
                    return response()->json([
                        'message' => 'You are already authenticated.',
                    ], Response::HTTP_CONFLICT);
                }

                // それ以外の場合はホームにリダイレクト
                return redirect(RouteServiceProvider::HOME);
            }
        }

        return $next($request);
    }
}
