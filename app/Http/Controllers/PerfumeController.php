<?php

namespace App\Http\Controllers;

use App\Models\Perfume;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PerfumeController extends Controller
{
    public function getAllPerfume()
    {
        $perfumes = Perfume::all();

        return response()->json([
            'message' => 'List Semua Parfum Berhasil Diambil!',
            'data' => $perfumes,
            'code' => 200
        ], 200);
    }

    public function calculate(Request $request)
    {
        $perfumes = Perfume::all();


        // clean data
        // remove foto, brand, link_pembelian, deskripsi
        // foreach ($perfumes as $perfume) {
        //     unset($perfume->foto);
        //     unset($perfume->brand);
        //     unset($perfume->link_pembelian);
        //     unset($perfume->deskripsi);
        //     unset($perfume->created_at);
        //     unset($perfume->updated_at);
        //     // unset($perfume->id);
        // }

        //clean unecessary data
        foreach ($perfumes as $perfume) {
            $perfume->aroma = (int) filter_var($perfume->aroma, FILTER_SANITIZE_NUMBER_INT);
            $perfume->ukuran = (int) filter_var($perfume->ukuran, FILTER_SANITIZE_NUMBER_INT);
        }

        //call WPM function
        $calculate = WPM($perfumes, $request->weight);
        // sort $perfumes by $calculate
        // foreach ($calculate as $key => $value) {
        //     // add new column to $perfumes "score" and "rank"
        //     $perfumes[$key]->score = $value['score'];
        //     $perfumes[$key]->rank = $value['rank'];
        // }


        return response()->json([
            'message' => 'List Semua Parfum Berhasil Diambil!',
            'data' => $calculate,
            // 'weight' => $request->weight,
            'code' => 200,
        ], 200);
    }
}
