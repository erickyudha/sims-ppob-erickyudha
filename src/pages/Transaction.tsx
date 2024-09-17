import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectToken } from "../app/userSlice";
import TransactionCard from "../components/TransactionCard";
import MainLayout from "../layout/MainLayout";
import "./Transaction.scss";
import { fetchTransactionHistory, selectTransactions, selectTransactionStatus } from "../app/transactionSlice";
import { useEffect, useRef, useState } from "react";

export default function Transaction() {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectToken);
    const navigate = useNavigate();
    const status = useAppSelector(selectTransactionStatus);
    const transactions = useAppSelector(selectTransactions);

    const [showAll, setShowAll] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState('auto');

    useEffect(() => {
        if (token) {
            dispatch(fetchTransactionHistory({ token, limit: 256 }));
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(`${contentRef.current.scrollHeight}px`);
        }
    }, [showAll, transactions]);

    const displayedTransactions = showAll ? transactions : transactions.slice(0, 5);

    const handleToggleShowAll = () => {
        setShowAll(!showAll);
        if (contentRef.current) {
            setHeight(`${contentRef.current.scrollHeight}px`);
        }
    };

    return (
        <MainLayout>
            <section id="transaction">
                <div className="subtitle bold black">Semua Transaksi</div>
                <div className="transaction-list" style={{ height, transition: 'height 0.3s ease' }}>
                    <div className="transaction-container" ref={contentRef}>
                        {displayedTransactions.map((transaction) => (
                            <TransactionCard
                                key={transaction.id} // Assuming transaction has an 'id' field
                                type={transaction.transaction_type}
                                description={transaction.description}
                                amount={transaction.total_amount}
                                date={transaction.created_on}
                            />
                        ))}
                    </div>
                    {transactions.length > 5 && (
                        <button onClick={handleToggleShowAll}>
                            {showAll ? "Show less" : "Show more"}
                        </button>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
