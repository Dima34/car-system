import Container from "../Container/Container";
import s from "./Filter.module.css";

function OptionList(props){
    return (
        props.array.map(el=>(
            <option 
                value={el.value}
                key={el.value}
            >
                {el.name}
            </option>
        ))
    )
}

function Select(props) {
    return(
        <select value = {props.value} name={props.name} onChange={(e)=>props.handleChange(e)}>
            <option value="">Не выбрано</option>
            <OptionList array={props.list} />
        </select>
    )
}

function InputNumber(props) {
    return(
        <input type="number" min="0" value = {props.value} name={props.name} onChange={(e)=>props.handleChange(e)} />
    )
}

function Filter(props) {

    return(
        <Container addClass = "filter">
            <h2>Фильтр</h2>
            <label htmlFor="markList">
                Марка
                <Select 
                    name="markList" 
                    value = {props.valueList.markList.value}
                    list={props.marks} 
                    handleChange={props.handleSelectionChange} 
                />
            </label>
            <label htmlFor="models">
                Модель
                <Select 
                    name="modelList" 
                    value = {props.valueList.modelList.value}
                    list={props.models} 
                    handleChange={props.handleSelectionChange} 
                />
            </label>            
            <div className="double-filter">
                <label htmlFor="yearFrom">
                    Год от
                    <InputNumber 
                        name="yearFrom" 
                        value = {props.valueList.yearFrom}
                        handleChange={props.handleSelectionChange} 
                    />
                </label>
                <label htmlFor="year_to">
                    Год до
                    <InputNumber 
                        name="yearTo" 
                        value = {props.valueList.yearTo}
                        handleChange={props.handleSelectionChange} 
                    />
                </label>
            </div>
            <div className="double-filter">
                <label htmlFor="price_from">
                    Цена от
                    <InputNumber 
                        name="priceFrom" 
                        value = {props.valueList.priceFrom}
                        handleChange={props.handleSelectionChange} 
                    />
                </label>
                <label htmlFor="price_to">
                    Цена до
                    <InputNumber 
                        name="priceTo" 
                        value = {props.valueList.priceTo}
                        handleChange={props.handleSelectionChange} 
                    />
                </label>
            </div>
            <label htmlFor="state">
                Область
                <Select 
                    name="state" 
                    value = {props.valueList.state.value}
                    list={props.states} 
                    handleChange={props.handleSelectionChange} 
                />
            </label>  
            <label htmlFor="sortType">
                Сортировка
                <Select 
                    name="sortType" 
                    value = {props.valueList.sortType.value}
                    list={props.sortTypeList} 
                    handleChange={props.handleSelectionChange} 
                />
            </label>    
            <div className="filter_footer">
                <button onClick = {()=>props.makeSearch()}>Поиск</button>
                <button onClick = {()=>props.searchByCollections()} disabled = {props.collectionsList.length == 0 ? true : false}>Поиск по коллекциям</button>
                <button id="add-to-collection" onClick={()=>props.addToCollection()} disabled = {props.queryLine.length == 0 ? true : false} >Добавить в коллекцию</button>
            </div>
        </Container> 
    )
}

export default Filter


