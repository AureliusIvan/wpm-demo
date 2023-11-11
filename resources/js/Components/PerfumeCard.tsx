import Guest from '@/Layouts/GuestLayout';
import React, { useState } from 'react'

interface Props {
    nama: string;
    deskripsi: string;
    foto: string;
    aroma: string;
    durabilitas: string;
    ukuran: string;
    harga: string;
    link_pembelian: string;
    rank: number;
    score: number;
}

export default function PerfumeCard({
    nama,
    deskripsi,
    foto,
    aroma,
    durabilitas,
    ukuran,
    harga,
    link_pembelian,
    rank,
    score
}: Props) {

    const [openModal, setOpenModal] = useState(false);
    return (
        <div
            className='bg-white shadow-lg rounded-lg px-4 py-6 mx-4 my-4 relative'
        >
            <div
                className='absolute top-0 left-0 bg-blue-500 text-white px-2 py-1 rounded-br-lg rounded-tl-lg'
            >
                {rank}
            </div>

            {/* Perfume Image */}
            <img
                className='w-full h-64 object-cover'
                src={foto}
                alt={nama} />
            <div
                className='flex flex-col justify-between capitalize font-bold flex-wrap'
            >
                {nama}
            </div>
            <div
                className='bg-slate-700 text-white px-2 py-1 rounded-sm'
            >
                {/* Perfume Name */}
                score : {score}
            </div>
        </div>
    )
}
