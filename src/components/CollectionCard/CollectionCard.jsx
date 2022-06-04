import CollectionCardPlug from "../CollectionCardPlug/CollectionCardPlug";
import Container from "../Container/Container"
import DropDown from "../DropDown/DropDown";
import s from "./CollectionCard.module.css"


export default function CollectionCard(props) {
    let data = props.data

    return (
        <Container addClass={s.CollectionCard}>

            {
                data.markaName || 
                data.modelName ? (
                    <h2>
                        {data.markaName} {data.modelName}
                    </h2>
                ) : null
            }            

            {
                data.priceFrom ||
                data.priceTo ||
                data.yearFrom ||
                data.yearTo ? (
                    <p className="fw-600 h3">
                        {data.priceFrom}
                        {data.priceFrom && data.priceTo ? "-" : null}
                        {data.priceTo}$

                        {data.priceFrom || data.priceTo ? "," : null}&nbsp;

                        {data.yearFrom}
                        {data.yearFrom && data.yearTo ? "-" : null}
                        {data.yearTo}
                    </p>
                ) : null
            }

            {
                data.stateName ? (
                    <p className="fw-600 h3">
                        Область: {data.stateName}
                    </p>
                ) : null
            }

            {
                data.stateName ? (
                    <p className="fw-600 h3">
                        Сортировка: {data.sortName}
                    </p>
                ) : null
            }

            {
                (data.cheaperQueryRes ? data.cheaperQueryRes.length !== 0 : false) ? (
                    <DropDown title={`Дешевле`}>
                        <ul className={s.CollectionCardList}>
                            {data.cheaperQueryRes.map(item=>(
                                <li key={item.id}>
                                    <CollectionCardPlug carInfo = {item} />
                                </li>
                            ))}
                        </ul>
                    </DropDown>
                ) : null
            }

            {
                data.fitQueryRes.length !== 0 ? (
                    <DropDown isOpened = {true} title={`Результаты поиска (${data.fitQueryRes.length})`}>
                        <ul className={s.CollectionCardList}>
                            {data.fitQueryRes.map(item=>(
                                <li key={item.id}>
                                    <CollectionCardPlug carInfo = {item} />
                                </li>
                            ))}
                        </ul>
                    </DropDown>
                ) : (
                    <h3 className="fw-800">Нет результатов</h3>
                )
            }

            {
                (data.moreExpensiveQueryRes ? data.moreExpensiveQueryRes.length !== 0 : false) ? (
                    <DropDown title={`Дороже`}>
                        <ul className={s.CollectionCardList}>
                            {data.moreExpensiveQueryRes.map(item=>(
                                <li key={item.id}>
                                    <CollectionCardPlug carInfo = {item} />
                                </li>
                            ))}
                        </ul>
                    </DropDown>
                ) : null
            }            
        </Container>
    )
}