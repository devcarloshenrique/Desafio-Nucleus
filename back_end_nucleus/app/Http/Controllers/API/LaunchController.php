<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Launch;
use LaravelLegends\PtBrValidator\Rules\FormatoCpf;
use LaravelLegends\PtBrValidator\Rules\FormatoCnpj;
use JWTAuth;
use DateTime;
use Carbon\Carbon;


class LaunchController extends Controller
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
        
        if(!$date)
            return response()->json(['error' => 'select a release date'],405); 

        $launchs = $this->launch->where('user_id', $user->id)
            ->whereYear('created_at', '=', $date->format('Y'))
            ->whereMonth('created_at', '=', $date->format('m'))
            ->orderBy("created_at", 'desc')
            ->paginate($request->input('per_page'));

        return response()->json(compact('launchs'));
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
        
        $user = JWTAuth::parseToken()->authenticate();
    
        $data = $request->all();
    
        $data += ['user_id' => $user->id];

        try{

            $request->validate([
                'CPF'  => [ new FormatoCpf],
                'CNPJ'  => [ new FormatoCnpj],
            ]);
    
        } catch (\Illuminate\Validation\ValidationException $e) {
            
            return response()->json(['error' => $e->errors()], 405); 

        }

        $validate = validator($data, $this->launch->rules()); 
        
        if ($validate->fails()) { 
            $messages = $validate->messages(); 
            return response()->json(['error' => $messages],405); 
        } 

        if (!$insert = ['data' => $this->launch->create($data)]) { 
            return response()->json(['error' => 'Error insert'], 500); 
        } 

        return response()->json($insert); 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if(!$launch = $this->launch->find($id))
            return response()->json(['error' => 'not_found'],404); 

        return response()->json(compact('launch')); 
        
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
        $launch = $this->launch->find($id);


        $data = $request->all();   

        try{

            $request->validate([
                'CPF'  => [ new FormatoCpf],
                'CNPJ'  => [ new FormatoCnpj],
            ]);
    
        } catch (\Illuminate\Validation\ValidationException $e) {
            
            return response()->json($e->errors()); 

        }

        $validate = validator($data, $this->launch->rules()); 
        
        if ($validate->fails()) { 
            $messages = $validate->messages(); 
            return response()->json(['validate.error', $messages],405); 
        } 

        if (!$launch)
            return response()->json(['error' => 'not_found'],404);


        if (!$update = $launch->update($data))
            return response()->json(['error' => 'product_not_update'], 500);

       
            return response()->json($update);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        if(!$launch = $this->launch->find($id))
            return response()->json(['error' => 'not_found'],404); 

            
        if (!$delete = $launch->delete()) 
            return response()->json(['error' => 'launch_not_delete'], 500); 
                    
        
        return response()->json($delete);

    }

}
