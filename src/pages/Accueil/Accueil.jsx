import Navbar from "../../components/navbar/Navbar.jsx";
import "./Accueil.css";
import Display from "../../components/homePageDisplay/Display.jsx";

// kristina
function Accueil() {

    return (
        <div className={"container"}>
            <Navbar />
            <div className={"sloganBackground"}>
                <h1 className={"sloganText"}>Find your ideal property in Montreal or Laval with HomeBreeze</h1>
                <div className={"searchContainer"}>

                </div>
            </div>
            <Display/>

        </div>
    )
}
export default Accueil;