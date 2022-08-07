import { useEffect, useState } from "react";
import CarCard from "../components/CarCard/CarCard";
import SavedCollections from "../components/SavedCollections/SavedCollections";
import Filter from "../components/Filter/Filter";
import MainGrid from "../components/MainGrid/MainGrid";
import {
  getMarks,
  getStates,
  getModels,
  createQueryLine,
  makeSearchQuery,
  getCarsByQuery,
} from "../API.js";
import {
  getCollectionItem,
  getCollections,
  removeCollectionItemById,
  addCollectionItem,
  getCollectionCardList,
} from "../collections";
import Container from "../components/Container/Container";
import CollectionGrid from "../components/CollectionGrid/CollectionGrid";
import { addParamToQueryLine, getParamFromQueryLine } from "../queryLineHandlers";
import Pagination from "../components/Pagination/Pagination";
import CollectionCard from "../components/CollectionCard/CollectionCard";


export default function MainPage(props) {
  const [marks, setMarks] = useState([]);
  const [models, setModels] = useState([]);
  const [states, setStates] = useState([]);
  const [resAmount, setResAmount] = useState(6);
  const [paginationPages, setPaginationPages] = useState([]);
  const [queryLine, setQueryLine] = useState("");
  const [carList, setСarList] = useState(null);
  const [collectionCardList, setCollectionCardList] = useState(null);
  const [collectionsList, setCollectionItemsList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const sortTypes = [
    // {
    //   name: "1",
    //   value: 1,
    // },
    {
      name: "По возрастанию цены",
      value: 2,
    },
    {
      name: "По убыванию цены",
      value: 3,
    },
    // {
    //   name: "4",
    //   value: 4,
    // },
    {
      name: "По возрастанию пробега",
      value: 5,
    },
    // {
    //   name: "1",
    //   value: 6,
    // },
    {
      name: "По новизне",
      value: 7,
    },
    // {
    //   name: "8",
    //   value: 8,
    // },
    // {
    //   name: "9",
    //   value: 9,
    // },
    // {
    //   name: "10",
    //   value: 10,
    // },
    // {
    //   name: "11",
    //   value: 11,
    // },
    // {
    //   name: "12",
    //   value: 12,
    // },
    // {
    //   name: "13",
    //   value: 13,
    // },
    // {
    //   name: "14",
    //   value: 14,
    // },
  ];

  const [filterValueObj, setValueObj] = useState({
    markList: {
      value: "",
      name: "",
    },
    modelList: {
      value: "",
      name: "",
    },
    yearFrom: "",
    yearTo: "",
    priceFrom: "",
    priceTo: "",
    state: {
      value: "",
      name: "",
    },
    sortType: {
      value: "",
      name: "",
    },
  });

  useEffect(() => {
    getMarks().then(setMarks);
    getStates().then(setStates);
    setCollectionItemsList(getCollections());
    makeSearch(queryLine);
  }, []);

  useEffect(() => {
    if (filterValueObj.markList.value !== "") {
      getModels(filterValueObj.markList.value).then(setModels);
    } else {
      setModels([]);
    }

    setValueObj((current) => ({
      ...current,
      modelList: {
        value: "",
        name: "",
      },
    }));
  }, [filterValueObj.markList]);

  useEffect(() => {
    setQueryLine(createQueryLine(filterValueObj));
  }, [filterValueObj]);

  function handleSelectionChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const tagName = target.tagName.toLowerCase();

    let valueObj;

    switch (tagName) {
      case "select":
        valueObj = {
          [name]: {
            name: target.options[target.selectedIndex].text,
            value: value,
          },
        };
        break;

      default:
        valueObj = {
          [name]: value,
        };
        break;
    }

    setValueObj((list) => ({
      ...list,
      ...valueObj,
    }));
  }

  async function getPagesByQuery(queryToSearch) {
    let resultObj = (await makeSearchQuery(queryToSearch)).data.result
      .search_result;

    return Math.ceil(resultObj.count / resAmount);
  }

  async function getPaginationListByQuery(queryToSearch) {
    let pagesAmount = await getPagesByQuery(queryToSearch);

    let paginationArr = [];

    for (let i = 0; i < pagesAmount; i++) {
      let paginationItem = {
        pagenum: i + 1,
        pageQuery: addParamToQueryLine(queryToSearch, "page", i),
      };

      if (paginationItem === 0) paginationItem.active = true;

      paginationArr.push(paginationItem);
    }

    return paginationArr;
  }

  async function handlePagination(queryToSearch) {
    let newPaginationList = await getPaginationListByQuery(queryToSearch);

    let activePage = getParamFromQueryLine(queryToSearch, "page");

    if(activePage === null){
      newPaginationList[0].active = true;
    } else{
      newPaginationList[activePage].active = true;
    }
    
    setPaginationPages(newPaginationList);
  }

  async function makeSearch(queryToSearch) {
    setCollectionCardList(null);
    setIsFetching(true);

    let queryIncludesItemAmount = addParamToQueryLine(
      queryToSearch,
      "countpage",
      resAmount
    );

    let cars = await getCarsByQuery(queryIncludesItemAmount);
    setСarList(cars);

    await handlePagination(queryIncludesItemAmount);

    setIsFetching(false);
  }

  // Search by all collections in one time
  async function searchByCollections() {
    setIsFetching(true);

    // Clear car list because we dont want to display car cards and collection cards in one time
    //  when we making a collections search
    setСarList(null);
    setPaginationPages([])

    setCollectionCardList(await getCollectionCardList(collectionsList));

    setIsFetching(false);
  }

  // Search by single collection
  async function searchByCollection(queryToSearch) {
    makeSearch(queryToSearch);
  }

  function addToCollection() {
    setCollectionItemsList(
      addCollectionItem(
        getCollectionItem(filterValueObj, createQueryLine(filterValueObj))
      )
    );
  }

  function removeItemFromCollection(id) {
    setCollectionItemsList(removeCollectionItemById(id));
  }

  return (
    <div className="wrapper main-container">
      <aside>
        <Filter
          valueList={filterValueObj}
          marks={marks}
          models={models}
          states={states}
          sortTypeList={sortTypes}
          handleSelectionChange={handleSelectionChange}
          queryLine={queryLine}
          makeSearch={() => makeSearch(queryLine)}
          addToCollection={addToCollection}
          collectionsList={collectionsList}
          searchByCollections={searchByCollections}
        />

        {collectionsList.length > 0 ? (
          <SavedCollections
            collectionsList={collectionsList}
            removeItemFromCollection={removeItemFromCollection}
            searchByCollection={searchByCollection}
          />
        ) : null}
      </aside>
      <main>
        {isFetching ? (
          <h1>Загрузка...</h1>
        ) : (
          <Container>
            {carList != null ? (
              carList.length > 0 ? (
                <div className="mainContainer">
                  <MainGrid>
                    {carList.map((car) => (
                      <CarCard car={car} key={car.secureKey} />
                    ))}
                  </MainGrid>
                </div>
              ) : (
                <h1>Нету результатов. Попробуйте изменить поисковой запрос</h1>
              )
            ) : null}

            {collectionCardList != null ? (
              <CollectionGrid>
                {collectionCardList.map((cardInfo) => (
                  <CollectionCard
                    makeSearch={makeSearch}
                    key={cardInfo.secureKey}
                    data={cardInfo}
                  />
                ))}
              </CollectionGrid>
            ) : null}

            {paginationPages.length > 0 ? (
              <Pagination items = {paginationPages} makeSearch = {makeSearch}/>
            ) : null}
          </Container>
        )}
      </main>
    </div>
  );
}
