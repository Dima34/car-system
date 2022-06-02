export default function CollectionCard(props) {
    let item = props.data

    const marka = item.markaName
    const model = item.modelName
    const priceFrom = item.priceFrom
    const priceTo = item.priceTo
    const yearFrom = item.yearFrom
    const yearTo = item.yearTo
    const sort = item.sortName
    const state = item.stateName

    return(
        <li className="collection__card">
            <h3>
                {marka} {model}
            </h3>

            {priceFrom && priceTo ? (
                <fieldset>
                    <legend>Цена $</legend>
                    {priceFrom}
                    {priceFrom || priceTo ? " - " : null}
                    {priceTo}
                </fieldset>
            ) : null}
            
            {yearFrom && yearTo ? (
                <fieldset>
                    <legend>Год</legend>
                    {yearFrom}
                    {yearFrom || yearTo ? " - " : null}
                    {yearTo}
                </fieldset>
            ) : null}
            
            { state ? (
                <p>
                    Область: {state}
                </p>
            ) : null}
                
            <p>
                Сортировка: {sort}
            </p>

            <button onClick={()=>props.removeItemFromCollection(item.id)}>
                X
            </button>
        </li>
    )
}