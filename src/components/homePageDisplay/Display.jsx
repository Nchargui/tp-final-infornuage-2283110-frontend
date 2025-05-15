import React from 'react';
import './Display.css';
import {Link} from "react-router-dom";


// kristina
function Display(props) {
    return (
        <div>

            <div className={"displayContainer blue1"}>
                <div className={"displayContent"}>
                    <p className={"displayTitle alignLeft"}>Create an account to make your search easier and
                        enjoyable</p>
                    <p className={"displayText alignLeft"}>You can save properties that catch your eye and instantly
                        contact
                        an agent.</p>
                    <Link to={"/login"} style={{display: "grid"}}>
                        <button className={"displayButton"}>Create account</button>
                    </Link>
                </div>
                <img className={"houseImg"} src={"house1.jpeg"}/>
            </div>
            <div className={"displayContainer displayContainerReverse blue2"}>
                <img className={"houseImg"} src={"house2.jpg"}/>
                <div className={"displayContent"}>
                    <p className={"displayTitle alignRight"}>Checkout all the different types of properties we offer</p>
                    <p className={"displayText alignRight"}>From houses to condos, you will surely find a property of
                        your
                        liking.</p>
                    <Link to={"/search"} style={{display: "grid"}}>
                        <button className={"displayButton rightButton"}>See more</button>
                    </Link>
                </div>
            </div>
            <div className={"displayContainer blue3"}>
                <div className={"displayContent"}>
                    <p className={"displayTitle alignLeft"}>You can put one of your own properties on the market</p>
                    <p className={"displayText alignLeft"}>Contact an agent today to sell or rent one of your own
                        properties</p>
                    <div className={"buttonContainer"}>

                        <div className={"buttonContainer"}>

                            <Link to={"/sell"} >
                                <button className={"displayButton"}>Sell your property</button>
                            </Link>

                            <Link to={"/rent"}>
                                <button className={"displayButton"}>Rent your property</button>
                            </ Link></div>

                    </div>
                </div>
                <img className={"houseImg"} src={"house3.jpg"}/>
            </div>
        </div>

    );
}

export default Display;