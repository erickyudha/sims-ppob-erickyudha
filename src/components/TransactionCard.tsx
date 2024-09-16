import "./TransactionCard.scss";

interface TransactionCardProps {
    type: string,
    description: string,
    amount: number,
    date: string
}

export default function TransactionCard({ type, description, amount, date }: TransactionCardProps) {
    const formatDate = (dateString: string) => {
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
        const date = new Date(dateString);
    
        const day = date.getUTCDate();
        const month = months[date.getUTCMonth()];
        const year = date.getUTCFullYear();
        
        // Get hours and minutes in WIB (UTC+7)
        const hours = String(date.getUTCHours() + 7).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    
        return `${day} ${month} ${year}  ${hours}:${minutes} WIB`;
    }

    function formatToRupiah(amount: number) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    }
    
    return (
        <div className="transaction-card">
            <div className="left">
                <div className={`title transaction-amount ${type === "TOPUP" ? "green" : "red"}`}>{`${type === "TOPUP" ? "+" : "-"}  ${formatToRupiah(amount)}`}</div>
                <div className="transaction-time">{formatDate(date)}</div>
            </div>
            <div className="right">
                <div className="transaction-type">{description}</div>
            </div>
        </div>
    )
}