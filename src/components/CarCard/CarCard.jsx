import { Link } from "react-router-dom";
import Container from "../Container/Container";
import s from "./CarCard.module.scss";
import fuelIco from "../../icons/fuel-ico.svg"
import gearboxIco from "../../icons/gearbox-ico.svg"
import mileIco from "../../icons/mile-ico.svg"
import stateIco from "../../icons/state-ico.svg"
import PostTime from "../PostTime/PostTime";

function priceFilter(priceLine) {
    let newLine = "";
    priceLine = priceLine.toString().split("").reverse();

    priceLine.forEach((char,index) => {
        newLine += char;

        if ((index + 1) % 3 === 0) {
            newLine += " "
        }
    });

    newLine = newLine.split("").reverse().join("")

    return newLine
}

export default function CarCard(props) {
    const car = props.car;

    return(
        <Container addClass = {s.card}>
            <Link target="_blank" rel="noopener noreferrer" to={"/"+car.autoData.autoId}>
                <img className={s["main-image"]} src={`${car.photoData.seoLinkB}`} alt={`${car.title}`} />
            </Link>

            <Link target="_blank" rel="noopener noreferrer" className="link" to={"/"+car.autoData.autoId}>
                <h2>{car.title} {car.autoData.year} </h2>
            </Link>
            
            <div className={s.price}>
                <p className="h2 green">{priceFilter(car.USD)}$</p>
                <p>{priceFilter(car.UAH)} грн</p>
            </div>

            <div className={s["info-plague"]}>
                <img src={fuelIco} width={24} height={24} alt="" />
                <p>{car.autoData.fuelName}</p>
            </div>
            <div className={s["info-plague"]}>
                <img src={mileIco} width={24} height={24} alt="" />
                <p>{car.autoData.race}</p>
            </div>
            <div className={s["info-plague"]}>
                <img src={stateIco} width={24} height={24} alt="" />
                <p>{car.stateData.name}</p>
            </div>
            <div className={s["info-plague"]}>
                <img src={gearboxIco} width={24} height={24} alt="" />
                <p>{car.autoData.gearboxName}</p>
            </div>

            <PostTime addClass = {s["info-plague"]} date={car.addDate} />
        </Container>
    )
     
}