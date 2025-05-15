import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import "../profile/AdminCustomerCard.css";

// kristina
function Navbar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const toggleNavbar = () => {
        setIsCollapsed(!isCollapsed);
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleProfileClick = () => {
        if (user) {
            if (user.role === "admin") {
                navigate("/adminProfile");
            } else if (user.role === "agent") {
                navigate("/agentProfileCustomerRequests");
            } else {
                navigate("/customerProfileFavorites");
            }
        }
    };

    return (
        <nav className="navbar">
            <Link to={"/"}>
                <img className="logo" src="/homeBreeze.png" alt="Logo" />
            </Link>
            <Link to={"/"}>
                <p className="homeBreeze">HomeBreeze</p>
            </Link>

            <div className={`navbarCollapse ${isCollapsed ? 'collapse' : ''}`}>
                <div className="collapseLinkContainer">
                    <Link to="/sell">
                        <p className="collapseLink">Sell</p>
                    </Link>
                    <Link to="/rent">
                        <p className="collapseLink">Rent</p>
                    </Link>
                    {user ? (
                        <div
                            onClick={handleProfileClick}
                            className={`collapseProfileLink ${isCollapsed ? 'collapsed' : ''}`}
                            style={{ display: "flex", alignItems: "center", cursor: 'pointer' }}
                        >
                            <div className="customerCardUserCircle">
                                <img className="customerCardUserPicture" src="/user.png" alt="User Profile" />
                            </div>
                            {isCollapsed && (
                                <p style={{ marginLeft: "10px", color: "black", fontWeight: "bold" }}>
                                    {user.fname} {user.lname}
                                </p>
                            )}
                        </div>
                    ) : (
                        <Link to="/login">
                            <p className="collapseLink">Login</p>
                        </Link>
                    )}
                </div>
            </div>

            <div className="linkContainer">
                <Link to="/sell">
                    <button className="link formLink">Sell</button>
                </Link>
                <Link to="/rent">
                    <button  id="rent-button" className="link formLink">Rent</button>
                </Link>
                {user ? (
                    <div onClick={handleProfileClick} className="customerCardUserCircle" style={{ cursor: 'pointer' }}>
                        <img className="customerCardUserPicture" src="/user.png" alt="User Picture" />
                    </div>
                ) : (
                    <Link to="/login">
                        <button className="link loginLink">Login</button>
                    </Link>
                )}
            </div>

            <button className="sideMenu" onClick={toggleNavbar}>
                <img className="sideMenuImg" src="/sideMenu.png" alt="Menu" />
            </button>
        </nav>
    );
}

export default Navbar;
