import { useState } from "react";
import InputBox from "../components/InputBox";
import LogoAndText from "../components/LogoAndText";
import AuthLayout from "../layout/AuthLayout";
import { faAt, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <AuthLayout>
            <div className="auth-container">
                <LogoAndText />
                <h2>Lengkapi data untuk membuat akun</h2>
                <form action="" onSubmit={(e) => e.preventDefault()}>
                    <InputBox name="email" type="email" placeholder="masukkan email anda" value={email} onchange={(e) => setEmail(e.target.value)} logo={faAt} />
                    <InputBox name="firstName" type="text" placeholder="nama depan" value={firstName} onchange={(e) => setFirstName(e.target.value)} logo={faUser} />
                    <InputBox name="lastName" type="text" placeholder="nama belakang" value={lastName} onchange={(e) => setLastName(e.target.value)} logo={faUser} />
                    <InputBox name="password" type="password" placeholder="buat password" value={password} onchange={(e) => setPassword(e.target.value)} logo={faLock} />
                    <InputBox name="confirmPassword" type="password" placeholder="konfirmasi password" value={confirmPassword} onchange={(e) => setConfirmPassword(e.target.value)} logo={faLock} />
                    <button>Masuk</button>
                </form>
                <p>sudah punya akun? login <a href="/login">di sini</a></p>
            </div>
        </AuthLayout>
    )
}