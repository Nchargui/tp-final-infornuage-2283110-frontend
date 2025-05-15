import ProfileCard from "../../components/profile/ProfileCard.jsx";
import '../../components/profile/ProfileCard.css';
import AdminCustomerCard from "../../components/profile/AdminCustomerCard.jsx";
import './ProfilAdmin.css';


// kristina
function ProfilAdmin() {
    return (
        <div>
            <ProfileCard />
            <div className={"profileBodyBorder"}>
                <AdminCustomerCard />
            </div>
        </div>
    );
}

export default ProfilAdmin;