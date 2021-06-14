<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\User;
// use App\Models\Installment;

class launch extends Model
{
  protected $fillable = [
    "release_type",
    "creditor",
    "description",
    "CPF",
    "CNPJ",
    "value",
    "due_date",
    "payment_date",
    "user_id",
    'created_at',
    'updated_at'
  ]; 

  public function rules()
{
    return [
      'release_type' => 'required',
      'user_id' => 'required',
      'due_date' => 'date|nullable',
      'payment_date' => 'date|nullable',
      'creditor' => 'required',
      'value' => 'required|not_in:0'
    ];
}

  
}
