import "@/styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>CloudShop</h3>

          <p>
            Your one-stop destination for electronics,
            fashion, home essentials and more.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
            <li>Login</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer Service</h3>

          <ul>
            <li>Contact Us</li>
            <li>Shipping Policy</li>
            <li>Returns</li>
            <li>FAQs</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>

          <p>support@cloudshop.com</p>
          <p>+91 98765 43210</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 CloudShop. All Rights Reserved.
      </div>
    </footer>
  );
}