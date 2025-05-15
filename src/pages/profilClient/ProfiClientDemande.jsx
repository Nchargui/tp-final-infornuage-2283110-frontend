import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../components/profile/ProfileCard.jsx";
import '../../components/profile/ProfileCard.css';
import '../profilAdmin/ProfilAdmin.css';
import './CustomerProfile.css';
import ClientRequestList from "../../components/requestList/ClientRequestList.jsx";


//nadine
function ProfilClientDemande() {
    const [activeTab, setActiveTab] = useState("requests");
    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === "favorites") {
            navigate("/customerProfileFavorites");
        } else if (tab === "submissions") {
            navigate("/customerProfileSubmissions");
        }
    };

    return (
        <div>
            <ProfileCard />
            <div className="tabContainer">
                <p
                    className={`tabItem ${activeTab === "favorites" ? "activeTab" : ""}`}
                    onClick={() => handleTabClick("favorites")}
                >
                    Favorites
                </p>
                <p
                    className={`tabItem ${activeTab === "requests" ? "activeTab" : ""}`}
                >
                    My requests

                </p>
                <p
                    className={`tabItem ${activeTab === "submissions" ? "activeTab" : ""}`}
                    onClick={() => handleTabClick("submissions")}
                >
                    My submissions
                </p>
            </div>
            <div className={"profileBodyBorder"}>


                <ClientRequestList/>


            </div>
        </div>
    );
}

export default ProfilClientDemande;