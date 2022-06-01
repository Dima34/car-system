function getCollections() {
  let info = localStorage.getItem("collections");

  if (info == null) {
    info = JSON.stringify([]);
  }

  return JSON.parse(info);
}

function setCollection(newItem) {
  let currentCollectionsList = getCollections();
  let newCollectionsList = [...currentCollectionsList, newItem];
  localStorage.setItem("collections", JSON.stringify(newCollectionsList));
  return newCollectionsList;
}

function setValueIfNotEmpty(objKey, value, object) {
  if (value !== "") object[objKey] = value;
}

// Creates an object for collection card
function getCollectionItem(filterValueObject, queryLine) {
  let object = {};

  for (const el in filterValueObject) {
    let value = el;

    object["id"] = new Date().getTime();

    switch (el) {
      case "markList":
        setValueIfNotEmpty("marka", value, object);
        break;

      case "modelList":
        setValueIfNotEmpty("model", value, object);
        break;

      case "yearFrom":
        setValueIfNotEmpty("year_from", value, object);
        break;

      case "yearTo":
        setValueIfNotEmpty("year_to", value, object);
        break;

      case "priceFrom":
        setValueIfNotEmpty("price_ot", value, object);
        break;

      case "priceTo":
        setValueIfNotEmpty("price_do", value, object);
        break;

      case "sortType":
        setValueIfNotEmpty("sort_type", value, object);
        break;

      case "state":
        setValueIfNotEmpty("state", value, object);
        break;
    }
  }

  object["query_line"] = queryLine;

  return object;
}

export { getCollections, setCollection, getCollectionItem };
