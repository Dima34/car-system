export default function priceFilter(priceLine) {
    let newLine = "";
    priceLine = priceLine.toString().split("").reverse();

    priceLine.forEach((char,index) => {
        newLine += char;

        if ((index + 1) % 3 === 0) {
            newLine += "\u00A0"
        }
    });

    newLine = newLine.split("").reverse().join("")

    return newLine
}