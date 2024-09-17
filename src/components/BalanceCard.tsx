import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./BalanceCard.scss";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import { fetchBalance, selectBalance } from "../app/transactionSlice";
import { selectToken } from "../app/userSlice";

export default function BalanceCard() {
    const [balanceHidden, setBalanceHidden] = useState(true);
    const dispatch = useAppDispatch();
    const balance = useAppSelector(selectBalance);
    const token = useAppSelector(selectToken);

    useEffect(() => {
        if (token) {
            dispatch(fetchBalance(token));
        }
    }, [dispatch, token]);

    const formatToIDR = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    };

    return (
        <div className="balance-card">
            <div className="subtitle white">Saldo anda</div>
            <div className="title white">Rp <span>{balanceHidden ? "●●●●●●●" : `${formatToIDR(balance || 0)},-`}</span></div>
            <button onClick={() => setBalanceHidden(!balanceHidden)} className="hide-balance-btn subtitle white">
                <span>{balanceHidden ? "Lihat" : "Sembunyikan"} Saldo</span>
                <FontAwesomeIcon icon={balanceHidden ? faEye : faEyeSlash} />
            </button>
        </div>
    )
}