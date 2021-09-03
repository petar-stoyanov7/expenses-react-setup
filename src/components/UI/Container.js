import React from 'react';
import './Container.scss';

const Container = (props) => {
    return (
        <div className={`content-container ${props.customClass}`}>
            {props.children}
        </div>
    )
}

export default Container;