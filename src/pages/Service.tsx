import MainLayout from "../layout/MainLayout";
import mockServiceLogo from "../assets/images/Listrik.png";
import InputBox from "../components/InputBox";
import { useState } from "react";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import "./Service.scss";
import ModalOverlay from "../components/ModalOverlay";
import ModalLoading from "../components/ModalLoading";
import ModalMessage from "../components/ModalMessage";

export default function Service() {
    const [payment, setPayment] = useState(20000);
    return (
        <MainLayout>
            <section id="service">
                <div className="subtitle">Pembayaran</div>
                <div className="payment-type">
                    <img src={mockServiceLogo} alt="pelayanan" />
                    <span>Listrik Prabayar</span>
                </div>
                <form action="" onSubmit={(e) => e.preventDefault()}>
                    <InputBox name="payment" type="number" value={payment} onchange={(e) => setPayment(parseInt(e.target.value))} logo={faMoneyBill} disabled={true} />
                    <button>Bayar</button>
                </form>
            </section>

            {/* <ModalMessage 
                type="failed"
                line1="Beli listrik prabayar senilai"
                line2="Rp10.000 ?"
                onproceed={() => {}}
            /> */}
        </MainLayout>
    )
}