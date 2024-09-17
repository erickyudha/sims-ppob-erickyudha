import { useEffect } from "react";
import { RootState } from "../app/store";
import { fetchProfile, selectToken, selectUser } from "../app/userSlice";
import defaultPic from "../assets/images/Profile Photo.png";
import "./Welcome.scss";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export default function Welcome() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const token = useAppSelector(selectToken);

    useEffect(() => {
        if (token && !user) {
            dispatch(fetchProfile(token));
        }
    }, [token, user, dispatch]);

    const picUrl = user?.profileImage || defaultPic;
    const name = user ? `${user.firstName} ${user.lastName}` : "Default User Name";

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = defaultPic;
    };

    return (
        <div className="welcome-profile">
            <img src={picUrl} alt="profile picture" onError={handleImageError} />
            <div className="welcome-text">
                <div className="subtitle">Selamat datang,</div>
                <div className="title">{name}</div>
            </div>
        </div>
    );
}
