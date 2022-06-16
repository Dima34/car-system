import { Link } from "react-router-dom"
import logo from "../../icons/logo.svg"
import s from "./Header.module.css"

export default function Header(props) {
    return(
        <header className={s.header}>
            <div className="wrapper">
                <Link to="/">
                    <img src={logo} alt="To main page"/>
                </Link>
            </div>
        </header>
    )
}