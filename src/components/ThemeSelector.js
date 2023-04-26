import React from 'react';
import { useTheme } from '../hooks/useTheme';
import './ThemeSelector.css';
import modeIcon from '../assets/mode.svg';

export default function ThemeSelector() {
    const { changeColor, changeMode, mode } = useTheme();

    const themeColors = ['#58249c', '#6a8f6b', '#4973f2'];

    const toggleMode = () => {
        changeMode(mode === 'dark' ? 'light' : 'dark')
    }

    return (
        <div className='theme-selector side-padd'>
            <div className='mode-toggle'>
                <img
                    src={modeIcon}
                    alt='toggle mode icon'
                    onClick={toggleMode}
                    style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(10%)' }}
                />
            </div>
            <div className='theme-buttons'>
                {themeColors.map(color => (
                    <div
                        key={color}
                        onClick={() => changeColor(color)}
                        style={{ background: color }}
                    />
                ))}
            </div>
        </div>
    )
}
