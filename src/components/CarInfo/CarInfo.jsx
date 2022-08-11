import Container from "../Container/Container";
import s from "./CarInfo.module.scss";
import classNames from "classnames";


export default function CarInfo(props) {
  let car = props.car;
  return (
    <Container addClass={s.info}>
      <h1>
        {car.title} {car.autoData.year}
      </h1>
      <div className={s.pricenrace}>
        <p className="green h1">{car.USD}$</p>
        <p className="fw-600">{car.UAH} грн</p>
      </div>
      <div></div>
      <p className="fw-500">{car.autoData.description}</p>
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
