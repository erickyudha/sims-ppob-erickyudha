import { ReactNode } from "react";
import "./AuthLayout.scss";

interface AuthLoginProps {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLoginProps) {
    return (
        <div className="auth-layout">
            <div className="auth-left">
                {children}
            </div>
            <div className="auth-right" />
        </div>
    )
}