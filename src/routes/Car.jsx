import { useState } from "react";
import { useParams } from "react-router-dom"
import { getCarById } from "../API";

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

function getImageLink(exampleLink, id) {
    const regexp = /__\d*/gm
    return exampleLink.replace(regexp, `__${id}`)
}

function CarMain(props){
    let car = props.car

    let mainImageUrl = car.photoData.seoLinkF;

    return(
        <div>
            <h1>Car..</h1>
            {
                car.photoData.all.map(id=>(
                <img src={getImageLink(mainImageUrl, id)} />
                ))
            }

            <h1>{car.title} {car.autoData.year}</h1>
            <p>{car.autoData.description}</p>         
            <p>{car.autoData.race}</p>
            <p>{car.autoData.fuelName}</p>
            <p>{car.autoData.gearboxName}</p>
            <p>{car.autoData.driveName}</p>
            <p>{car.USD}$</p>
            <p>{car.UAH}₴</p>
        </div>
    )
}