import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SearchBar.css';
import searchIcon from '../assets/search.svg';

export default function SearchBar() {
    const [term, setTerm] = useState('');
    const history = useHistory();
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (term.trim() === '') return;
        inputRef.current.value = '';
        inputRef.current.blur();
        history.push(`/search?q=${term}`);
        setTerm('');
    }
    return (
        <div className='searchBar'>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setTerm(e.target.value)} ref={inputRef} value={term} required placeholder='Search for recipes' />

                <img src={searchIcon} alt='search icon' width={25} onClick={handleSubmit} />
            </form>
        </div>
    )
}
