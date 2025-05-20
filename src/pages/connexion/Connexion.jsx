import './Connexion.css';
import Navbar from "../../components/navbar/Navbar.jsx";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


// kristina
function Connexion() {

    
    const VITE_API_URL = import.meta.env.VITE_API_URL || ""
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            const res = await fetch(`${VITE_API_URL}/api/Auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('userId', data.idUser);
                if (data.role === "admin") navigate("/adminProfile");
                else if (data.role === "agent") navigate("/agentProfileCustomerRequests");
                else navigate("/customerProfileFavorites");
            } else {
                alert(data);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Could not login");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const fname = e.target[0].value;
        const lname = e.target[1].value;
        const email = e.target[2].value;
        const phone = e.target[3].value;
        const password = e.target[4].value;

        try {
            const res = await fetch(`${VITE_API_URL}/api/Auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fname, lname, email, phone, password }),
            });

            if (res.ok) {
                const loginRes = await fetch(`${VITE_API_URL}/api/Auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const loginData = await loginRes.json();

                if (loginRes.ok) {
                    localStorage.setItem('user', JSON.stringify(loginData));
                    localStorage.setItem('userId', loginData.idUser);
                    navigate("/customerProfileFavorites");
                } else {
                    alert("Registration succeeded, but login failed.");
                }
            } else {
                const errorText = await res.text();
                alert(errorText);
            }
        } catch (error) {
            console.error("Register error:", error);
            alert("Could not register");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="connectionBackground">
                <div className={`connectionContainer ${isActive ? 'active' : ''}`}>
                    <div className="formBox login">
                        <form className="formWidth" onSubmit={handleLogin}>
                            <h1 className="connectionTitle">Sign in</h1>
                            <div className="connectionInputBox">
                                <input type="text" placeholder="Email" className="connectionInput" />
                            </div>
                            <div className="connectionInputBox">
                                <input type="password" placeholder="Password" className="connectionInput" />
                            </div>
                            <button type="submit"  className="connectionSubmitButton">Login</button>
                        </form>
                    </div>

                    <div className="formBox register">
                        <form className="formWidth" onSubmit={handleRegister}>
                            <h1 className="connectionTitle">Register</h1>
                            <div className="connectionInputBox">
                                <input type="text" placeholder="First name"  name="fname" className="connectionInput" required />
                            </div>
                            <div className="connectionInputBox">
                                <input type="text" placeholder="Last name" name="lname"  className="connectionInput" required />
                            </div>
                            <div className="connectionInputBox">
                                <input type="email" placeholder="Email"   name="email" className="connectionInput" required />
                            </div>
                            <div className="connectionInputBox">
                                <input type="text" placeholder="Phone"  name="phone" className="connectionInput" required />
                            </div>
                            <div className="connectionInputBox">
                                <input type="password" placeholder="Password"  name="password"  className="connectionInput" required />
                            </div>
                            <button type="submit"  id="submit-register" className="connectionSubmitButton">Register</button>
                        </form>
                    </div>

                    <div className="toggleBox">
                        <div className="togglePanel toggleLeft">
                            <h1 className="toggleTitle">Hello, Welcome</h1>
                            <p className="toggleText">Don&#39;t have an account?</p>
                            <button className="registerToggleButton" id="register-toggle" onClick={handleRegisterClick}>Register</button>
                        </div>
                        <div className="togglePanel toggleRight">
                            <h1 className="toggleTitle">Welcome back</h1>
                            <p className="toggleText">Already have an account?</p>
                            <button className="loginToggleButton" onClick={handleLoginClick}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Connexion;
