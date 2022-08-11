import Container from "../Container/Container";
import s from "./CarInfo.module.scss";
import classNames from "classnames";
import priceFilter from "../../utils";


export default function CarInfo(props) {
  let car = props.car;
  return (
    <Container addClass={s.info}>
      <div></div>
      <h1>
        {car.title} {car.autoData.year}
      </h1>
      <div></div>
      <div className={s.pricenrace}>
        <p className="green h1">{priceFilter(car.USD)}$</p>
        <p className="fw-600">{priceFilter(car.UAH)} грн</p>
      </div>
      <ul className={s.infoList}>
        <li className={s.infoPlague}>
          <p className="fw-700">Пробег</p>
          <p>{car.autoData.race}</p>
        </li>
        <li className={s.infoPlague}>
          <p className="fw-700">Двигатель</p>
          <p>{car.autoData.fuelName}</p>
        </li>
        <li className={s.infoPlague}>
          <p className="fw-700">Коробка</p>
          <p>{car.autoData.gearboxName}</p>
        </li>
        <li className={s.infoPlague}>
          <p className="fw-700">Привод</p>
          <p>{car.autoData.driveName}</p>
        </li>
      </ul>
      <div></div>
      <h2>Описание:</h2>
      <p className="fw-500">{car.autoData.description}</p>
      <div></div>
      <a
        className={classNames(s.pageLink, "button", "h2", "fw-800")}
        href={`https://auto.ria.com/uk${car.linkToView}`}
        target="_blank"
      >
        Открыть на AUTO.RIA
      </a>
    </Container>
  );
}
