import "@/styles/ProductCard.css";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  return (

    <Link href={`/products/${id}`}
          className="product-link"
    >
    
    <div className="product-card">
      <img src={image} alt={name} />

      <div className="product-info">
        <h3>{name}</h3>

        <p className="product-price">
          ₹{price.toLocaleString()}
        </p>

        <button>Add To Cart</button>
      </div>
    </div>

    </Link>
  );
}