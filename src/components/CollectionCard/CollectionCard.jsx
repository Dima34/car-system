export default function CollectionCard(props) {
    let item = props.data

    console.log(item);

    return(
        <li className="collection__card">
            <h3>
                Renault Logan, 2005-2010
            </h3>
            <p>
                1000-2000$, Киев
            </p>
            <p>
                Сортировка: По возростанию цены
            </p>

            <button>
                X
            </button>
        </li>
    )
}