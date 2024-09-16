import { useState } from "react";
import InputBox from "../components/InputBox";
import LogoAndText from "../components/LogoAndText";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import AuthLayout from "../layout/AuthLayout";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <AuthLayout>
            <main className="auth-container">
                <LogoAndText />
                <h2>Masuk atau buat akun untuk memulai</h2>
                <form action="" onSubmit={(e) => e.preventDefault()}>
                    <InputBox name="email" type="email" placeholder="masukkan email anda" value={email} onchange={(e) => setEmail(e.target.value)} logo={faAt} />
                    <InputBox name="password" type="password" placeholder="masukkan password anda" value={password} onchange={(e) => setPassword(e.target.value)} logo={faLock} />
                    <button>Masuk</button>
                </form>
                <p>sudah punya akun? register <a href="/register">di sini</a></p>
            </main>
        </AuthLayout>
    )
}