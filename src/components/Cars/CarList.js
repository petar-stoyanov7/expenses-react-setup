import React, {useContext, useEffect, useState, Fragment} from 'react';

import './CarList.scss';
import AuthContext from "../../Store/auth-context";
import axios from "axios";
import Car from "./Car";
import ReactDOM from "react-dom";
import CarModal from "./CarModal";


const overlayContainer = document.getElementById('black-overlay-1');

const dummyData = [
    {
        id: 0,
        brand: 'BMW',
        model: '330i',
        color: 'Black',
        mainFuel: 'Gas',
        secondaryFuel: 'LPG',
        year: '2014',
        mileage: '115010',
        lastYearSpent: 4315
    }
];
const dummyCarData = {
    showModal: false,
    car: {}
}

const CarList = (props) => {
    const ctx = useContext(AuthContext);
    const showControls = undefined !== props.showControls ? props.showControls : false;

    const [carList, setCarList] = useState(dummyData);
    const [carModal, setCarModal] = useState(dummyCarData);

    const hideCarDetails = () => {
        setCarModal({
            showModal: false,
            car: {}
        })
    }
    const showCarDetails = (car) => {
        setCarModal({
            showModal: true,
            car: car
        });
    }

    const BlackOverlay = () => {
        return <div className="site-overlay black-overlay-1" onClick={hideCarDetails}></div>;
    }

    useEffect(() => {
        if (ctx.userDetails.isLogged) {
            const ajaxCfg = ctx.ajaxConfig;

            axios.post(ajaxCfg.server + ajaxCfg.getCars, {
                id: ctx.userDetails.user.id,
                hash: ajaxCfg.hash
            }).then((response) => {
                const data = response.data;
                console.log('response data');
                console.log(data);
                if (data.success) {
                    const formattedCarList = data.cars.map((car) => {
                        return {
                            id: car.ID,
                            brand: car.Brand,
                            model: car.Model,
                            year: car.Year,
                            color: car.Color,
                            mileage: car.Mileage,
                            mainFuel: car.fuel_name1,
                            secondaryFuel: car.fuel_name2,
                            notes: car.Notes
                        }
                    });
                    setCarList(formattedCarList);
                } else {
                    setCarList([]);
                }
            });
        } else {
            setCarList(dummyData);
            setCarModal(dummyCarData);
        }
    }, [ctx]);

    return (
        <Fragment>
            {carModal.showModal && (
                <Fragment>
                    <CarModal
                        onClose={hideCarDetails}
                        ajaxCfg={ctx.ajaxConfig}
                        car={carModal.car}
                        showControls={showControls}
                    />
                    {ReactDOM.createPortal(
                        <BlackOverlay />,
                        overlayContainer
                    )}
                </Fragment>
            )}
            <div className="car-list">
                <h3 className='container-title'>Cars:</h3>

                <div className="car-list__cars">
                    {carList.map((car) => {
                        return (
                            <Car
                                key={car.id}
                                currentCar={car}
                                clickAction={() => {showCarDetails(car)}}
                            />
                        );
                    })}
                </div>
            </div>
        </Fragment>
    );
}

export default CarList;