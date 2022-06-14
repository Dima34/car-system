import clockGray from "../../icons/clock-gray.svg"
import clockGreen from "../../icons/clock-green.svg"

function setSuffix(num, root, suffixWhen1, suffixLess5, suffixMore4 = "") {
    let lastNumDigit = Number(num.toString().split("").slice(-1).join());

    let suffix = ""

    if(num > 10 && num < 15){
        suffix = suffixMore4
    }
    else if(lastNumDigit === 1){
        suffix = suffixWhen1
    } 
    else if (lastNumDigit > 1 && lastNumDigit < 5) {
        suffix = suffixLess5
    }
    else {suffix = suffixMore4}

    console.log(`${lastNumDigit} ${root}${suffix}`);

    return `${root}${suffix}`
}

function numExtension(num) {
    if(num.toString().length < 2){
        return "0" + num
    }

    return num
}

function Round(num) {
    return Math.round(num)
}

export default function PostTime(props) {
    
    const date = new Date(props.date)
    const currentDate = Date.now();
    const msBetweenTimes = currentDate - date.getTime()
    let sBetween = msBetweenTimes / 1000;
    let mBetween = sBetween / 60;
    let hBetween = Round(mBetween / 60);

    sBetween = Round(sBetween)
    mBetween = Round(mBetween)

    let timeText = ""


    if(sBetween < 60){
        timeText = `${sBetween} ${setSuffix(sBetween, "секунд", "у", "ы")} назад`
    } else if (mBetween < 60){
        timeText = `${mBetween} ${setSuffix(mBetween, "минут", "у", "ы")} назад`
    } else if (hBetween < 24){
        timeText = `${hBetween} ${setSuffix(hBetween, "час", "", "а", "ов")} назад`
    } else {
        timeText = `${numExtension(date.getDate())}.${numExtension(date.getMonth())}.${date.getFullYear()}`
    }


    return(
        <div className={props.addClass}>
            {hBetween < 24 ? 
                (
                    <img src={clockGreen} alt="clock icon" />
                ) : 
                (
                    <img src={clockGray} alt="clock icon" />
                )
            }

            <p className={hBetween < 24 ? "green" : "gray"}>
                {timeText}
            </p>
        </div>
    )
}