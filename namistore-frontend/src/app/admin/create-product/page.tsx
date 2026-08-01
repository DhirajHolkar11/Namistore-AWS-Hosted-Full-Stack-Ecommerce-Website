import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import CreateProductPage
from "@/admin/components/CreateProductPage";

export default function Page() {

    return (
        <>
            <Navbar />

            <CreateProductPage />

            <Footer />
        </>
    );
}