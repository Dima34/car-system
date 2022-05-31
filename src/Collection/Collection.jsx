import Container from "../Container/Container";
import s from "./Collection.module.css";

function Collection(props) {
    return(
        <Container addClass = "collection">
            <h2>Коллекция</h2>
            <ul className="colection__items">
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
            </ul>
        </Container> 
    )
}

export default Collection


