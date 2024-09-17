import { useState } from "react";
import InputBox from "../components/InputBox";
import MainLayout from "../layout/MainLayout";
import "./Topup.scss";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectToken } from "../app/userSlice";
import { selectTransactionStatus, topUp } from "../app/transactionSlice";
import ModalMessage from "../components/ModalMessage";
import { useNavigate } from "react-router-dom";
import ModalLoading from "../components/ModalLoading";

export default function Topup() {
    const topupPreset = [10000, 20000, 50000, 100000, 250000, 500000];
    const [amount, setAmount] = useState(0);
    const [success, setSuccess] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectToken);
    const navigate = useNavigate();
    const status = useAppSelector(selectTransactionStatus);

    function formatToRupiah(amount: number) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    }
    

    const handleTopup = () => {
        if (token && isAmountValid(amount)) {
            dispatch(topUp({ token, amount }))
                .unwrap()
                .then(() => {
                    setSuccess(true);
                })
                .catch((err) => {
                    console.error('Topup failed:', err);
                });
        }
    };

    const isAmountValid = (amount: number) => {
        return amount >= 10000 && amount <= 1000000;
    };

    const isDisabled = !isAmountValid(amount);

    return (
        <MainLayout>
            <section id="topup">
                {
                    success ?
                    <ModalMessage
                        type="success"
                        line1="Top up sebesar"
                        line2={formatToRupiah(amount)}
                        line3="Berhasil"
                        proceedText="Kembali ke Beranda"
                        onproceed={() => navigate("/")}
                    /> : ""
                }
                {
                    confirm ?
                    <ModalMessage
                        type="confirm"
                        line1="Anda yakin untuk Top Up sebesar"
                        line2={`${formatToRupiah(amount)} ?`}
                        proceedText="Ya, lanjutkan Top Up"
                        cancelText="Batalkan"
                        onproceed={() => {setConfirm(false); handleTopup();}}
                        oncancel={() => setConfirm(false)}
                    /> : ""
                }
                {
                    status === "failed" ?
                    <ModalMessage
                        type="failed"
                        line1="Top up sebesar"
                        line2={formatToRupiah(amount)}
                        line3="Gagal"
                        proceedText="Kembali ke Beranda"
                        onproceed={() => navigate("/")}
                    /> : ""
                }
                {status === "loading" ? <ModalLoading /> : ""}
                <div>
                    <div className="subtitle">Silahkan masukkan</div>
                    <div className="title">Nominal Top Up</div>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); handleTopup(); }}>
                    <div className="left">
                        <InputBox
                            name="amount"
                            type="number"
                            value={amount}
                            onchange={e => setAmount(parseInt(e.target.value))}
                            logo={faMoneyBill}
                            placeholder="Masukkan nominal top up anda"
                        />
                        <div className="topup-presets">
                            {topupPreset.map((preset) => (
                                <button key={preset} type="button" onClick={() => setAmount(preset)}>
                                    {formatToRupiah(preset)}
                                </button>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => setConfirm(true)}
                            disabled={isDisabled}
                            aria-disabled={isDisabled}
                        >
                            Top Up
                        </button>
                    </div>
                    <div className="right">
                        <div className="topup-presets">
                            {topupPreset.map((preset) => (
                                <button key={preset} type="button" onClick={() => setAmount(preset)}>
                                    {formatToRupiah(preset)}
                                </button>
                            ))}
                        </div>
                    </div>
                </form>
            </section>
        </MainLayout>
    );
}
