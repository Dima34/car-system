import { Route, Routes } from "react-router-dom";
import Car from "./routes/Car";
import Main from "./routes/Main";

function App(props) {
    return(
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/:id" element={<Car />} />
        </Routes>        
    )    
}

export default App;