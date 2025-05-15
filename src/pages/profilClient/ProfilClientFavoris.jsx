import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProfileCard from "../../components/profile/ProfileCard.jsx";
import '../../components/profile/ProfileCard.css';
import '../profilAdmin/ProfilAdmin.css';
import './CustomerProfile.css';
import Card from "react-bootstrap/Card";
import { FaLocationDot } from "react-icons/fa6";
import { FaBed, FaBath } from "react-icons/fa";
import axios from "axios";
import ImagePropertyList from "../../components/propertiesDisplay/ImagePropertyList.jsx";


// kristina
function ProfilClientFavoris() {
    const [activeTab, setActiveTab] = useState("favorites");
    const [favorites, setFavorites] = useState([]);
    const [heartStates, setHeartStates] = useState({});
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === "requests") {
            navigate("/customerProfileRequests");
        } else if (tab === "submissions") {
            navigate("/customerProfileSubmissions");
        }
    };

    const loadFavorites = async () => {
        if (!user) return;
        try {
            const res = await axios.get(`http://localhost:9696/Favorites/${user.idUser}`);
            setFavorites(res.data);
            const initialHearts = {};
            res.data.forEach(fav => {
                const property = fav.propertySale || fav.propertyRent;
                if (property) {
                    initialHearts[property.idProperty] = true;
                }
            });
            setHeartStates(initialHearts);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    const toggleHeart = async (favId, propertyId) => {
        if (window.confirm("Remove from favorites?")) {
            try {
                await axios.delete(`http://localhost:9696/Favorites/${favId}`);
                setFavorites(favorites.filter(fav => {
                    const prop = fav.propertySale || fav.propertyRent;
                    return prop?.idProperty !== propertyId;
                }));
                setHeartStates(prev => ({ ...prev, [propertyId]: false }));
            } catch (error) {
                console.error("Error removing favorite:", error);
            }
        }
    };

    const CapitalizedText = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    return (
        <div>
            <ProfileCard />
            <div className="tabContainer">
                <p className={`tabItem ${activeTab === "favorites" ? "activeTab" : ""}`} onClick={() => handleTabClick("favorites")}>
                    Favorites
                </p>
                <p className={`tabItem ${activeTab === "requests" ? "activeTab" : ""}`} onClick={() => handleTabClick("requests")}>
                    My requests
                </p>
                <p className={`tabItem ${activeTab === "submissions" ? "activeTab" : ""}`} onClick={() => handleTabClick("submissions")}>
                    My submissions
                </p>
            </div>
            <div className="profileBodyBorder">
                {favorites.length === 0 ? (
                    <div className={"defaultMessage"}>
                        You have not saved any properties yet
                    </div>
                ) : (
                    <div id="cardProperties">
                        {favorites.map((fav) => {
                            const property = fav.propertySale || fav.propertyRent;
                            const type = fav.propertySale ? "Sale" : "Rent";
                            if (!property) return null;
                            return (
                                <Card key={property.idProperty}>
                                    <Link to={`/property/${CapitalizedText(type)}/${property.idProperty}`}>
                                        <div className="carouselHolder">
                                            <ImagePropertyList idPropriete={property.idProperty} typeProprety={type} />
                                        </div>
                                        <Card.Body style={{ paddingLeft: "10px" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <div style={{ display: "flex", alignItems: "flex-end" }}>
                                                    <Card.Title style={{ marginRight: "5px" }}>
                                                        {property.price.toLocaleString("fr-ca", { style: "currency", currency: "CAD" })}
                                                    </Card.Title>
                                                    <span style={{ fontSize: "15px", color: "#555" }}>
                                                        {type === "Rent" ? "/month" : ""}
                                                    </span>
                                                </div>
                                                <img
                                                    src={heartStates[property.idProperty] ? "fullHeart.png" : "emptyHeart.png"}
                                                    alt="Heart Icon"
                                                    style={{ width: "30px", height: "30px", cursor: "pointer" }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        toggleHeart(fav.idFavorite, property.idProperty);
                                                    }}
                                                />
                                            </div>
                                            <Card.Text as="div" style={{ paddingTop: "10px" }}>
                                                <div><FaLocationDot /> {property.address},</div>
                                                <div style={{ paddingLeft: "3px" }}>{property.city}</div>
                                            </Card.Text>
                                            <div>
                                                <Card.Text as="div" style={{ display: "inline-flex", paddingTop: "20px" }}>
                                                    <div><FaBed size={23} style={{ marginRight: "0.5rem" }} />{property.nbRooms}</div>
                                                    <div style={{ paddingInlineStart: "1rem" }}><FaBath size={22} style={{ marginRight: "0.5rem" }} />{property.nbBathrooms}</div>
                                                </Card.Text>
                                            </div>
                                        </Card.Body>
                                    </Link>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfilClientFavoris;