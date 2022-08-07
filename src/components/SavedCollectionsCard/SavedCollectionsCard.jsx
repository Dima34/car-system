import classNames from "classnames";
import Container from "../Container/Container";
import s from "./SavedCollectionsCard.module.scss";
import removeIcon from "../../icons/remove-ico.svg";

export default function SavedCollectionsCard(props) {
  let item = props.data;

  const marka = item.markaName;
  const model = item.modelName;
  const priceFrom = item.priceFrom;
  const priceTo = item.priceTo;
  const yearFrom = item.yearFrom;
  const yearTo = item.yearTo;
  const state = item.stateName;
  const sort = item.sortName;

  return (
    <Container addClass={s.collectionsCard}>
        <div className={s.collectionsCardHeading}>
        <h2 className="gray">
        {marka} {model}
      </h2>

      <button
        className={s["collectionCardDelete"]}
        onClick={() => props.removeItemFromCollection(item.id)}
      >
        <img src={removeIcon} alt=""/>
      </button>
        </div>
      
      <div className={s.collectionsCardInfo}>
        {priceFrom || priceTo ? (
          <Container>
            <p className="gray fw-800">Цена</p>
            <div>
            {priceFrom ? (
              <p>
                <strong>От </strong> {priceFrom} $
              </p>
            ) : null}
            {priceTo ? (
              <p>
                <strong> До </strong> {priceTo} $
              </p>
            ) : null}
            </div>
          </Container>
        ) : null}

        {yearFrom || yearTo ? (
          <Container>
            <p className="gray fw-800">Год</p>
            <div>
            {yearFrom ? (
              <p>
                <strong>От </strong> {yearFrom} год{" "}
              </p>
            ) : null}
            {yearTo ? (
              <p>
                <strong> До </strong> {yearTo} год{" "}
              </p>
            ) : null}
            </div>
          </Container>
        ) : null}

        {state ? (
          <Container>
            <p className="gray fw-800">Область</p>
            <strong>{state}</strong>
          </Container>
            
        ) : null}

        {sort ? (
          <Container>
            <p className="gray fw-800">Сортировка</p>
            <strong>{sort}</strong>
          </Container>
        ) : null}
      </div>

      <button
        onClick={() => props.searchByCollection(item.queryLine)}
        className="button"
      >
        Поиск по коллекции
      </button>

      
    </Container>
  );
}
