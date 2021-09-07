import React from 'react';
import './Car.scss';
import Card from "../UI/Card";


const Car = (props) => {
    const car = props.currentCar;
    return (
        <Card customClass='car-element' clickAction={props.clickAction}>
            <h3 className='car-element__title'>
                {`${car.brand} ${car.model}`}
            </h3>
            <span className='car-element__fuel'>
                {`${car.mainFuel}${null !== car.secondaryFuel ? `/${car.secondaryFuel}` : ''}`}
            </span>
            <span className='car-element__color'>
                {car.color}
            </span>
            <span className="car-element__notes">
                {car.notes}
            </span>
        </Card>
    )
}

export default Car;