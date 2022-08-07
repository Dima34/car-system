import CarCard from "../CarCard/CarCard"
import DropDown from "../DropDown/DropDown"
import s from "./CollectionCardResults.module.css"

export default function CollectionCardResults(props) {
    
    return(
        <DropDown isOpened = {props.isOpened ? true : null} title={props.title}>
            <div className={s.collectionCardContainer}>
                <ul className={s.collectionCardList}>
                        {props.carList.map(item=>(
                            <li key={item.id}>
                                <CarCard car = {item}/>
                            </li>
                        ))}
                </ul>
                {
                    props.resAmount > 6 ? (
                        <div className={s.collectionCardSearchAll}>
                            <button onClick={()=>props.makeSearch(props.searchQuery)} className="link p">Показать еще</button>
                        </div>
                    ) : null
                }                
            </div>            
        </DropDown>
    )
}
