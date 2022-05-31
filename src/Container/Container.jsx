import s from "./Container.module.css";

function Container(props) {
    return(
        <div className={s.container + " " + props.addClass}>
            {props.children}
        </div>
    )
}

export default Container