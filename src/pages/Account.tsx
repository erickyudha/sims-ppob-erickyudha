import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../components/Navbar";
import { faAt, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import InputBox from "../components/InputBox";
import { useState } from "react";
import "./Account.scss";
import mockAvatar from "../assets/images/Profile Photo.png";

export default function Account() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    
    return (
        <div>
            <Navbar />
            <section id="account">
                <form onSubmit={e => e.preventDefault()}>
                    <div className="avatar-edit">
                        <div className="avatar-input">
                            <input id="avatar" type="file" name="avatar" accept="image/png, image/jpeg, image/jpg" />
                            <label htmlFor="avatar">
                                <FontAwesomeIcon icon={faPen} />
                            </label>
                        </div>
                        <img src={mockAvatar} alt="profile picture" />
                    </div>
                    <div className="title">Erick Yudha Pratama</div>
                    <div className="input-row">
                        <label htmlFor="email">Email</label>
                        <InputBox name="email" type="email" placeholder="masukkan email anda" value={email} onchange={(e) => setEmail(e.target.value)} logo={faAt} />
                    </div>
                    <div className="input-row">
                        <label htmlFor="firstName">Nama Depan</label>
                        <InputBox name="firstName" type="text" placeholder="nama depan" value={firstName} onchange={(e) => setFirstName(e.target.value)} logo={faUser} />
                    </div>
                    <div className="input-row">
                        <label htmlFor="lastName">Nama Belakang</label>
                        <InputBox name="lastName" type="text" placeholder="nama belakang" value={lastName} onchange={(e) => setLastName(e.target.value)} logo={faUser} />
                    </div>
                    <button>Simpan</button>
                </form>

            </section>
        </div>
    )
}