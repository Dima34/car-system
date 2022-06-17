import { getCarsByQuery, makeSearchQuery } from "./API";
import { addParamToQueryLine, clearQueryLineFromParam } from "./queryLineHandlers";

function getCollections() {
  let info = localStorage.getItem("collections");

  if (info == null) {
    info = JSON.stringify([]);
  }

  return JSON.parse(info);
}

function addCollectionItem(item) {
  let currentCollectionsList = getCollections();
  let newCollectionsList = [...currentCollectionsList, item];
  setCollection(newCollectionsList);
  return newCollectionsList;
}

function setCollection(newCollection) {
  localStorage.setItem("collections", JSON.stringify(newCollection));
  return newCollection;
}

function setValueIfNotEmpty(objKey, value, object, valueToSet) {
  if (value !== "") object[objKey] = valueToSet;
}

function removeCollectionItemById(id) {
  let filteredCollection = getCollections().filter((item) => item.id !== id);
  setCollection(filteredCollection);
  return filteredCollection;
}

// Creates an object for collection card
function getCollectionItem(filterValueObject, queryLine) {
  let object = {};

  for (const key in filterValueObject) {
    let value = filterValueObject[key];

    object["id"] = new Date().getTime();

    switch (key) {
      case "markList":
        setValueIfNotEmpty("marka", value.value, object, value.value);
        setValueIfNotEmpty("markaName", value.value, object, value.name);
        break;

      case "sortType":
        setValueIfNotEmpty("sort", value.value, object, value.value);
        setValueIfNotEmpty("sortName", value.value, object, value.name);
        break;

      case "state":
        setValueIfNotEmpty("state", value.value, object, value.value);
        setValueIfNotEmpty("stateName", value.value, object, value.name);
        break;

      case "modelList":
      case "yearFrom":
      case "yearTo":
      case "priceFrom":
      case "priceTo":
        setValueIfNotEmpty(key, value, object, value);
        break;
    }
  }

  object["queryLine"] = queryLine;

  return object;
}

async function getAllQueryCarResults(query) {
  return (await makeSearchQuery(query)).data.result.search_result.count
}

async function getCollectionCardList(collectionsList) {
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

  return collectionsCars
}

export {
  getCollections,
  addCollectionItem,
  getCollectionItem,
  removeCollectionItemById,
  getCollectionCardList
};
