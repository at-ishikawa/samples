<?php

use Illuminate\Http\Request;
use Illuminate\Routing\Router;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'cors'], function (Router $router) {
    $router->get('/auth', function () {
        return [ 'success' => true ];
    });

});

Route::post('/jwt', 'JwtController@store');
Route::post('/jwt/login', 'JwtController@login');
Route::group(['middleware' => [
    'jwt.auth',
    'jwt.refresh',
]], function (Router $router) {
    $router->get('/jwt/authenticate', 'JwtController@authenticate');
});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');
