import React, {useState} from 'react';
import './Filters.css';
import Price from './Price.jsx';
import PropertyType from "./PropertyType.jsx";
import Category from "./Category.jsx";
import Features from "./Features.jsx";
import Building from "./Building.jsx";
import {useForm, FormProvider, useFormContext} from "react-hook-form"
import SearchBar from "../searchBar/SearchBar.jsx";
import {Link, useNavigate} from "react-router-dom";


// kristina
// form filter : nadine

// eslint-disable-next-line react/prop-types
function Filters( {setFilters}) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [toggleStates, setToggleStates] = useState({
        price: false,
        category: false,
        propertyType: false,
        features: false,
        building: false
    });

    const toggleFilters = () => {
        setIsCollapsed(!isCollapsed);
    };

    const restFilters = () => {
        window.location.href = "/search"

    }

    const toggleButton = (filter) => {
        setToggleStates(prevState => {
            const newState = {
                price: false,
                category: false,
                propertyType: false,
                features: false,
                building: false
            };
            newState[filter] = !prevState[filter];
            return newState;
        });
    };

    const navigate = useNavigate();

    ///////////////////////////////filters form/////////////////////////////////////////

    const methods = useForm({defaultValues: {propertyType: "Rent", categorie: ""}});
    const onSubmit = (data) => {
        setFilters(data)
        console.log(data);
        navigate("/search")

    };

    ///////////////////////////////

    return (


        <div>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>

                    <SearchBar/>
                    <div className={"filterButtonContainer"}>
                        <button className="listFilters" onClick={toggleFilters} type={"button"}>
                            <p>Filters</p><img className="filterImg" src="filter.png" alt="Filter"/>
                        </button>


                            <button type={"submit"} className={"searchButton"}><img className={"searchIcon"}
                                                                                    src={"search.png"}/></button>

                    </div>
                    <div className={`listFiltersCollapse ${isCollapsed ? 'collapse' : ''}`}>
                        <div className={"collapseFiltersContainer"}>
                            <div className="filterRow">
                                <div className="filterRowHeader">
                                    <p className={"collapseFilter"}>Price</p>
                                    <button className={"plusButton"} type={"button"} onClick={() => toggleButton('price')}>
                                        <img className={"plusImg"}
                                             src={toggleStates.price ? "minus.png" : "plus.png"}
                                             alt={toggleStates.price ? "Minus icon" : "Plus icon"}/>
                                    </button>
                                </div>
                                <div className={`component ${toggleStates.price ? 'show' : ''}`}><Price/></div>
                            </div>

                            <div className="filterRow">
                                <div className="filterRowHeader">
                                    <p className={"collapseFilter"}>Property Type</p>
                                    <button className={"plusButton"}  type={"button"} onClick={() => toggleButton('category')}>
                                        <img className={"plusImg"}
                                             src={toggleStates.category ? "minus.png" : "plus.png"}
                                             alt={toggleStates.category ? "Minus icon" : "Plus icon"}/>
                                    </button>
                                </div>
                                <div className={`component ${toggleStates.category ? 'show' : ''}`}><PropertyType/>
                                </div>
                            </div>
                            <div className="filterRow">
                                <div className="filterRowHeader">
                                    <p className={"collapseFilter"}>Category</p>
                                    <button className={"plusButton"}  type={"button"} onClick={() => toggleButton('propertyType')}>
                                        <img className={"plusImg"}
                                             src={toggleStates.propertyType ? "minus.png" : "plus.png"}
                                             alt={toggleStates.propertyType ? "Minus icon" : "Plus icon"}/>
                                    </button>
                                </div>
                                <div className={`component ${toggleStates.propertyType ? 'show' : ''}`}><Category/>
                                </div>
                            </div>
                            <div className="filterRow">
                                <div className="filterRowHeader">
                                    <p className={"collapseFilter"}>Features</p>
                                    <button className={"plusButton"}  type={"button"}onClick={() => toggleButton('features')}>
                                        <img className={"plusImg"}
                                             src={toggleStates.features ? "minus.png" : "plus.png"}
                                             alt={toggleStates.features ? "Minus icon" : "Plus icon"}/>
                                    </button>
                                </div>
                                <div className={`component ${toggleStates.features ? 'show' : ''}`}><Features/>
                                </div>
                            </div>
                            <div className="filterRow">
                                <div className="filterRowHeader">
                                    <p className={"collapseFilter"}>Building</p>
                                    <button className={"plusButton"}  type={"button"}onClick={() => toggleButton('building')}>
                                        <img className={"plusImg"}
                                             src={toggleStates.building ? "minus.png" : "plus.png"}
                                             alt={toggleStates.building ? "Minus icon" : "Plus icon"}/>
                                    </button>
                                </div>
                                <div className={`component ${toggleStates.building ? 'show' : ''}`}><Building/>
                                </div>
                            </div>
                            <button className={"filterButton"}  onClick={restFilters} type={"button"}>Reset</button>
                            <button className={"filterButton"} onClick={toggleFilters} type={"button"}>Close</button>
                        </div>
                    </div>

                </form>
            </FormProvider>
        </div>
    );
}

export default Filters;