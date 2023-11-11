<?php

use App\Models\Product;
// use Illuminate\Support\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;
// use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


function WeightNorm($data)
{
    // 1. get the max and min value
    $max = max($data);
    $min = min($data);

    // 2. normalisasi data
    $normalized_data = [];
    # sum of all data
    $sum = array_sum($data);
    foreach ($data as $key => $value) {
        $normalized_data[$key] = $value / $sum;
    }

    // 3. return data
    return $normalized_data;
}

function WPM($data, $weight)
{
    # inisiasi kriteria dan bobot
    $new_weight = WeightNorm($weight);
    // $weight = [
    //     'aroma' => $new_weight[0],
    //     'durabilitas' => $new_weight[1],
    //     'ukuran' => $new_weight[2],
    //     'harga' => $new_weight[3],
    // ];

    $weight = [
        'aroma' => $new_weight[0],
        'durabilitas' => $new_weight[1],
        'ukuran' => $new_weight[2],
        'harga' => $new_weight[3],
    ];
    # inisiasi nilai max dan min

    $max = [
        'aroma' => 0,
        'durabilitas' => 0,
        'ukuran' => 0,
        'harga' => 0
    ];

    $min = [
        'aroma' => 999999,
        'durabilitas' => 999999,
        'ukuran' => 999999,
        'harga' => 999999
    ];


    // 2. normalisasi data
    //get the max and min value
    foreach ($data as $key => $value) {
        //get the max
        if ($value->aroma > $max['aroma']) $max['aroma'] = $value->aroma;
        if ($value->durabilitas > $max['durabilitas']) $max['durabilitas'] = $value->durabilitas;
        if ($value->ukuran > $max['ukuran']) $max['ukuran'] = $value->ukuran;
        if ($value->harga > $max['harga']) $max['harga'] = $value->harga;

        //get the min value
        if ($value->aroma < $min['aroma']) $min['aroma'] = $value->aroma;
        if ($value->durabilitas < $min['durabilitas']) $min['durabilitas'] = $value->durabilitas;
        if ($value->ukuran < $min['ukuran']) $min['ukuran'] = $value->ukuran;
        if ($value->harga < $min['harga']) $min['harga'] = $value->harga;
    }

    $normalized_data = [];
    foreach ($data as $key => $value) {
        //normalisasi data 
        $normalized = [
            'aroma' => 0,
            'durabilitas' => 0,
            'ukuran' => 0,
            'harga' => 0
        ];
        $normalized['aroma'] = $value->aroma / $max['aroma']; //beneficial attribute
        $normalized['durabilitas'] = $value->durabilitas / $max['durabilitas']; //beneficial attribute
        $normalized['ukuran'] = $value->ukuran / $max['ukuran']; //beneficial attribute
        $normalized['harga'] = $min['harga'] / $value->harga; // non-beneficial attribute
        //include the rest of the data
        $normalized['id'] = $value->id;
        $normalized['nama'] = $value->nama;
        $normalized['foto'] = $value->foto;
        $normalized['brand'] = $value->brand;
        $normalized['link_pembelian'] = $value->link_pembelian;
        $normalized['deskripsi'] = $value->deskripsi;
        $normalized_data[$key] = $normalized;
    }


    // 3. pengkalian bobot
    foreach ($normalized_data as $key => $value) {
        $normalized_data[$key]['aroma'] = $value['aroma'] ** $weight['aroma'];
        $normalized_data[$key]['durabilitas'] = $value['durabilitas'] ** $weight['durabilitas'];
        $normalized_data[$key]['ukuran'] = $value['ukuran'] ** $weight['ukuran'];
        $normalized_data[$key]['harga'] = $value['harga'] ** $weight['harga'];
    }

    // 4. perkalian semua nilai
    foreach ($normalized_data as $key => $value) {
        $normalized_data[$key]['total'] = $value['aroma'] * $value['durabilitas'] * $value['ukuran'] * $value['harga'];
    }

    // 5. penentuan ranking
    //sort based on total value
    usort($normalized_data, function ($a, $b) {
        return $b['total'] <=> $a['total'];
    });

    //get just total and the id of the perfume
    $final_result = [];
    foreach ($normalized_data as $key => $value) {
        $final_result[$key] = [
            'id' => $data[$key]->id,
            'score' => $value['total'],
            'rank' => $key + 1,
        ];
    }

    // 6. return data
    return  $normalized_data;
}
