import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import InputBox from "../components/InputBox";
import LogoAndText from "../components/LogoAndText";
import AuthLayout from "../layout/AuthLayout";
import { faAt, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import ModalLoading from "../components/ModalLoading";
import { register } from "../app/userSlice";
import ModalMessage from "../components/ModalMessage";

export default function Register() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: ""
    });

    const [complete, setComplete] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { status, error } = useAppSelector((state: RootState) => state.user);

    const handleValidation = () => {
        const newErrors = {
            email: email ? "" : "Email masih kosong",
            firstName: firstName ? "" : "Nama depan masih kosong",
            lastName: lastName ? "" : "Nama belakang masih kosong",
            password: password ? "" : "Password masih kosong",
            confirmPassword: confirmPassword ? "" : "Konfirmasi password masih kosong"
        };

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Password tidak sama";
        }

        setErrors(newErrors);

        return Object.values(newErrors).every(error => error === "");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (handleValidation()) {
            dispatch(register({ email, firstName, lastName, password }))
                .unwrap()
                .then((result) => {
                    setComplete(true);
                })
                .catch((err) => {
                    console.error('Registration failed:', err);
                });
        }
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: keyof typeof errors) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
        };
    };

    return (
        <AuthLayout>
            <main className="auth-container">
                <LogoAndText />
                <h2>Lengkapi data untuk membuat akun</h2>
                {status === 'loading' && <ModalLoading />}
                {status === 'failed' && <p className="error">{error}</p>}
                {complete ?
                    <ModalMessage
                        type="success"
                        line1="Registrasi akun anda"
                        line2="Sukses"
                        proceedText="Lanjut ke login"
                        onproceed={() => { navigate("/login") }}
                    /> : ""
                }
                <form onSubmit={handleSubmit}>
                    <InputBox
                        name="email"
                        type="email"
                        placeholder="masukkan email anda"
                        value={email}
                        onchange={handleInputChange(setEmail, "email")}
                        logo={faAt}
                        error={errors.email}
                    />
                    <InputBox
                        name="firstName"
                        type="text"
                        placeholder="nama depan"
                        value={firstName}
                        onchange={handleInputChange(setFirstName, "firstName")}
                        logo={faUser}
                        error={errors.firstName}
                    />
                    <InputBox
                        name="lastName"
                        type="text"
                        placeholder="nama belakang"
                        value={lastName}
                        onchange={handleInputChange(setLastName, "lastName")}
                        logo={faUser}
                        error={errors.lastName}
                    />
                    <InputBox
                        name="password"
                        type="password"
                        placeholder="buat password"
                        value={password}
                        onchange={handleInputChange(setPassword, "password")}
                        logo={faLock}
                        error={errors.password}
                    />
                    <InputBox
                        name="confirmPassword"
                        type="password"
                        placeholder="konfirmasi password"
                        value={confirmPassword}
                        onchange={handleInputChange(setConfirmPassword, "confirmPassword")}
                        logo={faLock}
                        error={errors.confirmPassword}
                    />
                    <button type="submit">Daftar</button>
                </form>
                <p>sudah punya akun? login <Link to="/login">di sini</Link></p>
            </main>
        </AuthLayout>
    );
}
