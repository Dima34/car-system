import s from "./CollectionGrid.module.css"

export default function CollectionGrid(props) {
    return (
        <div className={s.collectionGrid}>
            {props.children}
        </div>
    )
}