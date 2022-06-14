import { Link } from "react-router-dom";
import CollectionCardPlug from "../CollectionCardPlug/CollectionCardPlug";
import CollectionCardResults from "../CollectionCardResults/CollectionCardResults";
import Container from "../Container/Container"
import DropDown from "../DropDown/DropDown";
import s from "./CollectionCard.module.css"


export default function CollectionCard(props) {
    let data = props.data

    return (
        <Container addClass={s.collectionCard}>
            
            {
                data.markaName || 
                data.modelName ? (
                    <h2 className="h1">
                        {data.markaName} {data.modelName}
                    </h2>
                ) : null
            }

            {
                data.priceFrom ||
                data.priceTo ? (
                    <p className="h2">
                        Цена: &nbsp;
                        {(data.priceFrom && !data.priceTo) ? "От " : null}
                        {(data.priceTo && !data.priceFrom) ? "До " : null}
                        {data.priceFrom}
                        {data.priceFrom && data.priceTo ? "-" : null}
                        {data.priceTo}$
                    </p>
                ) : null
            }

            {
                data.yearFrom ||
                data.yearTo ? (
                    <p className="h2">
                        Год: &nbsp;
                        {data.yearFrom}
                        {data.yearFrom && data.yearTo ? "-" : null}
                        {data.yearTo}
                    </p>
                ) : null
            }

            {
                data.stateName ? (
                    <p className="h2">
                        Область: {data.stateName}
                    </p>
                ) : null
            }

            {
                data.sortName ? (
                    <p className="h2">
                        Сортировка: {data.sortName}
                    </p>
                ) : null
            }

            {
                (data.cheaperQueryRes ? data.cheaperQueryRes.length !== 0 : false) ? (
                    <CollectionCardResults 
                        carList = {data.cheaperQueryRes}
                        title = {`Дешевле`}
                    />
                ) : null
            }

            <div></div>

            {
                data.fitQueryRes.length !== 0 ? (
                    <CollectionCardResults 
                        carList = {data.fitQueryRes}
                        title = {`Результаты поиска (${data.fitQueryRes.length})`}
                        isOpened = {true}
                    />
                ) : (
                    <h3>Нет результатов</h3>
                )
            }

            <div></div>

            {
                (data.moreExpensiveQueryRes ? data.moreExpensiveQueryRes.length !== 0 : false) ? (
                    <DropDown title={`Дороже`}>
                        <ul className={s.CollectionCardList}>
                            {data.moreExpensiveQueryRes.map(item=>(
                                <li key={item.id}>
                                    <Link to = {"/"+ item.autoData.autoId}>
                                        <CollectionCardPlug carInfo = {item} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </DropDown>
                ) : null
            }            
        </Container>
    )
}