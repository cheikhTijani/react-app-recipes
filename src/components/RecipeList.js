import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import './RecipeList.css';
import deleteIcon from '../assets/delete.svg';
import { projectStorage } from '../firebase/config';
import timeIcon from '../assets/time.svg';
import ingIcon from '../assets/ing.svg';

export default function RecipeList({ recipes }) {
    const { color, mode } = useTheme();

    const handleDelete = (id) => {
        projectStorage.collection('recipes').doc(id).delete()
            .then(() => {
                console.log('deleted');
            })
            .catch((err) => {
                console.log(err.message);
            })

    }

    return (
        <div className='recipe-list'>
            {recipes.map(recipe => (
                <div key={recipe.id} className={`card ${mode}`}>
                    <h5 style={{ color: mode !== 'dark' && color }}>{recipe.title}</h5>
                    <div className='image'>
                        <img src={recipe.imageUrl} alt={recipe.title} />
                    </div>
                    <div className='prev-info'>
                        <img src={timeIcon} alt='time icon' title='cooking time' />
                        <span>
                            {recipe.cookingTime}
                        </span>
                    </div>
                    <div className='prev-info'>
                        <img src={ingIcon} alt='ingredient icon' title='ingredients' />
                        <p>
                            {recipe.ingredients.map((ing, i) => (
                                <span key={i}> {ing}{i < recipe.ingredients.length - 1 ? ',' : ''} </span>
                            ))}
                        </p>
                    </div>
                    <Link
                        style={{
                            background: (mode === 'dark') ? '#f5f5f5' : color,
                            color: (mode === 'dark') ? '#333' : '#f5f5f5'
                        }}
                        to={`/recipes/${recipe.id}`}
                    >Steps
                    </Link>
                    <img className='deleteIcon' src={deleteIcon} alt='delete icon' onClick={() => handleDelete(recipe.id)} />
                </div>
            ))}
        </div>
    )
}
