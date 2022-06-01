import CollectionCard from "../CollectionCard/CollectionCard";
import Container from "../Container/Container";
import s from "./Collection.module.css";

function Collection(props) {
    return(
        <Container addClass = "collection">
            <h2>Коллекция</h2>
            <ul className="colection__items">
                {
                    props.collectionsList.map(collectionItem=>(
                        <CollectionCard 
                            key = {collectionItem.id}
                            data = {collectionItem}
                        />
                    ))
                }
            </ul>
        </Container> 
    )
}

export default Collection


