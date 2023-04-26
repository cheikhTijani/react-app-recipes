import React, { useRef, useState } from 'react';
import './Create.css';
import { useHistory } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { projectStorage, storage } from '../../firebase/config';
import { v4 as uuidv4 } from 'uuid';

export default function Create() {
    const { color, mode } = useTheme();

    const [title, setTitle] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [newIng, setNewIng] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [newStep, setNewStep] = useState('');
    const [steps, setSteps] = useState([]);
    const [image, setImage] = useState(null);
    const [fileError, setFileError] = useState(null);
    const [formError, setFormError] = useState(null);


    // refs
    const ingredientRef = useRef(null);
    const stepsRef = useRef(null);

    const history = useHistory();

    // handle file
    const handleFileChange = (e) => {
        setImage(null);
        let selected = e.target.files[0];
        if (!selected) {
            setFileError('Please select an image')
            return;
        }
        if (!selected.type.includes('image')) {
            setFileError('Please select an image file (png/jpg)');
            return;
        }
        if (selected.size > 1000000) {
            setFileError('The image size must not exceed 1 MB');
            return;
        }

        setFileError(null);
        setImage(selected);

    }

    // add ingredienst
    const handleAddIng = (e) => {
        e.preventDefault();
        const ing = newIng.trim();
        if (ing && !ingredients.includes(ing)) {
            setIngredients(prevIng => [...prevIng, ing]);
        }
        setNewIng('');
        ingredientRef.current.focus();
    }
    // change ing
    const removeIng = (e) => {
        const item = e.target.previousSibling.textContent;
        setIngredients(ingredients.filter(ing => ing !== item));
    }
    // add steps
    const handleAddStep = (e) => {
        e.preventDefault();
        const step = newStep.trim();
        if (step && !steps.includes(step)) {
            setSteps(prevSteps => [...prevSteps, step]);
        }
        setNewStep('');
        stepsRef.current.focus();
    }

    // change step
    const removeStep = (e) => {
        const item = e.target.previousSibling.textContent;
        setSteps(steps.filter(step => step !== item));
    }

    // submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        // validate
        if (title.trim() === '' || cookingTime.trim() === '' || ingredients.length === 0 || steps.length === 0) {
            setFormError('Please fill in all the fields');
            return;
        }

        const id = uuidv4().replaceAll('-', '').slice(0, 20);

        try {
            const uploadPath = `recipeImages/${id}/${image.name}`;
            const storedImage = await storage.ref(uploadPath).put(image);
            const imageUrl = await storedImage.ref.getDownloadURL();

            const docData = {
                id,
                title: title.toUpperCase(),
                titleRev: title.split('').reverse().join('').toUpperCase(),
                ingredients,
                steps,
                cookingTime: cookingTime + ' minutes',
                imageUrl
            };

            await projectStorage.collection('recipes').doc(id).set(docData);

            history.push('/');
        } catch (err) {
            setFormError('Something went wrong. Try again');
            console.log(err);
        }

    }

    return (
        <div className={`create ${mode}`}>
            <h3 className='page-title' style={{ color: (mode === 'dark' ? '#f5f5f5' : color) }}>Add a New Recipe</h3>
            <form onSubmit={handleSubmit}>
                {formError && <p>{formError}</p>}
                <label>
                    <span>Recipe title</span>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} required />
                </label>
                <label>
                    <span>Recipe image</span>
                    <input type='file' required onChange={handleFileChange} />
                    {fileError && <div><small>{fileError}</small></div>}
                </label>
                <label>
                    <span>Ingredients</span>
                    <div className='items'>
                        <input type="text" onChange={(e) => setNewIng(e.target.value)} value={newIng} ref={ingredientRef} />
                        <button style={{ background: color }} className='btn' onClick={handleAddIng}>add</button>
                    </div>
                </label>
                <p>{ingredients?.map(ing => {
                    return (
                        <small key={ing} style={{ background: (mode === 'dark' ? '#555' : '#fff'), marginRight: '5px', padding: '3px 9px', borderRadius: '11px' }}>
                            <i>
                                {ing}
                            </i>
                            <b style={{ cursor: 'pointer' }} onClick={removeIng}>
                                &nbsp; x
                            </b>
                        </small>
                    )
                })}</p>
                <label>
                    <span>Cooking Time (minutes)</span>
                    <input type="number" onChange={(e) => setCookingTime(e.target.value)} value={cookingTime} required />
                </label>
                <label>
                    <span>Steps</span>
                    <div className='items'>
                        <input type="text" onChange={(e) => setNewStep(e.target.value)} value={newStep} ref={stepsRef} />
                        <button style={{ background: color }} className='btn' onClick={handleAddStep}>add</button>
                    </div>
                </label>
                <p>{steps?.map(step => {
                    return (
                        <small key={step} style={{ background: (mode === 'dark' ? '#555' : '#fff'), marginRight: '5px', padding: '3px 9px', borderRadius: '11px' }}>
                            <i>
                                {step}
                            </i>
                            <b style={{ cursor: 'pointer' }} onClick={removeStep}>
                                &nbsp; x
                            </b>
                        </small>
                    )
                })}</p>

                <button style={{ background: color }} type='submit' className='btn'>Add Recipe</button>
            </form>
        </div>
    )
}
