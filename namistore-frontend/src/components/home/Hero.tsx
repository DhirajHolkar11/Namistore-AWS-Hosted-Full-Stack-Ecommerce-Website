import "@/styles/Hero.css";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>Discover Amazing Products</h1>

        <p>
          Shop from thousands of products with fast delivery, secure
          payments, and unbeatable prices.
        </p>

        <button className="shop-btn">
          Shop Now
        </button>
      </div>

      <div className="hero-right">
        
        <Image
        src="/images/hero-product.png"
        alt="Featured Product"
        width={500}
        height={500}
        priority
        />

      </div>
    </section>
  );
}