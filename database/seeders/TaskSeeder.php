<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        Task::truncate();
        for ($x = 0; $x <= 10; $x++) {
            $count = User::all()->count();
            $user = User::find(rand(1,$count));
            Task::create([
                'text' => 'Bla bla',
                'user_id' => $user->id,
            ]);
        }
       
    
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
