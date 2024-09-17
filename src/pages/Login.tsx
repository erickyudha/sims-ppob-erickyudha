import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import InputBox from "../components/InputBox";
import LogoAndText from "../components/LogoAndText";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import AuthLayout from "../layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { fetchProfile, login } from "../app/userSlice";
import ModalLoading from "../components/ModalLoading";
import { selectStatus, selectError } from "../app/userSlice";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const status = useAppSelector(selectStatus);
    const error = useAppSelector(selectError);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ email, password }))
            .unwrap()
            .then((result) => {
                dispatch(fetchProfile(result.data.token))
                .unwrap()
                .then(() => {
                    navigate('/dashboard');
                }) 
                
            })
            .catch((err) => {
                console.error('Login failed:', err);
            });
    };

    return (
        <AuthLayout>
            <main className="auth-container">
                <LogoAndText />
                <h2>Masuk atau buat akun untuk memulai</h2>
                {status === 'loading' && <ModalLoading />}
                {status === 'failed' && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <InputBox name="email" type="email" placeholder="masukkan email anda" value={email} onchange={(e) => setEmail(e.target.value)} logo={faAt} />
                    <InputBox name="password" type="password" placeholder="masukkan password anda" value={password} onchange={(e) => setPassword(e.target.value)} logo={faLock} />
                    <button type="submit">Masuk</button>
                </form>
                <p>sudah punya akun? register <Link to="/register">di sini</Link></p>
            </main>
        </AuthLayout>
    );
}
