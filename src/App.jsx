import axios from "axios";
import { useEffect, useState } from "react";
import CarCard from "./CarCard/CarCard";
import Collection from "./Collection/Collection";
import Container from "./Container/Container";
import Filter from "./Filter/Filter";
import MainGrid from "./MainGrid/MainGrid";

// const APIKey = "wBN9P8fzGr71j4AxFGDLtAZaFtvVtKuz4luazKRJ"
const APIKey = "K0su000AikBj8ElGqhcENdkbl3HF7RCg1MmdiBnq"

const APIKeyLine = "?api_key=" + APIKey;

const RiaURL = "https://developers.ria.com/auto"
const marksURL = RiaURL + "/categories/1/marks/";
const searchURL = RiaURL + "/search" + APIKeyLine;
const infoURL = RiaURL + "/info" + APIKeyLine;
const statesURL = RiaURL + "/states" + APIKeyLine;


function App(props) {
    const [marks, setMarks] = useState([])
    const [models, setModels] = useState([])
    const [states, setStates] = useState([])
    const [queryLine, setQueryLine] = useState("")
    const [carList, setСarList] = useState([])

    const sortTypes = [
        {
            name : "1",
            value : 1
        },
        {
            name : "По возрастанию цены",
            value : 2
        },
        {
            name : "По убыванию цены",
            value : 3
        },
        {
            name : "4",
            value : 4
        },
        {
            name : "По возрастанию пробега",
            value : 5
        },
        {
            name : "1",
            value : 6
        },
        {
            name : "По новизне",
            value : 7
        },
        {
            name : "8",
            value : 8
        },
        {
            name : "9",
            value : 9
        },
        {
            name : "10",
            value : 10
        },
        {
            name : "11",
            value : 11
        },
        {
            name : "12",
            value : 12
        },
        {
            name : "13",
            value : 13
        },
        {
            name : "14",
            value : 14
        },
    ]

    const [filterValueObj, setValueObj] = useState({
        markList : "",
        modelList : "",
        yearFrom : "",
        yearTo : "",
        priceFrom : "",
        priceTo : "",
        state : "",
        sortType : ""
    })

    async function getCarIdsByQuery() {
       return makeRequest(searchURL + queryLine).then(res=>res.data.result.search_result.ids)
    }

    async function makeSearch() {
        let carIds = await getCarIdsByQuery();
        
        let carsById = []
        for (let carId of carIds){
            await getCarById(carId).then(
                car=>{
                    console.log(car);
                    carsById.push(car)
                }
            )
        }
        
        setСarList(carsById)
    }

    function getCarById(id) {
        return makeRequest(infoURL + "&auto_id=" + id).then(res=>res.data)
    }

    function getMarks() {
        makeRequest(marksURL + APIKeyLine)
        .then(
          (result) => {
            setMarks(result.data)
          }
        )    
    }

    function getStates() {
        makeRequest(statesURL)
        .then(
          (result) => {
            setStates(result.data)
          }
        )    
    }
    
    function getModels(markId) {
        if(markId !== ""){
            makeRequest(marksURL + markId + "/models" + APIKeyLine)
            .then(
            (result) => {
                setModels(result.data)
            })    
        }        
    }

    function createQueryLine() {
        let line = "";
    
        for (const el in filterValueObj) {
            let value = filterValueObj[el];

            switch (el) {
                case "markList":
                    if(value !== "") line+=`&marka_id[0]=${value}`;
                    break;
    
                case "modelList":
                    if(value !== "") line+=`&model_id[0]=${value}`;
                    break;
    
                case "yearFrom":
                    if(value !== "") line+=`&s_yers[0]=${value}`; 
                    break;
    
                case "yearTo":
                    if(value !== "") line+=`&po_yers[0]=${value}`; 
                    break;
    
                case "priceFrom":
                    if(value !== "")  line+=`&price_ot[0]=${value}` 
                    break;
    
                case "priceTo":
                    if(value !== "") line+=`&price_do[0]=${value}`  
                    break;
                case "sortType":
                    if(value !== "") line+=`&order_by=${value}`;  
                    break;
                case "state":
                    if(value !== "") line+=`&state[0]=${value}&city[0]=0`; 
                    break;
            }
        }
        
        setQueryLine(line)
    }

    async function makeRequest(queryLine) {
        return axios(queryLine)
    }

    function handleSelectionChange(event){
        const target = event.target
        const name = target.name
        const value = target.value

        setValueObj((list)=>({
            ...list, 
            [name] : value
        }))   
    }

    useEffect(()=>{
        getMarks();
        getStates();
    },[])

    useEffect(()=>{
        getModels(filterValueObj.markList)
    }, [filterValueObj.markList])

    useEffect(()=>{
        createQueryLine();
    }, [filterValueObj])

    return(
        <div className="wrapper">
            <aside>
                <Filter 
                    valueList = {filterValueObj}
                    marks = {marks} 
                    models = {models} 
                    states = {states}
                    sortTypeList = {sortTypes}
                    handleSelectionChange = {handleSelectionChange}
                    queryLine = {queryLine}
                    makeSearch = {makeSearch}
                />            
                

                {/* No functionality yet */}
                <Collection 

                /> 
            </aside>
            <main>
                <MainGrid>

                    {carList.map((car)=>(
                        <CarCard car = {car}/>
                    ))}
                </MainGrid>
            </main>
        </div>
    )
}

export default App;