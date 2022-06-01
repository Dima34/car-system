import CollectionCard from "../CollectionCard/CollectionCard";
import Container from "../Container/Container";
import s from "./Collection.module.css";

function Collection(props) {
    return(
        <Container addClass = "collection">
            <h2>Коллекция</h2>
            <ul className="colection__items">
                <CollectionCard />
            </ul>
        </Container> 
    )
}

export default Collection


