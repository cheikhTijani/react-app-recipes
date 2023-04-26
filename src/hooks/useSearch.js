import { useState } from "react";
import { projectStorage } from "../firebase/config";

export const useSearch = (collection) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const colRef = projectStorage.collection(collection);

    const search = async (term) => {
        setLoading(true);

        const termRev = term.split('').reverse().join('');

        const titles = colRef.where('title', '>=', term)
            .where('title', '<=', term + '\uf8ff').get();

        const titlesRev = colRef.where('titleRev', '>=', termRev)
            .where('titleRev', '<=', termRev + '\uf8ff').get();

        try {
            const [titlesSnap, titlesRevSnap] = await Promise.all([titles, titlesRev]);

            const results = (titlesSnap.docs).concat(titlesRevSnap.docs);

            let arr = [];

            results.filter(item => {
                const i = arr.findIndex(x => (x.id === item.id));
                if (i <= -1) {
                    arr.push(item.data());
                }
                return null;
            });

            setLoading(false);
            setError(null);
            setData(arr);

        } catch (err) {
            setLoading(false);
            setError('Error getting data');
            console.log(err.message);

        }

    }

    return { error, data, loading, search }
}