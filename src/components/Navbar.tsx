import LogoAndText from "./LogoAndText";
import "./Navbar.scss";

export default function Navbar() {
    return (
        <nav>
            <LogoAndText />
            <div className="nav-group">
                <a href="/topup">Top Up</a>
                <a href="/transaction">Transaction</a>
                <a href="/account">Akun</a>
            </div>
        </nav>
    )
}