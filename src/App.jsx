import { useEffect, useState } from "react";
import CarCard from "./components/CarCard/CarCard";
import Collection from "./components/Collection/Collection";
import Filter from "./components/Filter/Filter";
import MainGrid from "./components/MainGrid/MainGrid";
import { getCarIdsByQuery, getCarById, getMarks, getStates, getModels, createQueryLine } from "./api.js";
import { getCollectionItem, getCollections, removeCollectionItemById, addCollectionItem } from "./collections";



function App(props) {
    const [marks, setMarks] = useState([])
    const [models, setModels] = useState([])
    const [states, setStates] = useState([])
    const [queryLine, setQueryLine] = useState("")
    const [carList, setСarList] = useState([])
    const [collectionsList, setCollectionItemsList] = useState([])
    const [isFetching, setIsFetching] = useState(false)
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
        markList: {
            value : "",
            name : ""
        },
        modelList: {
            value : "",
            name : ""
        },
        yearFrom: "",
        yearTo: "",
        priceFrom: "",
        priceTo: "",
        state: {
            value : "",
            name : ""
        },
        sortType: {
            value : "",
            name : ""
        }
    })

    useEffect(() => {
        getMarks().then(setMarks);
        getStates().then(setStates);
        setCollectionItemsList(getCollections());
    }, [])

    useEffect(() => {
        if (filterValueObj.markList.value !== "") {
            getModels(filterValueObj.markList.value).then(setModels);
        } else{
            setModels([])
        }
    }, [filterValueObj.markList])

    useEffect(() => {
        setQueryLine(createQueryLine(filterValueObj));
    }, [filterValueObj])

    function handleSelectionChange(event) {
        const target = event.target
        const name = target.name
        const value = target.value
        const tagName = target.tagName.toLowerCase();

        let valueObj;

        switch (tagName) {
            case "select":
                valueObj = {
                    [name]: {
                        name : target.options[target.selectedIndex].text,
                        value : value
                    }
                }
                break;
        
            default:
                valueObj = {
                    [name]: value
                }
                break;
        }

        setValueObj((list) => ({
            ...list,
            ...valueObj
        }))
    }
    

    async function makeSearch(queryToSearch) {
        setIsFetching(true)
        let carIds = await getCarIdsByQuery(queryToSearch);
        
        let carsById = [];
        for (let carId of carIds) {
            await getCarById(carId).then((car) => {
                carsById.push(car);
            });
        }

        setСarList(carsById);
        setIsFetching(false)
    }
    
    async function searchByCollection(queryToSearch) {
        makeSearch(queryToSearch)
    }
    
    
    function addToCollection() {
        setCollectionItemsList(
            addCollectionItem(getCollectionItem(filterValueObj, createQueryLine(filterValueObj)))
        )
    }

    function removeItemFromCollection(id) {
        let newCollection = removeCollectionItemById(id)
        setCollectionItemsList(newCollection)
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
                    makeSearch={()=>makeSearch(queryLine)}
                    addToCollection = {addToCollection}
                />

                {
                    collectionsList.length > 0 ? (
                        <Collection
                            collectionsList = {collectionsList}
                            removeItemFromCollection = {removeItemFromCollection}
                            searchByCollection = {searchByCollection}
                        />
                    ) : null
                }
                
            </aside>
            <main>
                {
                    isFetching ? <h1>Загрузка...</h1> : (
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