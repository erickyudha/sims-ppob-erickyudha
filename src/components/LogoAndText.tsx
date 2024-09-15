import logo  from "../assets/images/Logo.png";
import "./LogoAndText.scss";

export default function LogoAndText()
{
    return (
        <div className="logo-text">
            <img draggable={false} src={logo} alt="logo sims ppob" />
            <span>SIMS PPOB</span>
        </div>
    )
}