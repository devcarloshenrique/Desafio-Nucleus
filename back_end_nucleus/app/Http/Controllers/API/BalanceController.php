<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Launch;
use DateTime;
use Carbon\Carbon;
use JWTAuth;



class BalanceController extends Controller
{

    private $launch;

    public function  __construct(Launch $launch){
        $this->launch = $launch;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $user = JWTAuth::parseToken()->authenticate();

        $date = DateTime::createFromFormat('Y-m-d', trim($request->input('launch_date')));
        
        $revenue =  $this->launch
        ->where('user_id', $user->id)
        ->where('release_type', 'receita')
        ->whereYear('due_date', '=', $date->format('Y'))
        ->whereMonth('due_date', '=', $date->format('m'))        
        ->sum('value');        
        
        
        $expense_paid =  $this->launch
        ->where('user_id', $user->id)
        ->where('release_type', 'despesa')
        ->whereNotNull('payment_date')
        ->whereYear('due_date', '=', $date->format('Y'))
        ->whereMonth('due_date', '=', $date->format('m'))        
        ->sum('value');

        
        $account_balance = json_encode($revenue - $expense_paid);
        
        $expense =  $this->launch
        ->where('user_id', $user->id)
        ->where('release_type', 'despesa')
        ->whereNull('payment_date')
        ->whereYear('due_date', '=', $date->format('Y'))
        ->whereMonth('due_date', '=', $date->format('m'))        
        ->sum('value');
            
        return response()->json(compact(['account_balance', 'expense']));
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
