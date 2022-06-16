import { useEffect, useState } from "react";
import CarCard from "../components/CarCard/CarCard";
import Collection from "../components/Collections/Collections";
import Filter from "../components/Filter/Filter";
import MainGrid from "../components/MainGrid/MainGrid";
import {
  getCarIdsByQuery,
  getCarById,
  getMarks,
  getStates,
  getModels,
  createQueryLine,
  makeSearchQuery,
} from "../API.js";
import {
  getCollectionItem,
  getCollections,
  removeCollectionItemById,
  addCollectionItem,
} from "../collections";
import CollectionCard from "../components/CollectionCard/CollectionCard";
import Container from "../components/Container/Container";
import CollectionGrid from "../components/CollectionGrid/CollectionGrid";

export default function MainPage(props) {
  const [marks, setMarks] = useState([]);
  const [models, setModels] = useState([]);
  const [states, setStates] = useState([]);
  const [queryLine, setQueryLine] = useState("");
  const [carList, setСarList] = useState(null);
  const [collectionCardList, setCollectionCardList] = useState(null);
  const [collectionsList, setCollectionItemsList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const sortTypes = [
    {
      name: "1",
      value: 1,
    },
    {
      name: "По возрастанию цены",
      value: 2,
    },
    {
      name: "По убыванию цены",
      value: 3,
    },
    {
      name: "4",
      value: 4,
    },
    {
      name: "По возрастанию пробега",
      value: 5,
    },
    {
      name: "1",
      value: 6,
    },
    {
      name: "По новизне",
      value: 7,
    },
    {
      name: "8",
      value: 8,
    },
    {
      name: "9",
      value: 9,
    },
    {
      name: "10",
      value: 10,
    },
    {
      name: "11",
      value: 11,
    },
    {
      name: "12",
      value: 12,
    },
    {
      name: "13",
      value: 13,
    },
    {
      name: "14",
      value: 14,
    },
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

  async function getCarsByQuery(queryToSearch, maxLength = null) {
    let carIds = await getCarIdsByQuery(queryToSearch);

    if (maxLength) carIds = carIds.slice(0, maxLength);

    let carsById = [];
    for (let carId of carIds) {
      await getCarById(carId).then((car) => {
        carsById.push(car);
      });
    }

    return carsById;
  }

  async function makeSearch(queryToSearch) {
    console.log(`Query to search - `, queryToSearch);
    setCollectionCardList(null);
    setIsFetching(true);

    let cars = await getCarsByQuery(queryToSearch);
    setСarList(cars);

    setIsFetching(false);
  }

  function clearQueryLineFromParam(queryLine, paramName) {
    let lineParams = new URLSearchParams(queryLine);

    // lineParams.delete("price_ot[0]")
    // lineParams.delete("price_do[0]")
    lineParams.delete(paramName);

    return "&" + decodeURIComponent(lineParams.toString());
  }

  async function getAllQueryCarResults(query) {
    return (await makeSearchQuery(query)).data.result.search_result.count
  }

  function addParamToQueryLine(queryLine, paramName, paramValue) {
    let lineParams = new URLSearchParams(queryLine);

    lineParams.set(paramName, paramValue);

    let newParamLine = "&" + decodeURIComponent(lineParams.toString())

    // console.log(`\nold line - `,queryLine);
    // console.log(`new line - `,newParamLine);

    return newParamLine;
  }

  // Search by all collections in one time
  async function searchByCollections(params) {
    setIsFetching(true);

    // Clearing car list because we dont want to display car cards and collection cards in one time
    //  when we making a collections search
    setСarList(null);

    let collectionsCars = [];

    function addToObject(obj, name, value) {
      obj[name] = value;
    }

    for (let collectionItem of collectionsList) {
      let collectionCardInfo = {};

      for (const item in collectionItem) {
        let value = collectionItem[item];

        switch (item) {
          case "markaName":
          case "modelName":
          case "yearFrom":
          case "yearTo":
          case "priceFrom":
          case "priceTo":
          case "sortName":
          case "stateName":
            addToObject(collectionCardInfo, item, value);
            break;
          default:
            break;
        }
      }

      // for cheaper and more expensive variants must be an asceding

      // If price from set for current collection - search 3 cheaper variants
      if (collectionCardInfo["priceFrom"]) {
        let priceFromValue = collectionItem["priceFrom"];

        // clear line from price values
        let newQueryLine = clearQueryLineFromParam(
          collectionItem.queryLine,
          "price_ot[0]"
        );
        newQueryLine = clearQueryLineFromParam(
          newQueryLine,
          "price_do[0]"
        );

        // add a price to attribute
        newQueryLine = addParamToQueryLine(
          newQueryLine,
          "price_do[0]",
          priceFromValue
        );

        // remove sotring type if its exist
        newQueryLine = clearQueryLineFromParam(
          newQueryLine,
          "order_by"
        );

        // add  sotring type
        newQueryLine = addParamToQueryLine(
          newQueryLine,
          "order_by",
          "3"
        );

        collectionCardInfo.cheaperQuantity = await getAllQueryCarResults(newQueryLine)
        collectionCardInfo.cheaperQueryLine = newQueryLine

        await getCarsByQuery(newQueryLine, 6).then((car) => {
          collectionCardInfo.cheaperQueryRes = car;
        });
      }

      // Searching results which fit to query
      await getCarsByQuery(collectionItem.queryLine, 6).then((car) => {
        collectionCardInfo.fitQueryRes = car;
      });

      collectionCardInfo.fitQuantity = await getAllQueryCarResults(collectionItem.queryLine)
      collectionCardInfo.fitQueryLine = collectionItem.queryLine

      // If price to set for current collection - search 3 more expensive variants
      if (collectionCardInfo["priceTo"]) {
        let priceToValue = collectionItem["priceTo"];

        // clear line from price values
        let newQueryLine = clearQueryLineFromParam(
          collectionItem.queryLine,
          "price_ot[0]"
        );
        newQueryLine = clearQueryLineFromParam(
          newQueryLine,
          "price_do[0]"
        );

        // add a price to attribute
        newQueryLine = addParamToQueryLine(
          newQueryLine,
          "price_ot[0]",
          priceToValue
        );

        // remove sotring type if its exist
        newQueryLine = clearQueryLineFromParam(
          newQueryLine,
          "order_by"
        );

        // add sotring type
        newQueryLine = addParamToQueryLine(
          newQueryLine,
          "order_by",
          "2"
        );

        collectionCardInfo.moreExpensiveQuantity = await getAllQueryCarResults(newQueryLine)
        collectionCardInfo.moreExpensiveQueryLine = newQueryLine

        await getCarsByQuery(newQueryLine,6).then((car) => {
          collectionCardInfo.moreExpensiveQueryRes = car;
        });
      }

      collectionsCars.push(collectionCardInfo);
    }

    setCollectionCardList(collectionsCars);

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
    let newCollection = removeCollectionItemById(id);
    setCollectionItemsList(newCollection);
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
          <Collection
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
            {carList != null ? 
              carList.length > 0 ? (
              <MainGrid>
                {carList.map((car) => (
                  <CarCard car={car} key={car.secureKey} />
                ))}
              </MainGrid>
            ) : <h1>Нету результатов. Попробуйте изменить поисковой запрос</h1> : null}

            {collectionCardList != null ? (
              <CollectionGrid>
                {collectionCardList.map((cardInfo) => (
                  <CollectionCard makeSearch = {makeSearch} key={cardInfo.secureKey} data={cardInfo} />
                ))}
              </CollectionGrid>
            ) : null}
          </Container>
        )}
      </main>
    </div>
  );
}
