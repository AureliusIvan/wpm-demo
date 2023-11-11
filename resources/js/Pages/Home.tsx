import PerfumeCard from '@/Components/PerfumeCard';
import Guest from '@/Layouts/GuestLayout';
import { usePerfume, usePerfumes } from '@/Services/PerfumeService';
import { router } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const label = ["aroma", "durabilitas", "ukuran", "harga"];

export default function Home() {
    // const perfumes = usePerfumes();
    const [perfumes, setPerfumes] = useState<any[]>([]);
    const [sliderValues, setSliderValues] = useState<any>({
        slider1: 3,
        slider2: 3,
        slider3: 3,
        slider4: 3,
    });

    const handleSliderChange = (sliderName: string, value: number) => {
        console.log(sliderName, value);
        setSliderValues((prevValues: any) => ({
            ...prevValues,
            [sliderName]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post('/api/perfume/calculate', {
            "weight": [sliderValues.slider1, sliderValues.slider2, sliderValues.slider3, sliderValues.slider4],
        }).then((res) => {
            console.log("Result:", res.data);
            setPerfumes(res.data.data);
            console.log(perfumes);
        })
        document.getElementById('perfume-result')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Guest>
            <div className="container bg-slate-700 py-[4rem] flex justify-center flex-col gap-4 scroll-smooth">
                <div
                    className='w-full flex flex-col justify-center items-center'
                >
                    <h1
                        className='text-3xl font-semibold mb-4 w-full text-center text-white'
                    >

                        Sistem Rekomendasi Parfum menggunakan Metode Weighted Product Model
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-lg mx-auto bg-white rounded-lg overflow-hidden shadow-lg px-8 pt-6 pb-8"
                    >
                        <h2 className="text-3xl font-semibold mb-4 text-center">
                            Seberapa penting kriteria berikut ini bagi Anda?
                        </h2>
                        {/* Sliders */}
                        {label.map((value, index) => (
                            <div key={index} className="mb-4">

                                <label className="block mb-2 capitalize">
                                    {/* {`Slider ${index + 1}: ${sliderValues[`slider${index + 1}`]}`} */}
                                    {value}
                                    <span>
                                        <span className="text-gray-600"> ({sliderValues[`slider${index + 1}`]})</span>
                                    </span>
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="5"

                                    value={sliderValues[`slider${index + 1}`]}
                                    onChange={(e) =>
                                        handleSliderChange(`slider${index + 1}`, parseInt(e.target.value))
                                    }
                                    // add number labels
                                    // adjust the position of the tick marks

                                    list={`tickmarks-${index + 1}`}
                                    className="w-full h-5 bg-gray-300 rounded-lg appearance-none
                            focus:outline-none focus:shadow-outline"
                                // className="w-full h-2 bg-gray-300 rounded-lg appearance-none"
                                />
                            </div>
                        ))}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
                        >
                            Submit
                        </button>
                    </form>
                </div>
                {/* // Perfume List */}
                {
                    perfumes.length > 0 &&

                    <section
                        id='perfume-result'
                        className='w-full flex flex-row flex-wrap justify-center'
                    >
                        <h1
                            className='text-3xl font-semibold mb-4 w-full text-center text-white'
                        >
                            Result
                        </h1>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full"
                        >
                            {perfumes.map((perfume: any, i) => (
                                <PerfumeCard
                                    aroma={perfume.aroma}
                                    deskripsi={perfume.deskripsi}
                                    durabilitas={perfume.durabilitas}
                                    foto={perfume.foto}
                                    harga={perfume.harga}
                                    link_pembelian={perfume.link_pembelian}
                                    nama={perfume.nama}
                                    ukuran={perfume.ukuran}
                                    key={i}
                                    rank={i + 1}
                                    score={perfume.total}
                                />
                            ))}
                        </div>
                    </section>
                }
            </div>
        </Guest>
    );
}
