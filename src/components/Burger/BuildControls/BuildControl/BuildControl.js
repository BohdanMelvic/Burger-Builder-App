import React from 'react'
import './BuildControl.scss'

export default function BuildControl(props) {
    return (
        <div className='BuildControl'>
            <div className='Label'>{props.label}</div>
            <button className='Less' onClick={props.less}>Less</button>
            <button className='More' onClick={props.add}>More</button>
        </div>
    )
}
