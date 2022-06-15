import axios from "axios";

// const APIKey = "wBN9P8fzGr71j4AxFGDLtAZaFtvVtKuz4luazKRJ"
const APIKey = "K0su000AikBj8ElGqhcENdkbl3HF7RCg1MmdiBnq";

const APIKeyLine = "?api_key=" + APIKey;

const RiaURL = "https://developers.ria.com/auto";
const marksURL = RiaURL + "/categories/1/marks/";
const searchURL = RiaURL + "/search" + APIKeyLine;
const infoURL = RiaURL + "/info" + APIKeyLine;
const statesURL = RiaURL + "/states" + APIKeyLine;

async function getCarIdsByQuery(queryLine) {
  return await makeSearchQuery(queryLine).then(
    (res) => res.data.result.search_result.ids
  );
}

async function makeSearchQuery(queryLine) {
  return makeRequest(searchURL + queryLine)
}

function getCarById(id) {
  return makeRequest(infoURL + "&auto_id=" + id).then((res) => res.data);
}

function getMarks() {
  return makeRequest(marksURL + APIKeyLine).then((res) => res.data);
}

function getStates() {
  return makeRequest(statesURL).then((res) => res.data);
}

function getModels(markId) {
  return makeRequest(marksURL + markId + "/models" + APIKeyLine).then(
    (res) => res.data
  );
}

async function makeRequest(queryLine) {
  return axios(queryLine);
}


function createQueryLine(filterValueObj) {
  let line = "";

  for (const el in filterValueObj) {
    let value = filterValueObj[el];

    switch (el) {
      case "markList":
        value = value.value
        if (value !== "") line += `&marka_id[0]=${value}`;
        break;

      case "modelList":
        value = value.value
        if (value !== "") line += `&model_id[0]=${value}`;
        break;

      case "yearFrom":
        if (value !== "") line += `&s_yers[0]=${value}`;
        break;

      case "yearTo":
        if (value !== "") line += `&po_yers[0]=${value}`;
        break;

      case "priceFrom":
        if (value !== "") line += `&price_ot[0]=${value}`;
        break;

      case "priceTo":
        if (value !== "") line += `&price_do[0]=${value}`;
        break;
      case "sortType":
        value = value.value
        if (value !== "") line += `&order_by=${value}`;
        break;
      case "state":
        value = value.value
        if (value !== "") line += `&state[0]=${value}&city[0]=0`;
        break;
    }
  }

  return line;
}

export {
  getCarIdsByQuery,
  getCarById,
  getMarks,
  getStates,
  getModels,
  createQueryLine,
  makeSearchQuery
};
