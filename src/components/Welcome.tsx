import { useState } from "react"
import defaultPic from "../assets/images/Profile Photo.png";
import "./Welcome.scss";

export default function Welcome() {
    const [picUrl, setPicUrl] = useState("");
    const [name, setName] = useState("Erick Yudha Pratama");

    // Fetch profile

    return (
        <div className="welcome-profile">
            <img src={picUrl || defaultPic} alt="profile picture" />
            <div className="welcome-text">
                <div>Selamat datang,</div>
                <div className="welcome-name">{name}</div>
            </div>
        </div>
    )
}