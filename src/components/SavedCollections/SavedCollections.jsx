import CollectionsCard from "../SavedCollectionsCard/SavedCollectionsCard";
import Container from "../Container/Container";
import s from "./SavedCollections.module.css";

function SavedCollections(props) {
    return(
        <Container addClass = {s.collections}>
            <h2 className="h1 gray">Коллекции</h2>
            <ul className={s.colectionItems}>
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

export default SavedCollections


