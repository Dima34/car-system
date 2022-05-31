import Container from "../Container/Container";
import s from "./CarCard.module.css";


export default function CarCard(props) {
    const car = props.car;

    return(
        <a key={car.secureKey} href={`https://auto.ria.com${car.linkToView}`} className={s["car-card"]}>
            <Container>
                <img src={`${car.photoData.seoLinkB}`} alt={`${car.title}`} />
                <h2>{car.title} {car.autoData.year} </h2>
                <div className={s["car-card_footer"]}>
                    <p className="date">{car.addDate}</p>
                    <p className="state">{car.stateData.name}</p>
                    <p className="price_usd">{car.USD}$</p>
                    <p className="price_uah">{car.UAH}₴</p>
                    <p>{car.autoData.race}</p>
                </div>
            </Container>                            
        </a>
    )
     
}