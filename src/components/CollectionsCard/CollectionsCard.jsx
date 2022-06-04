import s from "./CollectionsCard.module.css"

export default function CollectionCard(props) {
    let item = props.data

    const marka = item.markaName
    const model = item.modelName
    const priceFrom = item.priceFrom
    const priceTo = item.priceTo
    const yearFrom = item.yearFrom
    const yearTo = item.yearTo
    const state = item.stateName
    const sort = item.sortName

    return(
        <div className={s["collection-card"]}>
<h3>
                {marka} {model}
            </h3>

            {priceFrom || priceTo ? (
                <fieldset>
                    <legend>Цена</legend>
                    {priceFrom ? <p><strong>От </strong> {priceFrom} $</p> : null}
                    {priceTo ? <p><strong> До </strong> {priceTo} $</p> : null}
                </fieldset>
            ) : null}
            
            {yearFrom || yearTo ? (
                <fieldset>
                    <legend>Год</legend>
                    {/* {yearFrom && !yearTo ? "От " : null }
                    {yearFrom}
                    {yearFrom && yearTo ? " - " : null}
                    {!yearFrom && yearTo ? "До " : null }
                    {yearTo} */}

                    {yearFrom ? <p><strong>От </strong> {yearFrom} год </p>  : null}
                    {yearTo ? <p><strong> До </strong> {yearTo} год </p> : null}
                </fieldset>
            ) : null}
            
            { state ? (
                <fieldset>
                    <legend>Область:</legend>
                    {state}
                </fieldset>
            ) : null}

            { sort ? 
                (
                    <fieldset>
                        <legend>Сортировка:</legend>
                        {sort}
                    </fieldset>
                ) : null
            }      

            <button onClick={()=>props.searchByCollection(item.queryLine)} className={s["collection-card__search"]}>
                Поиск по коллекции
            </button>       

            <button className={s["collection-card__delete"]} onClick={()=>props.removeItemFromCollection(item.id)}>
                X
            </button>
        </div>            
    )
}