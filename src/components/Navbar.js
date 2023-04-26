import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import './Navbar.css';
import SearchBar from './SearchBar';
import logo from '../assets/logo-recipe.png';

export default function Navbar() {
    const { color } = useTheme();
    return (
        <div className='navbar' style={{ background: color }}>
            <nav>
                <Link to="/" className='brand'>
                    <img className='logo' src={logo} alt='chef' width="40" />
                    <p><small><em>Quick Recipes</em></small></p>
                </Link>
                <div className='left'>
                    <Link to="/" className='add-btn'>
                        All Recipes
                    </Link>
                    <Link to="/create" className='add-btn'>
                        Add Recipe
                    </Link>
                    <SearchBar />
                </div>
            </nav>

        </div>
    )
}
