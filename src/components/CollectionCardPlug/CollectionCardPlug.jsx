import s from "./CollectionCardPlug.module.css";
import Container from "../Container/Container";

export default function CollectionCardPlug(props) {
    let car = props.carInfo

    return(
        <a target="_blank" href={"https://auto.ria.com" + car.linkToView}>
            <Container addClass = {s.cardPlug}>
                <img src={car.photoData.seoLinkB} alt={car.title} />
                <div className={s.cardPlugInfo}>
                    <p className="fw-500">Цена: {car.USD}$</p>
                    <p className="fw-500">Год: {car.autoData.year}</p>
                </div>
            </Container>
        </a>
        
    )
}