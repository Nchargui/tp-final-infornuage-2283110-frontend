import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ImagePropertyList from "./ImagePropertyList.jsx";
import {FaLocationDot} from "react-icons/fa6";
import {FaBed} from "react-icons/fa";
import {FaBath} from "react-icons/fa";
import './PropertiesListCard.css';



// nadine et kristina

function PropertiesListCard(propsFilters) { // par défaut, les filtres seront null, (sauf le prix et la categorie)

    const {
        minPrice = '0',
        maxPrice = '3000000',
        nbRooms = '',
        nbBathrooms = '',
        nbParking = '',
        nbGarages = '',
        minArea = '',
        maxArea = '',
        minYear = '',
        maxYear = '',
        categorie = '',
        city = '',
        propertyType = 'Rent'
    } = propsFilters;

    const VITE_API_URL = import.meta.env.VITE_API_URL || ""
    const [tabProperty, setProperty] = useState([]);
    const [heartStates, setHeartStates] = useState({});
    const [favoritesMap, setFavoritesMap] = useState({});
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const loadAllProperty = async () => {
        try {
            const result = await axios.get(`${VITE_API_URL}/Property${propertyType}/filtre?minPrice=${minPrice}&maxPrice=${maxPrice}&nbRooms=${nbRooms}&nbBathrooms=${nbBathrooms}&nbParking=${nbParking}&nbGarages=${nbGarages}&minArea=${minArea}&maxArea=${maxArea}&minYear=${minYear}&maxYear=${maxYear}&categorie=${categorie}&city=${city}`);

            if(user){
                setProperty(result.data.filter(property => property.customer?.id !== user.idUser && property.occupant?.id !== user.idUser && property.isAvailable === true));
            }else{
                setProperty(result.data.filter(property =>  property.isAvailable === true));
            }


        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };


    console.log(tabProperty)


    const loadFavorites = async () => {
        if (!user) return;
        try {
            const res = await axios.get(`${VITE_API_URL}/Favorites/${user.idUser}`);
            const map = {};
            res.data.forEach(fav => {
                const property = fav.propertySale || fav.propertyRent;
                if (property) {
                    map[property.idProperty] = fav.idFavorite;
                }
            });
            setFavoritesMap(map);
            const initialHearts = {};
            Object.keys(map).forEach(propertyId => {
                initialHearts[propertyId] = true;
            });
            setHeartStates(initialHearts);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    useEffect(() => {
        loadAllProperty();
        loadFavorites();
    }, [propsFilters]);

    const toggleHeart = async (propertyId) => {
        if (!user) {
            setShowLoginPopup(true);
            return;
        }
        if (user.role !== "customer") {
            setShowErrorPopup(true);
            return;
        }

        if (heartStates[propertyId]) {
            try {
                const favId = favoritesMap[propertyId];
                if (favId) {
                    await axios.delete(`${VITE_API_URL}/Favorites/${favId}`);
                    setHeartStates(prev => ({ ...prev, [propertyId]: false }));
                    const updatedMap = { ...favoritesMap };
                    delete updatedMap[propertyId];
                    setFavoritesMap(updatedMap);
                }
            } catch (error) {
                console.error("Error deleting favorite:", error);
            }
        } else {
            try {
                const res = await axios.post(`${VITE_API_URL}/Favorites/addFavorite`, null, {
                    params: {
                        customerId: user.idUser,
                        propertyId: propertyId,
                        type: propertyType.toLowerCase()
                    }
                });
                setHeartStates(prev => ({ ...prev, [propertyId]: true }));
                setFavoritesMap(prev => ({ ...prev, [propertyId]: res.data.idFavorite }));
            } catch (error) {
                console.error("Error adding favorite:", error);
            }
        }
    };

    const CapitalizedText = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1)

    };

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (

        <div id="cardProperties">

            {tabProperty.length === 0 ? (
                <div style={{textAlign: "center", padding: "40px", fontSize: "20px", color: "gray"}}>
                    No properties found
                </div>
            ) : (

            tabProperty.map((data) => (
                <Card key={data.idProperty}>
                    <Link to={`/property/${CapitalizedText(propertyType)}/${data.idProperty}`}>
                        <div className="carouselHolder">
                            <ImagePropertyList idPropriete={data.idProperty} typeProprety={propertyType} />
                        </div>
                        <Card.Body className="cardBody" style={{ paddingLeft: "10px" }}>
                            <div className="cardHeader" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div className="cardPrice" style={{ display: "flex", alignItems: "flex-end" }}>
                                    <Card.Title className="priceText" style={{ marginRight: "5px" }}>
                                        {data.price ? data.price.toLocaleString("fr-ca", { style: "currency", currency: "CAD" })  : ""}
                                    </Card.Title>
                                    <span className="priceUnit"  style={{ fontSize: "15px", color: "#555" }}>

                                        {propertyType === "Rent" ? "/month" : ""}
                                    </span>
                                </div>
                                <img
                                    src={heartStates[data.idProperty] ? "fullHeart.png" : "emptyHeart.png"}
                                    alt="Heart Icon"
                                    className="heartIcon"
                                    style={{ width: "30px", height: "30px", cursor: "pointer" }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleHeart(data.idProperty);
                                    }}
                                />
                            </div>
                            <Card.Text as="div" className="cardLocation"  style={{ paddingTop: "10px" }}>
                                <div><FaLocationDot /> {data.address},</div>
                                <div style={{ paddingLeft: "3px" }}>{data.city}</div>
                            </Card.Text>
                            <Card.Text as="div" className="cardFeatures" style={{ display: "inline-flex", paddingTop: "20px" }}>
                                <div><FaBed size={23} style={{ marginRight: "0.5rem" }}  />{data.nbRooms}</div>
                                <div style={{ paddingInlineStart: "1rem" }}><FaBath size={22} style={{ marginRight: "0.5rem" }}/>{data.nbBathrooms}</div>
                            </Card.Text>
                        </Card.Body>
                    </Link>
                </Card>
            ))

            )}


            {showLoginPopup && (
                <div className="popup">
                    <div className="popupContent">
                        <p>You must be logged in to save a property.</p>
                        <button className="popupButton1" onClick={handleLoginRedirect}>Login</button>
                        <button className="popupButton2" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            )}

            {showErrorPopup && (
                <div className="popup">
                    <div className="popupContent">
                        <p>Only customers can save properties.</p>
                        <button className="popupButton1" onClick={handleCancel}>Return to Home</button>
                    </div>
                </div>
            )}
        </div>

    );

}


export default PropertiesListCard;