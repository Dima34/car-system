import { Link } from "react-router-dom"
import CarCard from "../CarCard/CarCard"
import DropDown from "../DropDown/DropDown"

export default function CollectionCardResults(props) {
    
    return(
        <DropDown isOpened = {props.isOpened ? true : null} title={props.title}>
            <ul>
                {props.carList.map(item=>(
                    <li key={item.id}>
                        <CarCard car = {item}/>
                    </li>
                ))}
            </ul>
        </DropDown>
    )
}
