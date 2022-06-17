function clearQueryLineFromParam(queryLine, paramName) {
    let lineParams = new URLSearchParams(queryLine);

    lineParams.delete(paramName);

    return "&" + decodeURIComponent(lineParams.toString());
}

function addParamToQueryLine(queryLine, paramName, paramValue) {
    let lineParams = new URLSearchParams(queryLine);

    lineParams.set(paramName, paramValue);

    let newParamLine = "&" + decodeURIComponent(lineParams.toString())

    return newParamLine;
}

function getParamFromQueryLine(queryLine, paramName) {
    let lineParams = new URLSearchParams(queryLine);


    return lineParams.get(paramName)
}

export {
    clearQueryLineFromParam,
    addParamToQueryLine,
    getParamFromQueryLine
};