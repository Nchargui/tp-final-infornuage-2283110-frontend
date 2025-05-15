import Navbar from "../../components/navbar/Navbar.jsx";
import PropertiesListCard from "../../components/propertiesDisplay/PropertiesListCard.jsx";
import  {useState} from 'react'
import Filters from "../../components/filters/Filters.jsx";
import "./filterPage.css"

/// nadine
function FilterPage() {

    const [filters, setFilters] = useState({})

    return (

        <div><Navbar/>

            <div className={"bodyContainer"}>
                <div className={"filterPropertyContainer"}>
                    <div className={"containerCardSwiper"}>
                        <div className={"searchContainer"}>
                            <Filters setFilters={setFilters}/>
                        </div>
                        <div className={"title"}>
                            <h2> Available properties</h2>
                            <hr/>
                        </div>
                        <PropertiesListCard {...filters} priceType={"/month"} />
                    </div>

                </div>
            </div>


        </div>
    );
}

export default FilterPage;