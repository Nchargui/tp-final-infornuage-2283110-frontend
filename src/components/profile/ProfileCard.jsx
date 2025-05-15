import './ProfileCard.css';
import Navbar from "../navbar/Navbar.jsx";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


// kristina
function ProfileCard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        } else {
            navigate("/");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate("/");
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="profileCard">
                <div className="profileCardUserCircle">
                    <img className="profileCardUserPicture" src="/user.png" alt="User Picture" />
                </div>
                <div className="profileCardCredentials">
                    <p className="profileCardFullName">{user.fname} {user.lname}</p>
                    <p className="profileCardPersonalInfo">{user.email}</p>
                    <p className="profileCardPersonalInfo">{user.phone}</p>
                </div>
                <div className="profileCardButtonContainer">
                    <button className="profileCardButton deleteButton" onClick={handleLogout}>
                        <p>Log out</p>
                        <img className="buttonIcon" src="exit.png" alt="Exit Icon" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
