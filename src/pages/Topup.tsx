import { useState } from "react";
import InputBox from "../components/InputBox";
import MainLayout from "../layout/MainLayout";
import "./Topup.scss";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";

export default function Topup() {
    const topupPreset = [10000, 20000, 50000, 100000, 250000, 500000];
    const [topup, setTopup] = useState(0);

    function formatToRupiah(amount: number) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    }

    return (
        <MainLayout>
            <section id="topup">
                <div>
                    <div className="subtitle">Silahkan masukkan</div>
                    <div className="title">Nominal Top Up</div>
                </div>
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <div className="left">
                        <InputBox
                            name="topup"
                            type="number"
                            value={topup}
                            onchange={e => setTopup(parseInt(e.target.value))}
                            logo={faMoneyBill}
                        />
                        <div className="topup-presets">
                            {topupPreset.map((preset) => (
                                <button key={preset} type="button" onClick={() => setTopup(preset)}>
                                    {formatToRupiah(preset)}
                                </button>
                            ))}
                        </div>
                        <button>Top Up</button>
                    </div>
                    <div className="right">
                        <div className="topup-presets">
                            {topupPreset.map((preset) => (
                                <button key={preset} type="button" onClick={() => setTopup(preset)}>
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
