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

export {
  getCollections,
  addCollectionItem,
  getCollectionItem,
  removeCollectionItemById,
};
