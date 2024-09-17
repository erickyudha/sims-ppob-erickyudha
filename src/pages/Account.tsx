import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../components/Navbar";
import { faAt, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import InputBox from "../components/InputBox";
import { useState, useEffect } from "react";
import "./Account.scss";
import mockAvatar from "../assets/images/Profile Photo.png";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateProfileData, uploadProfilePicture, selectToken, selectUser, selectStatus, logout } from "../app/userSlice";
import ModalMessage from "../components/ModalMessage";
import { useNavigate } from "react-router-dom";
import ModalLoading from "../components/ModalLoading";

export default function Account() {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectToken);
    const user = useAppSelector(selectUser);
    const status = useAppSelector(selectStatus);
    const navigate = useNavigate();

    const [email, setEmail] = useState(user?.email || "");
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [errors, setErrors] = useState({
        email: "",
        firstName: "",
        lastName: "",
        profilePic: "",
    });
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
    }, [user]);

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: keyof typeof errors) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
        };
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file && file.size > 100 * 1024) {
            setErrors((prevErrors) => ({ ...prevErrors, profilePic: "Ukuran file maksimal 100KB" }));
            setProfilePic(null);
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, profilePic: "" }));
            setProfilePic(file);
        }
    };

    const handleSave = async () => {
        const newErrors = {
            email: email ? "" : "Email masih kosong",
            firstName: firstName ? "" : "Nama depan masih kosong",
            lastName: lastName ? "" : "Nama belakang masih kosong",
            profilePic: errors.profilePic,
        };

        setErrors(newErrors);

        const valid = Object.values(newErrors).every(error => error === "");

        if (valid && token) {
            dispatch(updateProfileData({ token, firstName, lastName }))
                .unwrap()
                .then(() => {
                    if (profilePic) {
                        dispatch(uploadProfilePicture({ token, file: profilePic }))
                            .unwrap()
                            .then(() => {
                                setSuccess(true);
                            })
                            .catch(err => {
                                console.error(err);
                            });
                    } else {
                        setSuccess(true);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    };

    return (
        <div>
            <Navbar />
            <section id="account">
                {
                    success ?
                        <ModalMessage
                            type="success"
                            line1="Update profil berhasil"
                            proceedText="Kembali ke Beranda"
                            onproceed={() => navigate("/")}
                        /> : ""
                }
                {
                    status === "failed" ?
                        <ModalMessage
                            type="failed"
                            line1="Update profil gagal"
                            proceedText="Kembali ke Beranda"
                            onproceed={() => navigate("/")}
                        /> : ""
                }
                {status === "loading" ? <ModalLoading /> : ""}
                <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
                    <div className="avatar-edit">
                        <div className="avatar-input">
                            <input
                                id="avatar"
                                type="file"
                                name="avatar"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="avatar">
                                <FontAwesomeIcon icon={faPen} />
                            </label>
                        </div>
                        <img src={profilePic ? URL.createObjectURL(profilePic) : user?.profileImage} alt="profile picture" onError={e => e.currentTarget.src = mockAvatar} />
                    </div>
                    {errors.profilePic && <div className="error">{errors.profilePic}</div>}
                    <div className="title">{`${user?.firstName} ${user?.lastName}`}</div>
                    <div className="input-row">
                        <label htmlFor="email">Email</label>
                        <InputBox
                            name="email"
                            type="email"
                            placeholder="masukkan email anda"
                            value={email}
                            onchange={handleInputChange(setEmail, "email")}
                            logo={faAt}
                            error={errors.email}
                        />
                    </div>
                    <div className="input-row">
                        <label htmlFor="firstName">Nama Depan</label>
                        <InputBox
                            name="firstName"
                            type="text"
                            placeholder="nama depan"
                            value={firstName}
                            onchange={handleInputChange(setFirstName, "firstName")}
                            logo={faUser}
                            error={errors.firstName}
                        />
                    </div>
                    <div className="input-row">
                        <label htmlFor="lastName">Nama Belakang</label>
                        <InputBox
                            name="lastName"
                            type="text"
                            placeholder="nama belakang"
                            value={lastName}
                            onchange={handleInputChange(setLastName, "lastName")}
                            logo={faUser}
                            error={errors.lastName}
                        />
                    </div>
                    <button type="submit">Simpan</button>
                    <button className="logout-btn" onClick={() => dispatch(logout())}>Logout</button>
                </form>
            </section>
        </div>
    );
}
