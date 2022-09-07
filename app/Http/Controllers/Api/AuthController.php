<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends ApiController
{
    public function loginUser(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(), 
            [
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if($validateUser->fails()){
                return $this->errorResponse('validation Error', 401, $validateUser->errors());
            }

            if(!Auth::attempt($request->only(['email', 'password']))){
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not match with our record.',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            $data =
            [
                'access_token' => $user->createToken("API TOKEN")->plainTextToken,
            ];
            return $this->successResponse($data, 'Login Successful');
            


        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

    public function createUser(Request $request)
    {
        try {
            //Validated
            $validateUser = Validator::make($request->all(), 
            [
                'name' => 'required|min:3|max:50',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|confirmed|min:6|max:50',
            ]);

            if($validateUser->fails()){
                return $this->errorResponse('validation Error', 401, $validateUser->errors());
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            $data =
            [
                'access_token' => $user->createToken("API TOKEN")->plainTextToken,
            ];

            return $this->successResponse($data, 'User Created',201);

        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

}
