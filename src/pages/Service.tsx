import MainLayout from "../layout/MainLayout";
import mockServiceLogo from "../assets/images/Listrik.png";
import InputBox from "../components/InputBox";
import { useEffect, useState } from "react";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import "./Service.scss";
import ModalLoading from "../components/ModalLoading";
import ModalMessage from "../components/ModalMessage";
import { createNewTransaction, selectTransactionStatus } from "../app/transactionSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { selectToken } from "../app/userSlice";
import { selectSelectedService } from "../app/informationSlice";

export default function Service() {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectToken);
    const navigate = useNavigate();
    const status = useAppSelector(selectTransactionStatus);
    const selectedService = useAppSelector(selectSelectedService)
    const [success, setSuccess] = useState(false);
    const [confirm, setConfirm] = useState(false);

    function formatToRupiah(amount: number) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    }

    const handleTransaction = () => {
        if (token && selectedService) {
            dispatch(createNewTransaction({ token, serviceCode: selectedService.service_code }))
                .unwrap()
                .then(() => {
                    setSuccess(true);
                })
                .catch((err) => {
                    console.error('Transaction failed:', err);
                });
        }
    };

    useEffect(() => {
        if (!selectedService) {
            navigate("/");
        }
    }, [dispatch])

    return (
        <MainLayout>
            <section id="service">
            {
                    success ?
                    <ModalMessage
                        type="success"
                        line1={`Pembayaran ${selectedService?.service_name} sebesar`}
                        line2={formatToRupiah(selectedService?.service_tariff || 0)}
                        line3="Berhasil"
                        proceedText="Kembali ke Beranda"
                        onproceed={() => navigate("/")}
                    /> : ""
                }
                {
                    confirm ?
                    <ModalMessage
                        type="confirm"
                        line1={`Beli ${selectedService?.service_name} senilai`}
                        line2={`${formatToRupiah(selectedService?.service_tariff || 0)} ?`}
                        proceedText="Ya, lanjutkan Bayar"
                        cancelText="Batalkan"
                        onproceed={() => {setConfirm(false); handleTransaction();}}
                        oncancel={() => setConfirm(false)}
                    /> : ""
                }
                {
                    status === "failed" ?
                    <ModalMessage
                        type="failed"
                        line1={`Pembayaran ${selectedService?.service_name} sebesar`}
                        line2={formatToRupiah(selectedService?.service_tariff || 0)}
                        line3="Gagal"
                        proceedText="Kembali ke Beranda"
                        onproceed={() => navigate("/")}
                    /> : ""
                }
                {status === "loading" ? <ModalLoading /> : ""}
                <div className="subtitle">Pembayaran</div>
                <div className="payment-type">
                    <img src={selectedService?.service_icon || mockServiceLogo} alt="pelayanan" />
                    <span>{selectedService?.service_name}</span>
                </div>
                <form action="" onSubmit={(e) => e.preventDefault()}>
                    <InputBox name="payment" type="number" value={selectedService?.service_tariff || 0} onchange={() => {}}  logo={faMoneyBill} disabled={true} />
                    <button onClick={() => setConfirm(true)}>Bayar</button>
                </form>
            </section>
        </MainLayout>
    )
}