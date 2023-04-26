import React, { useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import RecipeList from '../../components/RecipeList';
import { useTheme } from '../../hooks/useTheme';
import { useSearch } from '../../hooks/useSearch';
import './Search.css';

export default function Search() {
    const { color } = useTheme();

    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const query = queryParams.get('q').toUpperCase();
    const history = useHistory();


    const { error, loading, data, search } = useSearch('recipes');

    const searchRef = useRef(search).current;

    useEffect(() => {
        searchRef(query);
    }, [searchRef, query])

    return (
        <div>
            {error && <p className='error'>{error}</p>}
            {loading && <p className='loading'>Loading...</p>}
            {data && data.length === 0 && <div>
                <h3 style={{ color: color }} className='page-title'>No Results for your search: "{query}"</h3>
                <button className='back-btn' onClick={() => history.push('/')}>Go Back</button>
            </div>
            }
            {data && data.length !== 0 && <h3 style={{ color: color }} className='page-title'>Search Results for "{query}"</h3>}
            {data && data.length !== 0 && <RecipeList recipes={data} />}
        </div>
    )
}
