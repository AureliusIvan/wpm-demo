import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export function usePerfumes() {
    const [perfumes, setPerfumes] = useState<any[]>([]);

    useEffect(() => {
        axios.get('/api/perfume/').then((res) => {
            console.log(res.data);
            setPerfumes(res.data.data);
        }).catch((err) => {
            console.log(err);
            setPerfumes([]);
        });
    }, []);

    // Memoize the perfumes array so that it only changes when the array itself changes
    const memoizedPerfumes = useMemo(() => perfumes, [perfumes]);

    return memoizedPerfumes;
}

export function usePerfume(id: number) {
    const [perfume, setPerfume] = useState<any>({});

    useEffect(() => {
        axios.get(`/api/perfume/${id}`).then((res) => {
            console.log(res.data);
            setPerfume(res.data.data);
        }).catch((err) => {
            console.log(err);
            setPerfume({});
        });
    }, [id]);

    // Memoize the perfume object so that it only changes when the object itself changes
    const memoizedPerfume = useMemo(() => perfume, [perfume]);

    return memoizedPerfume;
}

export function CalculateWPM(data: any) {
    const { slider1, slider2, slider3, slider4 } = data;

    const [perfumes, setPerfumes] = useState<any[]>([]);
    useEffect(() => {
        const normalizedWeight = MinMaxNormalization([slider1, slider2, slider3, slider4]);
        console.log("Slider Data:", normalizedWeight);
        axios.post('/api/perfume/calculate', {
            "weight": normalizedWeight,
        }).then((res) => {
            console.log(res.data);
            setPerfumes(res.data.data);
        }).catch((err) => {
            console.log(err);
            setPerfumes([]);
        });
    }, []);

    // Memoize the perfumes array so that it only changes when the array itself changes
    const memoizedPerfumes = useMemo(() => perfumes, [perfumes]);

    return memoizedPerfumes;
}


function MinMaxNormalization(value: number[]) {
    console.log("Value:", value);
    if (value.length === 0) {
        return []; // handle the case when the array is empty
    }

    let Min: number = value[0];
    let Max: number = value[0];
    let result: number[] = [];

    value.map((element) => {
        if (element < Min) {
            Min = element;
        }
        if (element > Max) {
            Max = element;
        }
        console.log("Min:", Min);
    });

    value.forEach(element => {
        result.push((element - Min) / (Max - Min));
    });

    return result;
}