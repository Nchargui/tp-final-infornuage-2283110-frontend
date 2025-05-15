import {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ImagePropertyList from "./ImagePropertyList.jsx";
import {FaLocationDot} from "react-icons/fa6";
import {FaBed} from "react-icons/fa";
import {FaBath} from "react-icons/fa";
import "./propertiesDisplay.css"
import axios from "axios";


// nadine
function PropertiesListCardAgent() {

    const {idAgent} = useParams();
    const [tabProperty, setProperty] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));


    const data = [
        `${VITE_API_URL}:9696/PropertySale/agent/${idAgent}`,
        `${VITE_API_URL}:9696/PropertyRent/agent/${idAgent}`,
    ];


    const loadAllProperty = async () => {
        try {
            const results = await Promise.all(data.map(url => axios.get(url)));  //mapper les urls et pour chaque, faire un appel axios
            const allProperties = [...results[1].data, ...results[0].data] // sachant qu'il y a deux array dans le résutlats, il faut combiner les deux propiétés en une seule array
            setProperty(allProperties.filter(property => property.customer?.id !== user.idUser && property.occupant?.id !== user.idUser))

        } catch (error) {
            console.error(error)
        }

    };


    useEffect(() => {
        loadAllProperty();
    }, []);

    console.log(tabProperty)


    const CapitalizedText = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1)
    };

    return (

        <div className={"titleAndProperties"}>
            <div className={"titleProperties"}><h2 style={{color: "#2831e5", paddingLeft: "1rem"}}>View more properties
                from
                this agent</h2>
                <div id={"cardProperties"}>

                    {tabProperty.map((data) => (

                        <Card key={data.idProperty}>
                            <Link to={`/property/${CapitalizedText(data.typeProperty)}/${data.idProperty}`}>
                                <div className={"carouselHolder"}>
                                    <ImagePropertyList idPropriete={data.idProperty}
                                                       typeProprety={CapitalizedText(data.typeProperty)}/>
                                </div>

                                <Card.Body style={{paddingLeft: "10px"}}>
                                    <div>
                                        <Card.Title
                                            style={{display: "inline-flex"}}>{data.price.toLocaleString("fr-ca", {
                                            style: "currency",
                                            currency: "CAD"
                                        })}

                                            <div style={{fontSize: "15px", alignContent: "end"}}>
                                            </div>
                                        </Card.Title>

                                        <span className="priceUnit" style={{fontSize: "15px", color: "#555"}}>

                                        {data.typeProperty === "rent" ? "/month" : ""}
                                    </span>
                                    </div>
                                    <Card.Text as={"div"} style={{paddingTop: "10px",}}>
                                        <div><FaLocationDot/> {data.address},</div>
                                        <div style={{paddingLeft: "3px"}}> {data.city}</div>
                                    </Card.Text>
                                    <div>
                                        <Card.Text as={"div"} style={{display: "inline-flex", paddingTop: "20px"}}>
                                            <div><FaBed size={23} style={{marginRight: "0.5rem"}}/>{data.nbRooms}</div>
                                            <div style={{paddingInlineStart: "1rem"}}><FaBath size={22}
                                                                                              style={{marginRight: "0.5rem"}}/>{data.nbBathrooms}
                                            </div>
                                        </Card.Text>
                                    </div>

                                </Card.Body>
                            </Link>

                        </Card>

                    ))}

                </div>
            </div>

        </div>

    );
}


export default PropertiesListCardAgent;