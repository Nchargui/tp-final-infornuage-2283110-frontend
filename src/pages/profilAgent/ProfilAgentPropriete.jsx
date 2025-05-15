import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProfileCard from "../../components/profile/ProfileCard.jsx";
import '../../components/profile/ProfileCard.css';
import '../profilAdmin/ProfilAdmin.css';
import '../profilClient/CustomerProfile.css';
import Card from "react-bootstrap/Card";
import { FaLocationDot } from "react-icons/fa6";
import { FaBed, FaBath } from "react-icons/fa";
import axios from "axios";
import ImagePropertyList from "../../components/propertiesDisplay/ImagePropertyList.jsx";


// kristina
function ProfilAgentPropriete() {
    const [activeTab, setActiveTab] = useState("properties");
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleTabClick = (tab) => {
        if (tab !== activeTab) {
            setActiveTab(tab);
            if (tab === "requests") {
                navigate("/agentProfileCustomerRequests");
            } else if (tab === "submissions") {
                navigate("/agentProfileCustomerSubmissions");
            }
        }
    };


    const loadAgentProperties = async () => {
        if (!user) return;
        try {
            const [saleRes, rentRes] = await Promise.all([
                axios.get(`http://localhost:9696/PropertySale/agent/${user.idUser}`),
                axios.get(`http://localhost:9696/PropertyRent/agent/${user.idUser}`)
            ]);
            const combinedProperties = [
                ...saleRes.data.map(p => ({ ...p, typeProperty: "sale" })),
                ...rentRes.data.map(p => ({ ...p, typeProperty: "rent" }))
            ];
            setProperties(combinedProperties);
        } catch (error) {
            console.error("Error fetching agent properties:", error);
        }
    };



    useEffect(() => {
        loadAgentProperties();
    }, []);

    const CapitalizedText = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    return (
        <div>
            <ProfileCard />
            <div className="tabContainer">
                <p
                    className={`tabItem ${activeTab === "properties" ? "activeTab" : ""}`}
                    onClick={() => handleTabClick("properties")}
                >
                    My properties
                </p>
                <p
                    className={`tabItem ${activeTab === "requests" ? "activeTab" : ""}`}
                    onClick={() => handleTabClick("requests")}
                >
                    Client requests
                </p>
                <p
                    className={`tabItem ${activeTab === "submissions" ? "activeTab" : ""}`}
                    onClick={() => handleTabClick("submissions")}
                >
                    Client submissions
                </p>
            </div>
            <div className="profileBodyBorder">
                {properties.length === 0 ? (
                    <div className="defaultMessage">
                        No properties assigned to you.
                    </div>
                ) : (
                    <div id="cardProperties">
                        {properties.map((property) => {
                            const type = property.typeProperty === "rent" ? "Rent" : "Sale";
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

export default ProfilAgentPropriete;
