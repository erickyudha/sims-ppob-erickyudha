import TransactionCard from "../components/TransactionCard";
import MainLayout from "../layout/MainLayout";
import "./Transaction.scss";

export default function Transaction() {
    return (
        <MainLayout>
            <section id="transaction">
                <div className="subtitle bold black">Semua Transaksi</div>
                <div className="transaction-list">
                    <TransactionCard
                        type="TOPUP"
                        description="test test test"
                        amount={99999}
                        date="2023-08-17T11:10:10.000Z" 
                    />
                    <TransactionCard
                        type="PAYMENT"
                        description="test test test"
                        amount={99999}
                        date="2023-08-17T11:10:10.000Z" 
                    />
                </div>
            </section>
        </MainLayout>
    )
}