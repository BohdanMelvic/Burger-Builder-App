import React from 'react'
import './Modal.scss'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

export default function Modal(props) {
    return (
       <Auxiliary>
           <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div 
                className='Modal'
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </Auxiliary>
    )
}
