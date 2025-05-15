import './Features.css';
import {useFormContext} from "react-hook-form";


// kristina
// form filter : nadine
function Features() {

    const { register } = useFormContext();
    return (
        <div className={"FeaturesFilters"}>
            <input className={"inputFeatures"} type={"number"} min="0" placeholder={"Minimum number of rooms"}  {...register("nbRooms")}/>
            <input className={"inputFeatures"} type={"number"} min="0" placeholder={"Minimum number of bathrooms"} {...register("nbBathrooms")}/>
            <input className={"inputFeatures"} type={"number"} min="0" placeholder={"Minimum number of parking spots"} {...register("nbParking")}/>
            <input className={"inputFeatures"} type={"number"} min="0" placeholder={"Minimum number of garages"} {...register("nbGarages")}/>
        </div>
    );
}

export default Features;