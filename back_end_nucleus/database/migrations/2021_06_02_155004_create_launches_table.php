<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLaunchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('launches', function (Blueprint $table) {
            $table->id();
            $table->enum('release_type', ['receita', 'despesa']);            
            //Nome do cliente
            $table->string('creditor', 100)->nullable();
            //Descrição
            $table->string('description', 100)->nullable();            
            $table->string('CPF', 100)->nullable();
            $table->string('CNPJ', 100)->nullable();
            $table->decimal('value', $precision = 8, $scale = 2)->nullable();
            $table->date('due_date')->nullable()->nullable();
            $table->date('payment_date')->nullable()->nullable();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('launches');
    }
}
