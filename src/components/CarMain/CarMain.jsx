import s from "./CarMain.module.css"

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import CarInfo from "../CarInfo/CarInfo";
import CarSlider from "../CarSlider/CarSlider";

function CarMain(props){
    let car = props.car

    return(
        <div className={s.container}>
            <div>
               <CarInfo car={car}/>
            </div>

            <div>
                <CarSlider car = {car}/>
            </div>
        </div>
    )
}

export default CarMain