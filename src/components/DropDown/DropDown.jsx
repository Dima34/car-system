import s from "./DropDown.module.css"
import { useState } from "react";
import classNames from "classnames";


export default function DropDown(props) {
    const [isOpened, setIsOpened] = useState(props.isOpened !== undefined ? props.isOpened : false);

    function toggleActive(){
        setIsOpened(!isOpened)
    }

    return (
        <div className={classNames(s.dropdown, {[s.opened] : isOpened})}>
            <button className={classNames(s.dropdownButton, "link")} onClick={()=>toggleActive()}>
                <h2 className="h3">{props.title}</h2>
            </button>
            <div className={s.dropdownContainer}>
                {props.children}
            </div>
        </div>        
    )
}