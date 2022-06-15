import classNames from "classnames";
import Container from "../Container/Container";
import s from "./CarMain.module.css"
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

function getImageLink(exampleLink, id) {
    const regexp = /__\d*/gm
    return exampleLink.replace(regexp, `__${id}`)
}

function CarMain(props){
    let car = props.car

    let mainImageUrl = car.photoData.seoLinkF;

    return(
        <div className={s.container}>
            <div>
                <Container addClass = {s.info}>
                    <h1>{car.title} {car.autoData.year}</h1>
                    <div className={s.pricenrace}>
                        <p className="green h1">{car.USD}$</p>
                        <p className="fw-600">{car.UAH} грн</p>
                    </div>
                    <div></div>
                    <p className="fw-500">{car.autoData.description}</p>
                    <ul className={s.infoList}>
                        <li className={s.infoPlague}>
                            <p className="fw-700">Пробег</p>
                            <p>{car.autoData.race}</p>
                        </li>
                        <li className={s.infoPlague}>
                            <p className="fw-700">Двигатель</p>
                            <p>{car.autoData.fuelName}</p>
                        </li>
                        <li className={s.infoPlague}>
                            <p className="fw-700">Коробка</p>
                            <p>{car.autoData.gearboxName}</p>
                        </li>
                        <li className={s.infoPlague}>
                            <p className="fw-700">Привод</p>
                            <p>{car.autoData.driveName}</p>
                        </li>
                    </ul>
                    <div></div>
                    <a className={classNames(s.pageLink, "button", "h2", "fw-800")} href={`https://auto.ria.com/uk${car.linkToView}`} target="_blank">
                        Открыть на AUTO.RIA
                    </a>
                </Container>
            </div>
            <div>
                <Container addClass = {s.galleryContainer}>
                <Swiper className="mySwiper">
                    {
                        car.photoData.all.map(id=>(
                            <SwiperSlide>
                                <img src={getImageLink(mainImageUrl, id)} />
                            </SwiperSlide> 
                        ))
                    }
                </Swiper>
                
                </Container>        
            </div>
            
            
        </div>
    )
}

export default CarMain