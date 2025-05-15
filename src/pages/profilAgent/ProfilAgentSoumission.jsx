import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../components/profile/ProfileCard.jsx";
import '../../components/profile/ProfileCard.css';
import '../profilAdmin/ProfilAdmin.css';
import '../profilClient/CustomerProfile.css';
import AgentSubmissionList from "../../components/submissionList/AgentSubmissionList.jsx";



// kristina
function ProfilAgentDemande() {
    const [activeTab, setActiveTab] = useState("submissions");
    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        if (tab !== activeTab) {
            setActiveTab(tab);
            if (tab === "properties") {
                navigate("/agentProfileProperties");
            } else if (tab === "requests") {
                navigate("/agentProfileCustomerRequests");
            }
        }
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
                <AgentSubmissionList />
            </div>
        </div>
    );
}

export default ProfilAgentDemande;
