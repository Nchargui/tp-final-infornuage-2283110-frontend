import {useEffect, useState} from 'react';
import axios from "axios";
import Card from "react-bootstrap/Card";
import "./ClientRequestList.css"
import {FaCheck} from "react-icons/fa";
import {RiCloseLargeFill} from "react-icons/ri";
import {Link} from "react-router-dom";
import ImagePropertyList from "../propertiesDisplay/ImagePropertyList.jsx";


// nadine
function AgentRequestList() {
    
    const VITE_API_URL = import.meta.env.VITE_API_URL || ""
    const [tabRequests, setRequests] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const data = [
        `${VITE_API_URL}/RequestRent/agent/${user.idUser}`,
        `${VITE_API_URL}/RequestSale/agent/${user.idUser}`,
    ];


    const loadRequests = async () => {
        try {
            const results = await Promise.all(data.map(url => axios.get(url)));
            const allRequests = [...results[1].data, ...results[0].data]
            setRequests(allRequests.filter(request => request.statusDemande === "pending" && request[`property${request.typeDemande}`].isAvailable === true)); // only showing what hasn't been treated and only properties that are still in the store

        } catch (error) {
            console.error(error)
        }

    }

    console.log(tabRequests)

    const acceptRequest = async (id, typeDemande) => {
        try {
            await axios.put(`${VITE_API_URL}/Request${typeDemande}/accept/${id}`)

        } catch (error) {
            console.log("Request put failed: " + error)
        }
    }

    const declineRequest = async (id, typeDemande) => {
        try {
            await axios.put(`${VITE_API_URL}/Request${typeDemande}/refuse/${id}`)

        } catch (error) {
            console.log("Request put failed: " + error)
        }
    }

    const updateOwner = async (id, typeDemande, idUser) => {
        try {

            await axios.put(`${VITE_API_URL}/Request${typeDemande}/updatePerson/${id}/${idUser}`)

        } catch (error) {
            console.log(("Updating owner failed because of: " + error))
        }
    }


    useEffect(() => {
        loadRequests();
    }, []);


    const handleAccept = async (e, data) => {
        try {
            e.preventDefault()

            const userId = data.customer.id
            await acceptRequest(data.idDemande, data.typeDemande)
            await updateOwner(data.idDemande, data.typeDemande, userId)
            await loadRequests()

        } catch (error) {
            alert("There was a problem with your request: " + error)
        }

    };

    const handleDecline = async (e, data) => {
        try {
            e.preventDefault()
            await declineRequest(data.idDemande, data.typeDemande)
            await loadRequests()

        } catch (error) {
            alert("There was a problem with your request: " + error)
        }

    };


    const CapitalizedText = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1)
    };


    return (
        <div>

            {tabRequests.length === 0 ? (
                <div style={{textAlign: "center", padding: "40px", fontSize: "20px", color: "gray"}}>
                    You have no requests
                </div>
            ) : (

                <div className={"cardContainer"}>

                    {tabRequests.map((data) => (

                        <Card className={"cardRequests"} key={data.idDemande}>

                            <Card.Body className={"requestContent"}>


                                <div className={"statusRequest"}>

                                <span className={"statusButtons"}>
                                     <button className={"acceptRequest"} onClick={(e) => handleAccept(e, data)}>
                                    <FaCheck size={25}/>
                                </button>

                                <button className={"rejectRequest"} onClick={(e) => handleDecline(e, data)}>
                                    <RiCloseLargeFill size={25} style={{stroke: "white", strokeWidth: "2"}}/>
                                </button>
                                </span>


                                </div>

                                <div className={"clientContainer"}>
                                    <div className={"agentContainer"}>

                                        <div className={"agentDetails"}>
                                        <div className={"nameAgent"}><p> {data.customer.fname}</p>
                                                <p>{data.customer.lname}</p></div>

                                            <p> {data.customer.email}</p>
                                            <p> {data.customer.phone}</p>

                                            <div className={"carouselRequest"} style={{paddingTop: "20px"}}>
                                                <Link
                                                    to={`/property/${CapitalizedText(data[`property${data.typeDemande}`]?.typeProperty)}/${data[`property${data.typeDemande}`]?.idProperty}`}>
                                                    <ImagePropertyList
                                                        idPropriete={data[`property${data.typeDemande}`]?.idProperty}
                                                        typeProprety={data.typeDemande}/>
                                                </Link>
                                            </div>


                                        </div>


                                    </div>


                                    <div className={"descRequest"}>
                                        {data.description}
                                    </div>

                                </div>


                            </Card.Body>


                        </Card>

                    ))}

                </div>

            )}

        </div>
    );
}

export default AgentRequestList;