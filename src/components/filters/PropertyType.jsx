import React from 'react';
import './Category.css';
import {useFormContext} from "react-hook-form";

// kristina
// form filter : nadine
function PropertyType() {

    const { register } = useFormContext();
    return (



        <div className={"categoryContainer"}>
            <label className={"categoryLabel"}>
                <input type="radio" id="field-sale"  value="Sale"
                       className={"categoryCheckbox"}  {...register("propertyType")}/>
                To buy
            </label>
            <label className={"categoryLabel"}>
                <input type="radio" id="field-rent"  value="Rent"
                       className={"categoryCheckbox"}  {...register("propertyType")}/>
                To rent
            </label>
        </div>
    );
}

export default PropertyType;