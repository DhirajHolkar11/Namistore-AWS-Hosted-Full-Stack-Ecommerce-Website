import Navbar
from "@/components/layout/Navbar";

import Footer
from "@/components/layout/Footer";

import CreateCategoryPage
from "@/admin/components/CreateCategoryPage";

export default function Page() {

    return (
        <>

            <Navbar />

            <CreateCategoryPage />

            <Footer />

        </>
    );
}