import CollectionsCard from "../CollectionsCard/CollectionsCard";
import Container from "../Container/Container";
import s from "./Collections.module.css";

function Collection(props) {
    return(
        <Container addClass = "collection">
            <h2>Коллекции</h2>
            <ul className={s.colection__items}>
                {
                    props.collectionsList.map(collectionItem=>(
                        <li key = {collectionItem.id}>
                            <CollectionsCard 
                                data = {collectionItem}
                                removeItemFromCollection = {props.removeItemFromCollection}
                                searchByCollection = {props.searchByCollection}
                            />
                        </li>                        
                    ))
                }
            </ul>
        </Container> 
    )
}

export default Collection


