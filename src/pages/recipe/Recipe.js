import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { projectStorage } from '../../firebase/config';
import { useTheme } from '../../hooks/useTheme';
import './Recipe.css';
import timeIcon from '../../assets/time.svg';
import ingIcon from '../../assets/ing.svg';
import { Link } from 'react-router-dom';

export default function Recipe() {
    const { mode, color } = useTheme();
    const { id } = useParams();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        const unsub = projectStorage.collection('recipes').doc(id).onSnapshot((doc) => {
            if (doc.exists) {
                setLoading(false);
                setRecipe(doc.data());
            } else {
                setLoading(false);
                setError('Could not found this recipe');
            }
        })

        return () => unsub();

    }, [id])


    return (
        <div className={`recipe ${mode}`}>
            {error && <p className='error'>{error}</p>}
            {loading && <p className='loading'>Loading...</p>}
            {recipe &&
                <>
                    <div className='content'>
                        <div className='image'>
                            <h3 style={{ color: (mode !== 'dark') ? color : '#f5f5f5' }} className='page-title'>{recipe.title}</h3>
                            <img src={recipe.imageUrl} alt={recipe.title} />
                        </div>
                        <div className='info'>
                            <div>
                                <img src={timeIcon} alt='time icon' title='cooking time' />
                                {recipe.cookingTime}
                            </div>
                            <div>
                                <img src={ingIcon} alt='ingredient icon' title='ingredients' />
                                <p>
                                    {recipe.ingredients.map((ing, i) => (
                                        <span key={i}> {ing}{i < recipe.ingredients.length - 1 ? ',' : ''} </span>
                                    ))}
                                </p>
                            </div>
                            <h5>How to cook</h5>
                            <ol>
                                {recipe.steps.map((ing, i) => {
                                    return <li key={i}>{ing}</li>
                                }
                                )}
                            </ol>
                        </div>
                    </div>
                    <Link
                        style={{
                            background: (mode === 'dark') ? '#f5f5f5' : color,
                            color: (mode === 'dark') ? '#333' : '#f5f5f5'
                        }}
                        to="/"
                        className='mainLink'
                    >Go Back
                    </Link>
                </>
            }
        </div>
    )
}
