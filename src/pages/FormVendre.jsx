import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";
import "./Form.css";

// kristina
function FormVendre() {
    const VITE_API_URL = import.meta.env.VITE_API_URL || ""
    const [started, setStarted] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [formData, setFormData] = useState({
        description: "",
        categorie: "",
        price: "",
        address: "",
        nbRooms: "",
        nbBathrooms: "",
        nbParkingSpace: "",
        nbGarages: "",
        area: "",
        constructionYear: "",
        city: "",
        images: [""],
        customerId: localStorage.getItem("userId") ? parseInt(localStorage.getItem("userId")) : null
    });

    const navigate = useNavigate();

    const handleStart = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            setShowLoginPopup(true);
        } else if (user.role === "customer") {
            setStarted(true);
        } else {
            setShowErrorPopup(true);
        }
    };

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    const handleCancel = () => {
        navigate("/");
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === "images") {
            const updatedImages = [...formData.images];
            updatedImages[index] = value;
            setFormData(prev => ({
                ...prev,
                images: updatedImages
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleAddImageInput = () => {
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ""]
        }));
    };

    const handleRemoveImageInput = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedFormData = {
            ...formData,
            customer: {
                idUser: parseInt(localStorage.getItem("userId")),
            }
        };

        try {
            const res = await fetch(`${VITE_API_URL}/PropertySale`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedFormData),
            });

            if (res.ok) {
                alert("Property submitted successfully!");
                navigate("/customerProfileFavorites");
            } else {
                alert("Failed to submit property.");
            }
        } catch (error) {
            console.error("Submit error:", error);
            alert("Error submitting form.");
        }
    };



    return (
        <div>
            <Navbar />
            {!started && (
                <div className="startPage">
                    <h1>Sell your property with HomeBreeze</h1>
                    <button className="startButton" onClick={handleStart}>Start</button>
                </div>
            )}
            {showLoginPopup && (
                <div className="popup">
                    <div className="popupContent">
                        <p>You must be logged in to sell a property.</p>
                        <button className="popupButton1" onClick={handleLoginRedirect}>Login</button>
                        <button className="popupButton2" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            )}
            {showErrorPopup && (
                <div className="popup">
                    <div className="popupContent">
                        <p>Only customers can sell a property.</p>
                        <button className="popupButton1" onClick={handleCancel}>Return to Home</button>
                    </div>
                </div>
            )}
            {started && (
                <form className="propertyForm" onSubmit={handleSubmit}>
                    <h1 className="propertyDetails">Property Details</h1>
                    <h3>Address</h3>
                    <input
                        name="address"
                        type="text"
                        className="inputColor"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                    <div className="sideBySide">
                        <div>
                            <h3>City</h3>
                            <div className="radioContainer">
                                <label className="radioText">
                                    <input
                                        name="city"
                                        type="radio"
                                        className="radio"
                                        value="Montreal"
                                        onChange={handleChange}
                                        required
                                    />
                                    Montreal
                                </label>
                                <label className="radioText">
                                    <input
                                        name="city"
                                        type="radio"
                                        className="radio"
                                        value="Laval"
                                        onChange={handleChange}
                                        required
                                    />
                                    Laval
                                </label>
                            </div>
                        </div>
                        <div>
                            <h3>Price</h3>
                            <input
                                name="price"
                                type="number"
                                min={0}
                                className="inputColor"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <h3>Category</h3>
                    <div className="radioContainer">
                        <label className="radioText">
                            <input
                                name="categorie"
                                type="radio"
                                className="radio"
                                value="House"
                                onChange={handleChange}
                                required
                            />
                            House
                        </label>
                        <label className="radioText">
                            <input
                                name="categorie"
                                type="radio"
                                className="radio"
                                value="Condo"
                                onChange={handleChange}
                                required
                            />
                            Condo
                        </label>
                        <label className="radioText">
                            <input
                                name="categorie"
                                type="radio"
                                className="radio"
                                value="Terrain"
                                onChange={handleChange}
                                required
                            />
                            Terrain
                        </label>

                        <label className="radioText">
                            <input
                                name="categorie"
                                type="radio"
                                className="radio"
                                value="Chalet"
                                onChange={handleChange}
                                required
                            />
                            Chalet
                        </label>
                    </div>
                    <h3>Description</h3>
                    <textarea
                        name="description"
                        className="inputColor descriptionTextarea"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <h3>Features</h3>
                    <div>
                    <input
                            name="nbRooms"
                            type="number"
                            min={0}
                            className="featuresInput inputColor"
                            placeholder="Number of Rooms"
                            value={formData.nbRooms}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="nbBathrooms"
                            type="number"
                            min={0}
                            className="featuresInput inputColor"
                            placeholder="Number of Bathrooms"
                            value={formData.nbBathrooms}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="nbParkingSpace"
                            type="number"
                            min={0}
                            className="featuresInput inputColor"
                            placeholder="Number of Parking"
                            value={formData.nbParkingSpace}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="nbGarages"
                            type="number"
                            min={0}
                            className="featuresInput inputColor"
                            placeholder="Number of Garages"
                            value={formData.nbGarages}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="sideBySide">
                        <div>
                            <h3>Area</h3>
                            <input
                                name="area"
                                type="number"
                                min={0}
                                className="inputColor"
                                placeholder="Area (sqft)"
                                value={formData.area}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <h3>Construction Year</h3>
                            <input
                                name="constructionYear"
                                type="number"
                                min={0}
                                className="inputColor"
                                placeholder="Construction Year"
                                value={formData.constructionYear}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="imagesSection">
                        <h3>Images</h3>
                        {formData.images.map((image, index) => (
                            <div key={index} className="imageInputContainer">
                                <input
                                    name="images"
                                    type="text"
                                    className="inputColor"
                                    placeholder="Image URL"
                                    value={image}
                                    onChange={(e) => handleChange(e, index)}
                                    required
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        className="removeImageButton"
                                        onClick={() => handleRemoveImageInput(index)}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        <button className="addImageButton" type="button" onClick={handleAddImageInput}>
                            Add Image
                        </button>
                    </div>
                    <button type="submit" className="submitButton">Submit</button>
                </form>
            )}
        </div>
    );
}

export default FormVendre;
