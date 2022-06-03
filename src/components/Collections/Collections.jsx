import CollectionsCard from "../CollectionsCard/CollectionsCard";
import Container from "../Container/Container";
import s from "./Collections.module.css";

function Collection(props) {
    return(
        <Container addClass = "collection">
            <h2>Коллекции</h2>
            <ul className="colection__items">
                {
                    props.collectionsList.map(collectionItem=>(
                        <CollectionsCard 
                            key = {collectionItem.id}
                            data = {collectionItem}
                            removeItemFromCollection = {props.removeItemFromCollection}
                            searchByCollection = {props.searchByCollection}
                        />
                    ))
                }
            </ul>
        </Container> 
    )
}

export default Collection


