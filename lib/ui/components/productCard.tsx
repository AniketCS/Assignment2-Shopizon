"use client";
import Link from "next/link";

interface ProductProps {
  name: string;
  price: string;
  image: string;
  id: string;
}

export default function ProductCard({ name, price, image, id }: ProductProps) {
  return (
    <div className="card bg-base-100 w-64 shadow-sm">
      <figure>
        <img
          src={image}
          // src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Price: ${price}</p>

        <div className="card-actions justify-end">
          <Link href={`/products/${id}`}>
            <button className="btn btn-primary">Buy Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
