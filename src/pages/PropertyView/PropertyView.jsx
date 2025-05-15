import {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import ImagePropertyList from "../../components/propertiesDisplay/ImagePropertyList.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import "./propertyView.css"
import {FaBath, FaBed} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";
import {LuCircleParking} from "react-icons/lu";
import {BiSolidCarGarage} from "react-icons/bi";

// nadine
function PropertyView() {


    const {id, typeProperty} = useParams()
    const [property, setProperty] = useState({});
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [applied, setApplied] = useState({});
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const loadProperty = async () => {
        try {
            const result = await axios.get(`${VITE_API_URL}/Property${typeProperty}/${id}`);
            setProperty(result.data);

        } catch (error) {
            console.error(error)
        }

    }

    const getAlreadyApplied = async () => {
        try {
            const result = await axios.get(`${VITE_API_URL}/Request${typeProperty}/verifyRequest/${user.idUser}/${id}`);
            setApplied(result.data);


        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        loadProperty();
    }, []);

    useEffect(() => {
        getAlreadyApplied();
    }, []);
    ////////////////////////////////////////////////////////////////////////////////////////////////

    const handleContact = () => {

        if (!user) {
            setShowLoginPopup(true);

        } else if (user.role === "customer") {

            if (applied) {
                alert("You already applied for this property");

            } else {
                navigate(`/contact/${typeProperty}/${property.agent.id}/${property.idProperty}`)
            }

        } else {
            setShowErrorPopup(true);
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////


    const handleLoginRedirect = () => {
        navigate("/login");
    };

    const handleCancel = () => {
        navigate("/");
    };




    ////////////////////////////////////////////////////////////////////////////////////////////

    if (!property.price) {  /// méthode toLocaleString est appelé avant les données
        return <div>loading property</div>
    }

    const priceType = property?.typeProperty === "rent" ? "/month" : "";



    return (
        <div>

            <Navbar/>

            {showLoginPopup && (
                <div className="popup">
                    <div className="popupContent">
                        <p>You must be logged to do a request.</p>
                        <button className={"popupButton1"} onClick={handleLoginRedirect}>Login</button>
                        <button className={"popupButton2"} onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            )}

            {showErrorPopup && (
                <div className="popup">
                    <div className="popupContent">
                        <p>Only customers can do a request.</p>
                        <button className={"popupButton1"} onClick={handleCancel}>Return to Home</button>
                    </div>
                </div>
            )}


            <div className={"containerProperty"}>
                <div className={"containerType"}>

                    <h1 style={{color: "#2831e5"}}>{property.categorie} to {property.typeProperty}</h1>
                    <div className={"priceAddress"}>
                        <div className={"containerAddress"}>
                            <h1><FaLocationDot/> {property.address},</h1>
                            <h1>{property.city}</h1></div>

                        <div className={"containerPrice"}>
                            <h1>{property.price.toLocaleString("fr-ca", {
                                style: "currency",
                                currency: "CAD"
                            })}</h1>
                            <h1 className={"price"} style={{fontSize: "30px"}}>{priceType}</h1>
                        </div>
                    </div>


                </div>
                <div className={"carouselProperty"}>
                    <ImagePropertyList idPropriete={property.idProperty} typeProprety={typeProperty}/>
                </div>

                <h3 style={{color: " #2831e5", fontSize: "20px"}}>Features </h3>
                <div className={"containerDetails"}>

                    <p><FaBed/>{property.nbRooms} room(s)</p>
                    <p><FaBath/>{property.nbBathrooms} bathroom(s)</p>
                    <p><LuCircleParking/>{property.nbParkingSpace} parking space(s)</p>
                    <p><BiSolidCarGarage/>{property.nbGarages} garage(s)</p>
                    <div>
                        <p className={"area"}>area</p>
                        <p>{property.area} pc</p>
                    </div>
                    <div>
                        <p className={"year"}>Construction year</p>
                        <p>{property.constructionYear}</p>
                    </div>


                </div>

                <div className={"descAgent"}>
                    <div className={"description"}>
                        <h3 style={{color: " #2831e5", fontSize: "20px"}}>Description</h3>
                        <p>{property.description}</p>
                    </div>


                    <div className={"agentContainer"}>
                        <div className={"pfp"}>
                            <img src={"/user.png"}  style={{background:"#086788", borderRadius:"100%", padding:"20px"}} alt={"agent pfp"}/>
                        </div>
                        <div className={"agentDetails"}>
                            <div className={"nameAgent"}><p> {property.agent.fname}</p>
                                <p>{property.agent.lname}</p></div>

                            <p> {property.agent.email}</p>
                            <p> {property.agent.phone}</p>

                                <button style={{background: "#2831e5", color:"white"}} onClick={handleContact} >Contact</button>

                        </div>

                    </div>

                </div>
            </div>


        </div>
    );
}

export default PropertyView;