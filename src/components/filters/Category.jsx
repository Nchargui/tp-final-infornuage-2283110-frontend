import './Category.css';
import {useFormContext} from "react-hook-form";

// kristina
// form filter : nadine
function Category() {

    const {register} = useFormContext();

    return (

        <div>
            <div className={"categoryContainer"}>
                <label className={"categoryLabel"}>
                    <input type="radio" id="field-house" value="House"
                           className={"categoryCheckbox"} {...register("categorie")}/>
                    House
                </label>
                <label className={"categoryLabel"}>
                    <input type="radio" id="field-condo"  value="Condo"
                           className={"categoryCheckbox"} {...register("categorie")}/>
                    Condo
                </label>
            </div>
            <div className={"categoryContainer"}>
                <label   className={"categoryLabel"}>
                    <input type="radio" id="field-chalet"  value="Chalet"
                           className={"categoryCheckbox"} {...register("categorie")}/>
                    Chalet
                </label>
                <label className={"categoryLabel"}>
                    <input  type="radio" id="field-terrain" value="Terrain"
                           className={"categoryCheckbox"} {...register("categorie")}/>
                    Terrain
                </label>
            </div>
        </div>

    )
        ;
}

export default Category;