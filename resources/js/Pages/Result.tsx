import { CalculateWPM } from '@/Services/PerfumeService'
import axios from 'axios';
import React, { useEffect } from 'react'

export default function Result() {
    const calculate = CalculateWPM([1, 2, 3, 4]);
    useEffect(() => {
        console.log(calculate);
    }, []);

    return (
        <div
            className='container mx-auto mt-8'
        >
            <h1>
                Result
            </h1>
            {/* {calculate.map((perfume: any, key) => {
                return (
                    <div
                        className='bg-white shadow-lg rounded-lg px-4 py-6 mx-4 my-4'
                        key={key}>
                        <img
                            src={perfume.foto}
                            alt={perfume.foto}
                            className='w-full h-64 object-cover'
                        />
                        <h1>{perfume.nama}</h1>
                        <p>{perfume.deskripsi}</p>
                    </div>
                )
            })} */}
        </div>
    )
}
