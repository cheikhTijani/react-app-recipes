import React, { useEffect, useState } from 'react';
import RecipeList from '../../components/RecipeList';
import './Home.css';
import { projectStorage } from '../../firebase/config';

export default function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        const unsub = projectStorage.collection('recipes').onSnapshot((snapshot) => {
            if (snapshot.empty) {
                setError('No recipes to load');
                setLoading(false);
            } else {
                let results = [];
                snapshot.docs.forEach(doc => {
                    results.push({ id: doc.id, ...doc.data() })
                })
                setData(results);
                setLoading(false);
            }
        }, (err) => {
            setError(err.message);
            setLoading(false)
        })

        return () => unsub();

    }, [])

    return (
        <div className='home'>
            {error && <p className='error'>{error}</p>}
            {loading && <p className='loading'>Loading...</p>}
            {data &&
                <RecipeList recipes={data} />
            }
        </div>
    )
}
