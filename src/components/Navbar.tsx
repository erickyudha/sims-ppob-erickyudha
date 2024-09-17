import { Link, useLocation } from "react-router-dom";
import LogoAndText from "./LogoAndText";
import "./Navbar.scss";

export default function Navbar() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <nav>
            <Link className="logo-btn" to="/"><LogoAndText /></Link>
            <div className="nav-group">
                <Link className={currentPath === "/topup" ? "active" : ""} to="/topup">Top Up</Link>
                <Link className={currentPath === "/transactions" ? "active" : ""} to="/transactions">Transactions</Link>
                <Link className={currentPath === "/account" ? "active" : ""} to="/account">Akun</Link>
            </div>
        </nav>
    );
}
