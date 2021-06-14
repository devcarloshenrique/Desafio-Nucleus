<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('login', 'Auth\AuthApiController@authenticate');
Route::post('register', 'Auth\AuthApiController@register');

Route::group(['middleware' => ['jwt.verify']], function() {
  
  Route::get('user', 'Auth\AuthApiController@getAuthenticatedUser');

  Route::post('register-launch', 'API\LaunchController@store');

  Route::get('find-launch/{id}', 'API\LaunchController@show');
  
  Route::put('update-launch/{id}', 'API\LaunchController@update');

  Route::delete('delete-launch/{id}', 'API\LaunchController@destroy');

  Route::post('find-all-launch-user', 'API\LaunchController@index');
  
  Route::post('list-balance', 'API\BalanceController@index');

});