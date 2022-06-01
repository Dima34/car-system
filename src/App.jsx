import { useEffect, useState } from "react";
import CarCard from "./components/CarCard/CarCard";
import Collection from "./components/Collection/Collection";
import Filter from "./components/Filter/Filter";
import MainGrid from "./components/MainGrid/MainGrid";
import { getCarIdsByQuery, getCarById, getMarks, getStates, getModels } from "./API.js";



function App(props) {
    const [marks, setMarks] = useState([])
    const [models, setModels] = useState([])
    const [states, setStates] = useState([])
    const [queryLine, setQueryLine] = useState("")
    const [carList, setСarList] = useState([])
    const [queryCollection, setQueryCollection] = useState([])
    const [mainStateComponent, setMainStateComponent] = useState(null)
    const sortTypes = [
        {
            name: "1",
            value: 1
        },
        {
            name: "По возрастанию цены",
            value: 2
        },
        {
            name: "По убыванию цены",
            value: 3
        },
        {
            name: "4",
            value: 4
        },
        {
            name: "По возрастанию пробега",
            value: 5
        },
        {
            name: "1",
            value: 6
        },
        {
            name: "По новизне",
            value: 7
        },
        {
            name: "8",
            value: 8
        },
        {
            name: "9",
            value: 9
        },
        {
            name: "10",
            value: 10
        },
        {
            name: "11",
            value: 11
        },
        {
            name: "12",
            value: 12
        },
        {
            name: "13",
            value: 13
        },
        {
            name: "14",
            value: 14
        },
    ]
    const [filterValueObj, setValueObj] = useState({
        markList: "",
        modelList: "",
        yearFrom: "",
        yearTo: "",
        priceFrom: "",
        priceTo: "",
        state: "",
        sortType: ""
    })

    useEffect(() => {
        getMarks().then(setMarks);
        getStates().then(setStates);
    }, [])

    useEffect(() => {
        if (filterValueObj.markList !== "") {
            getModels(filterValueObj.markList).then(setModels);
        }
    }, [filterValueObj.markList])

    useEffect(() => {
        createQueryLine();
    }, [filterValueObj])

    function handleSelectionChange(event) {
        const target = event.target
        const name = target.name
        const value = target.value

        setValueObj((list) => ({
            ...list,
            [name]: value
        }))
    }
    
    function createQueryLine() {
        let line = "";

        for (const el in filterValueObj) {
            let value = filterValueObj[el];

            switch (el) {
                case "markList":
                    if (value !== "") line += `&marka_id[0]=${value}`;
                    break;

                case "modelList":
                    if (value !== "") line += `&model_id[0]=${value}`;
                    break;

                case "yearFrom":
                    if (value !== "") line += `&s_yers[0]=${value}`;
                    break;

                case "yearTo":
                    if (value !== "") line += `&po_yers[0]=${value}`;
                    break;

                case "priceFrom":
                    if (value !== "") line += `&price_ot[0]=${value}`
                    break;

                case "priceTo":
                    if (value !== "") line += `&price_do[0]=${value}`
                    break;
                case "sortType":
                    if (value !== "") line += `&order_by=${value}`;
                    break;
                case "state":
                    if (value !== "") line += `&state[0]=${value}&city[0]=0`;
                    break;
            }
        }

        setQueryLine(line)
    }

    function addToCollection(params) {
        
    }

    async function makeSearch() {
        let carIds = await getCarIdsByQuery(queryLine);
        
        setMainStateComponent(<h1>Loading...</h1>)

        let carsById = [];
        for (let carId of carIds) {
            await getCarById(carId).then((car) => {
                console.log(car);
                carsById.push(car);
            });
        }

        setСarList(carsById);
        setMainStateComponent(null)
    }    

    
    return (
        <div className="wrapper">
            <aside>
                <Filter
                    valueList={filterValueObj}
                    marks={marks}
                    models={models}
                    states={states}
                    sortTypeList={sortTypes}
                    handleSelectionChange={handleSelectionChange}
                    queryLine={queryLine}
                    makeSearch={makeSearch}
                />


                {/* No functionality yet */}
                <Collection

                />
            </aside>
            <main>
                {
                    mainStateComponent ? mainStateComponent : (
                        <MainGrid>
                            {carList.map((car) => (
                                <CarCard car={car} />
                            ))}
                        </MainGrid>
                    )
                }
            </main>
        </div>
    )
}

export default App;