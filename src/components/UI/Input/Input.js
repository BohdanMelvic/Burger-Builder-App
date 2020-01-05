import React from 'react';
import './Input.scss';

export default function Input(props) {
    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                    className='InputElement' 
                    value={props.value}
                    onChange={props.changed}
                    {...props.elementConfig} 
                />;
            break;
        case ('textarea'):
            inputElement = <textarea 
                    className='InputElement' 
                    value={props.value}
                    onChange={props.changed}
                    {...props.elementConfig}
                />;
            break;
        case ('select'):
            inputElement = (
                <select 
                    className='InputElement' 
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
            inputElement = <input className='InputElement' {...props.elementConfig} value={props.value} />;
            break;
    }
    return (
        <div className='Input'>
            <label htmlFor="InputElement" className='Label'>{props.label}</label>
            {inputElement}
        </div>
    )
}
