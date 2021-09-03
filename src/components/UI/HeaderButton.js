import React from 'react';
import './HeaderButton.scss';

const HeaderButton = (props) => {
    return (
        <div
            className={`header-button ${props.customClass}`}
            onClick={props.method}
        >
            <span className="header-button__description">
                {props.text}
            </span>
            <img
                className="header-button__image"
                src={props.imageUrl}
                alt={props.imageAlt}
            />
        </div>
    )
};

export default HeaderButton;