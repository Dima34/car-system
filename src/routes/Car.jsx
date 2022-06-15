import { useState } from "react";
import { useParams } from "react-router-dom"
import { getCarById } from "../API";
import CarMain from "../components/CarMain/CarMain";

export default function Car(props) {
    const [carInfo, setCarInfo] = useState({})
    const [isFetching, setIsFetching] = useState(false)
    let carId = useParams().id;

    useState(async ()=>{
        setIsFetching(true)
        setCarInfo(await getCarById(carId))
        setIsFetching(false)        
    }, [])

    console.log(carInfo);

    return (
        <div className="wrapper">
            { 
                isFetching ? (
                    <h1>Загрузка...</h1>
                ) : (
                    <CarMain car = {carInfo}/>
                )
            } 
        </div>               
    )
}



