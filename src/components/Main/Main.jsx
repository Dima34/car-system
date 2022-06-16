import {Route, Routes } from "react-router-dom";
import Car from "../../routes/Car";
import MainPage from "../../routes/MainPage";
import Header from "../Header/Header";

export default function Main(props) {
    return (
        <div className="main">
            <Header/>

            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/:id" element={<Car />} />
            </Routes>   
        </div>
    )
}