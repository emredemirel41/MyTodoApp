<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $task = Task::where('user_id',$user->id)->orderBy('order','asc')->get();
        return $this->successResponse($task, 'User Tasks',200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $validateUser = Validator::make($request->all(), 
        [
            'text' => 'required|max:250',
        ]);

        if($validateUser->fails()){
            return $this->errorResponse('validation Error', 401, $validateUser->errors());
        }

        $task = Task::create([
            'text' => $request->text,
            'user_id' => $user->id,
            'status' => false,
            'order' => 1,
        ]);

        $tasks = Task::where('user_id',$user->id)->where('id','!=',$task->id)->orderBy('order','asc')->get();
        $temp = 2;
        foreach($tasks as $task){
            $task->update([
                'order' => $temp,
            ]);
            $temp = $temp + 1;
        }

        return $this->successResponse( $task, 'Task Created',201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        $user = $request->user();

        //Control this is User task?

        if($task->user_id != $user->id){
            return $this->errorResponse('Authorization Error', 403, Null);
        }

        $validateUser = Validator::make($request->all(), 
        [
            'text' => $request->text ? 'required|max:250' : '',
            'status' => $request->status ? 'required|max:250' : ''
        ]);

        if($validateUser->fails()){
            return $this->errorResponse('validation Error', 401, $validateUser->errors());
        }

        $task->update([
            'text' => $request->text ? $request->text : $task->text,
            'status' => $request->status ? 1 : 0,
            'order' => $request->order ? $request->order : $task->order,
        ]);

        return $this->successResponse($task, 'Task Updated',200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Task $task)
    {
        $user = $request->user();

        //Control this is User task?

        if($task->user_id != $user->id){
            return $this->errorResponse('Authorization Error', 403, Null);
        }

        $task->delete();
        $tasks = Task::where('user_id',$user->id)->orderBy('order','asc')->get();
        $temp = 1;
        foreach($tasks as $task){
            $task->update([
                'order' => $temp,
            ]);
            $temp = $temp + 1;
        }

        return $this->successResponse(Null, 'Task Deleted',200);
    }



    
}
