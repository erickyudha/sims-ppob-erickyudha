import Promotions from "../components/Promotions";
import Services from "../components/Services";
import MainLayout from "../layout/MainLayout";

export default function Home() {
    return (
        <MainLayout>
            <Services />
            <Promotions />
        </MainLayout>
    )
}