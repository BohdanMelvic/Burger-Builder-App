import React from 'react';
import './Input.scss';

export default function Input(props) {
    let inputElement = null;

    switch (props.inputtype) {
        case ('input'):
            inputElement = <input className='InputElement' {...props} />;
            break;
        case ('textarea'):
            inputElement = <textarea className='InputElement' {...props} />;
            break;
        default:
            inputElement = <input className='InputElement' {...props} />;
            break;
    }
    return (
        <div className='Input'>
            <label htmlFor="InputElement" className='Label'>{props.label}</label>
            {inputElement}
        </div>
    )
}
