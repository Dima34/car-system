import s from "./MainGrid.module.css"

export default function MainGrid(props) {
    return (
        <div className={s.mainGrid}>
            {props.children}
        </div>
    )
}