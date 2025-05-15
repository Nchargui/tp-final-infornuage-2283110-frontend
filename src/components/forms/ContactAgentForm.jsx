import {useEffect, useState} from 'react';
import "./ContactAgent.css"
import Box from "@mui/material/Box";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";



// Nadine
function ContactAgentForm() {

    const VITE_API_URL = import.meta.env.VITE_API_URL || ""
    const {id, typeProperty, idAgent} = useParams()
    const [property, setProperty] = useState({});
    const [applied, setApplied] = useState({});
    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();

    ///////////////////////////////////////////////////////////////////////////////////////////

    const [formRequest, setRequest] = useState({
        description: "",
        statusDemande: "pending",
        typeDemande: typeProperty,
        agent: {
            "id": Number(idAgent)
        },
        customer: {
            id: user.idUser
        },
        [`property${typeProperty}`]: {
            idProperty: Number(id)
        }

    });


    const handleChange = (e) => {
        const {name, value} = e.target;
        setRequest(prev => ({
            ...prev,
            [name]: value
        }));
    };



///////////////////////////////////////////////////////////////////////////////////////////////////

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
        getAlreadyApplied();
    }, []);



    if (!property.agent) {  /// méthode toLocaleString est appelé avant les données
        return <div>loading property</div>
    }
////////////////////////////handling submits/////////////////////////////////////////////////////////
    const submitRequest = async () => {
        try {
            axios.post(`${VITE_API_URL}/Request${typeProperty}/createRequest`, formRequest);
            navigate("/customerProfileFavorites");


        } catch (error) {
            alert(error)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (applied) {
            alert("You already applied for this property");

        } else {
            submitRequest()
        }

    };
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////





    return (
        <div>

            <Box className={"formAgent"}>
                <h2>Contact agent</h2>
                <div className={"clientSection"}>

                    <form onSubmit={handleSubmit} method="post">
                        <div className={"section3"}>
                            <div>
                                <label htmlFor={"Description"}>Description</label>
                                <textarea className={"desc"}  maxLength={255} name={"description"}
                                          placeholder="Write more details for the agent.."
                                          value={formRequest.description} onChange={handleChange} required></textarea>
                            </div>

                        </div>

                        <button type={"submit"} value={"Submit"}>Submit</button>

                    </form>


                </div>
                <div className={"agentSection"}>

                    <div className={"agentContainer"}>
                        <div className={"pfp"}>
                            <img src={"/user.png"}
                                 style={{background: "#086788", borderRadius: "100%", padding: "20px"}}
                                 alt={"agent pfp"}/>
                        </div>


                        <div className={"agentDetails"}>
                            <div className={"nameAgent"}><p>
                                {property.agent.fname}</p>
                                <p>{property.agent.lname}</p>
                            </div>
                            <p> {property.agent.email}</p>
                            <p> {property.agent.phone}</p>

                        </div>

                    </div>
                </div>

            </Box>

        </div>
    );
}

export default ContactAgentForm;