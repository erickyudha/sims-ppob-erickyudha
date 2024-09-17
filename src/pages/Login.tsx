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
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const status = useAppSelector(selectStatus);
    const error = useAppSelector(selectError);

    const validateInputs = () => {
        let valid = true;

        if (!email) {
            setEmailError("Email tidak boleh kosong");
            valid = false;
        } else {
            setEmailError("");
        }

        if (!password) {
            setPasswordError("Password tidak boleh kosong");
            valid = false;
        } else {
            setPasswordError("");
        }

        return valid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateInputs()) return;

        dispatch(login({ email, password }))
            .unwrap()
            .then((result) => {
                dispatch(fetchProfile(result.data.token))
                    .unwrap()
                    .then(() => {
                        navigate('/dashboard');
                    });
            })
            .catch((err) => {
                console.error('Login failed:', err);
            });
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, setError: React.Dispatch<React.SetStateAction<string>>) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
            setError("");
        };
    };

    return (
        <AuthLayout>
            <main className="auth-container">
                <LogoAndText />
                <h2>Masuk atau buat akun untuk memulai</h2>
                {status === 'loading' && <ModalLoading />}
                {status === 'failed' && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <InputBox
                        name="email"
                        type="email"
                        placeholder="masukkan email anda"
                        value={email}
                        onchange={handleInputChange(setEmail, setEmailError)}
                        logo={faAt}
                        error={emailError}
                    />
                    <InputBox
                        name="password"
                        type="password"
                        placeholder="masukkan password anda"
                        value={password}
                        onchange={handleInputChange(setPassword, setPasswordError)}
                        logo={faLock}
                        error={passwordError}
                    />
                    <button type="submit">Masuk</button>
                </form>
                <p>sudah punya akun? register <Link to="/register">di sini</Link></p>
            </main>
        </AuthLayout>
    );
}
