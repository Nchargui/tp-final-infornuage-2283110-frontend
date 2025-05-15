import './SearchBar.css';
import {useFormContext} from "react-hook-form";

// kristina
function SearchBar() {

    const { register } = useFormContext();
    return (
        <div>
            <input className={"searchBar"} type="text" placeholder="Search by city"  {...register("city")}/>
        </div>

    );
}

export default SearchBar;