import s from "./Pagination.module.css";
import leftArrow from "../../icons/nav-arrow-left.svg";
import rightArrow from "../../icons/nav-arrow-right.svg";
import Container from "../Container/Container";
import classNames from "classnames";

export default function Pagination(props) {
  const makeSearch = props.makeSearch;
  const paginationPages = props.items;
  const activeIndex = paginationPages.findIndex((el) => el.active);

  // 2 items from left and 2 from right
  let summarySideAmount = 2;
  // lust for control to always have even number
  summarySideAmount = Math.ceil(summarySideAmount);

  // Amount of buttons from left and right
  let leftAmount;
  let rightAmount;

  // if active 1 page
  if (activeIndex - summarySideAmount / 2 < 0) {
    leftAmount =
      summarySideAmount / 2 - Math.abs(activeIndex - summarySideAmount / 2);
    rightAmount = summarySideAmount - leftAmount;
  } else {
    leftAmount = rightAmount = summarySideAmount / 2;
  }

  // if active last page
  if (activeIndex + summarySideAmount / 2 > paginationPages.length - 1) {
    rightAmount =
      paginationPages.length +
      1 -
      Math.ceil(activeIndex + summarySideAmount / 2);
    leftAmount = summarySideAmount - rightAmount;
  }

  let paginationArr = paginationPages.slice(
    activeIndex - leftAmount,
    activeIndex
  );
  paginationArr.push(paginationPages[activeIndex]);
  paginationArr.push(
    ...paginationPages.slice(activeIndex + 1, activeIndex + rightAmount + 1)
  );

  console.log(paginationArr);
  return (
    <Container addClass={s.container}>
      {leftAmount > 0 ? (
        <PaginationButton  onClick={() =>makeSearch(paginationPages[activeIndex - 1].pageQuery)}>
          <img src={leftArrow} alt="previous page" />
          Назад
        </PaginationButton>
      ) : <div></div>}

      <ul className={s.paginationContainer}>
        {/* first page and ... */}
        {activeIndex > summarySideAmount / 2 ? (
          <li>
            <button
              onClick={() => makeSearch(paginationPages[0].pageQuery)}
              className={s.navigationButton}
            >
              {paginationPages[0].pagenum}
            </button>
          </li>
        ) : null}

        {activeIndex > summarySideAmount / 2 + 1 ? <li className={s.etc}>...</li> : null}

        {/* main pagination part */}
        {paginationArr.map((el, id) => (
          <li key={id}>
            <PaginationButton isActive={el.active} onClick={() => makeSearch(el.pageQuery)}>
              {el.pagenum}
            </PaginationButton>
          </li>
        ))}

        {/* ... and last page number */}
        {paginationPages.length - activeIndex - 2 > summarySideAmount / 2 ? (
          <li className={s.etc}>...</li>
        ) : null}
        {paginationPages.length - activeIndex > summarySideAmount / 2 ? (
          <li>
            <PaginationButton  onClick={() => makeSearch(paginationPages[paginationPages.length - 1].pageQuery)}>
              {paginationPages[paginationPages.length - 1].pagenum}
            </PaginationButton>
          </li>
        ) : null}
      </ul>
      {rightAmount > 0 ? (
        <PaginationButton  onClick={() => makeSearch(paginationPages[activeIndex + 1].pageQuery)}>
          Вперед
          <img src={rightArrow} alt="next page" />
        </PaginationButton>
      ) : null}
    </Container>
  );
}

function PaginationButton(props) {
  let activeClass = s.active

  return (
    <button
      onClick={props.onClick}
      className={classNames(s.navigationButton, { [activeClass] : props.isActive})}
    >      
      {props.children}
    </button>
  );
}
