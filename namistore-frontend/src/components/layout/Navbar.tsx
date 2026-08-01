import Link from "next/link";
import "@/styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>NamiStore</h2>
      </div>

      <ul className="navbar-links">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/products">Products</Link></li>
        <li><Link href="/cart">Cart</Link></li>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/register">Register</Link></li>
        <li><Link href="/profile">Profile</Link></li>
        <li><Link href="/wishlist">Wishlist</Link></li>
        <li><Link href="/aboutus">About us</Link></li>
        <li><Link href="/contact">Contact us</Link></li>
        <li><Link href="/orders">Orders</Link></li>
        <li><Link href="/admin">Admin</Link></li>
        
      </ul>
    </nav>
  );
}