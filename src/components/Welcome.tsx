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
                <div className="subtitle">Selamat datang,</div>
                <div className="title">{name}</div>
            </div>
        </div>
    )
}