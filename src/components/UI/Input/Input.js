import React from 'react';
import './Input.scss';

export default function Input(props) {
    let inputElement = null;
    let inputClasses = ['InputElement'];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('Invalid');
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className='ValidationError'>Please enter a valid {props.name}!</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                    className={inputClasses.join(' ')} 
                    value={props.value}
                    onChange={props.changed}
                    {...props.elementConfig} 
                />;
            break;
        case ('textarea'):
            inputElement = <textarea 
                    className={inputClasses.join(' ')} 
                    value={props.value}
                    onChange={props.changed}
                    {...props.elementConfig}
                />;
            break;
        case ('select'):
            inputElement = (
                <select 
                    className={inputClasses.join(' ')} 
                    value={props.value} 
                    onChange={props.changed}
                >
                    { props.elementConfig.options.map( option => (
                        <option 
                            key={option.value} 
                            value={option.value}
                        > 
                            {option.displayValue} 
                        </option>
                    ))}
                </select>);
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />;
            break;
    }
    return (
        <div className='Input'>
            { props.label ? <label htmlFor="InputElement" className='Label'>{props.label}</label> : null }
            {inputElement}
            {validationError}
        </div>
    )
}
