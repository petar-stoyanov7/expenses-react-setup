import React, {useState, useContext, useEffect} from 'react';
import './HomePage.scss';
import Container from "../UI/Container";
// import ExpenseTable from "../UI/ExpenseTable";
import CarList from "../Cars/CarList";
import AuthContext from "../../Store/auth-context";
import LastFive from "../LastFive/LastFive";

const dummyData = {
    name: 'Guest',
    carsNumber: 1,
    yearTotal: 4315,
    lastYear: new Date().getFullYear(),
};

const HomePage = (props) => {
    const ctx = useContext(AuthContext);

    console.log('homepage');
    console.log(ctx.userDetails);

    const [userData, setUserData] = useState(dummyData);

    useEffect(() => {
        console.log('homepage effect');
        console.log(ctx);
        if (undefined !== ctx.userDetails.user && Object.keys(ctx.userDetails.user).length !== 0) {
            setUserData({
                ...userData,
                name: `${ctx.userDetails.user.firstName} ${ctx.userDetails.user.lastName}`
            });
        } else {
            setUserData(dummyData);
        }
    }, [ctx]);


    return (
        <div className='homepage'>
            <Container customClass="half-width">
                <h3 className='container-title'>Welcome back, {userData.name}</h3>
                <div className="content">
                <div>
                    <strong>Number of cars:</strong> {userData.carsNumber}
                </div>
                <div>
                    <strong>Total spent for {userData.lastYear}</strong>: {userData.yearTotal}
                </div>
                </div>
            </Container>
            <Container customClass="half-width">
                <CarList />
            </Container>
            <Container>
                <LastFive />
            </Container>
        </div>
        );
};

export default  HomePage;