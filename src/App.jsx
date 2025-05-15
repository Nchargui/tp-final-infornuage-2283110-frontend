import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'
import Accueil from "./pages/Accueil/Accueil.jsx";
import FormVendre from "./pages/FormVendre.jsx";
import FormLouer from "./pages/FormLouer.jsx";
import Connexion from "./pages/connexion/Connexion.jsx";
import ProfilClientFavoris from "./pages/profilClient/ProfilClientFavoris.jsx";
import ProfilAdmin from "./pages/profilAdmin/ProfilAdmin.jsx";
import ProfilAgentPropriete from "./pages/profilAgent/ProfilAgentPropriete.jsx";
import ProfilClientDemande from "./pages/profilClient/ProfiClientDemande.jsx";
import ProfilClientSoumission from "./pages/profilClient/ProfilClientSoumission.jsx";
import ProfilAgentDemande from "./pages/profilAgent/ProfilAgentDemande.jsx";
import FilterPage from "./pages/PropertyView/FilterPage.jsx";
import PropertyView from "./pages/PropertyView/PropertyView.jsx";
import ContactAgentPage from "./pages/forms/ContactAgentPage.jsx";
import ProfilAgentSoumission from "./pages/profilAgent/ProfilAgentSoumission.jsx";


function App() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Accueil/>}/>
                    <Route path="/sell" element={<FormVendre/>}/>
                    <Route path="/rent" element={<FormLouer/>}/>
                    <Route path="/login" element={<Connexion/>}/>
                    <Route path="/customerProfileFavorites" element={<ProfilClientFavoris/>}/>
                    <Route path="/customerProfileRequests" element={<ProfilClientDemande/>}/>
                    <Route path="/customerProfileSubmissions" element={<ProfilClientSoumission/>}/>
                    <Route path="/agentProfileCustomerRequests" element={<ProfilAgentDemande/>}/>
                    <Route path="/agentProfileProperties" element={<ProfilAgentPropriete/>}/>
                    <Route path="/agentProfileCustomerSubmissions" element={<ProfilAgentSoumission/>}/>
                    <Route path="/adminProfile" element={<ProfilAdmin/>}/>
                    <Route path="/search" element={<FilterPage/>}/>
                    <Route path="/property/:typeProperty/:id" element={<PropertyView/>}/>
                    <Route path="/contact/:typeProperty/:idAgent/:id" element={<ContactAgentPage/>}/>

                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
