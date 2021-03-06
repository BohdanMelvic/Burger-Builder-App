import React from 'react';
import './Button.scss'

export default function Button(props) {
    return (
        <button
            className={['Button', props.btnType].join(' ')}
            onClick={props.clicked}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}
