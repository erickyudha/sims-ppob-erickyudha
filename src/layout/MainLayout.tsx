import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Welcome from "../components/Welcome";
import BalanceCard from "../components/BalanceCard";
import "./MainLayout.scss";

interface MainLayoutProps {
    children?: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="main-layout">
            <Navbar />
            <div className="main-content">
                <div className="profile-dashboard">
                    <Welcome />
                    <BalanceCard />
                </div>
                {children}
            </div>
        </div>
    )
}