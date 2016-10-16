<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtController extends Controller
{
    public function store(Request $request)
    {
        $input = $request->input();

        $input['password'] = Hash::make($input['password']);
        $user = User::create($input);
        $token = JWTAuth::fromUser($user);

        return [
            'token' => $token,
        ];
    }

    public function login(Request $request)
    {
        $credentials = $request->all();

        $token = JWTAuth::attempt($credentials);
        return [
            'token' => $token,
        ];
    }

    public function authenticate()
    {
        // \Log::info(\Request::headers());
        $user = JWTAuth::parseToken()->authenticate();
        if (!$user) {
            abort(404);
        }
        return [
            'user' => $user
        ];
    }
}