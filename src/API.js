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
  return makeRequest(searchURL + queryLine).then(
    (res) => res.data.result.search_result.ids
  );
}

function getCarById(id) {
  return makeRequest(infoURL + "&auto_id=" + id).then((res) => res.data);
}

function getMarks() {
  return makeRequest(marksURL + APIKeyLine).then((res) => res.data);
}

function getStates() {
  return makeRequest(statesURL).then(res => res.data );
}

function getModels(markId) {
  return makeRequest(marksURL + markId + "/models" + APIKeyLine).then(res => res.data);
}

async function makeRequest(queryLine) {
  return axios(queryLine);
}

export {getCarIdsByQuery, getCarById, getMarks, getStates, getModels};
