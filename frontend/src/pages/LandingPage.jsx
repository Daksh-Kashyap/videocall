
import "../App.css"
import mobileImg from "../assets/mobile (1).png";
import { Link } from "react-router-dom";
export default function LandingPage() {
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>Apna Video Call</h2>
        </div>
        <div className="navlist">
          <p>Join as Guest</p>
          <p>Register</p>
          <div role="button">Login</div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: "magenta" }}>Connect </span>with your loved
            ones
          </h1>
          <p>Cover a distance by Apna Video Call</p>
          <div role='button'>
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>
        <div>
          <img src={mobileImg} alt="mobile image" />
        </div>
      </div>
    </div>
  );
}
