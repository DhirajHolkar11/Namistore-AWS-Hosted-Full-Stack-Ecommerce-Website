import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import "@/admin/styles/AdminDashboard.css"


function Admin(){


    return(
        

        <>
        <Navbar/>

        <div className="admin-dashboard">

        <h1>Admin Dashboard</h1>

        <div className="admin-links">

        <Link href="/admin/create-category">
            Create Category
        </Link>

        <Link href="/admin/products">
            Manage Products
        </Link>

        <Link href="/admin/create-product">
            Create Product
        </Link>

        </div>

        </div>
        <Footer/>
        </>
        
    )
}




export default Admin;