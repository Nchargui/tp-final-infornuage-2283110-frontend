import Navbar from "../../components/navbar/Navbar.jsx";
import ContactAgentForm from "../../components/forms/ContactAgentForm.jsx";
import PropertiesListCardAgent from "../../components/propertiesDisplay/PropertiesListCardAgent.jsx";


// nadine
function ContactAgentPage() {
    return (
        <div>

            <Navbar />
            <ContactAgentForm />
            <div style={{paddingTop:"20px"}}>
                <PropertiesListCardAgent/></div>

        </div>
    );
}

export default ContactAgentPage;