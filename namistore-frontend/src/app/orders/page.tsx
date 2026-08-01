import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OrdersPage from "@/components/orders/OrdersPage";

export default function Orders() {
  return (
    <>
      <Navbar />
      <OrdersPage />
      <Footer />
    </>
  );
}