"use client";

import styles from "./LatestProductsSection.module.css";
import { Button } from "@/lib/ui/components/button";
import ProductCard from "@/lib/ui/components/productCard";

const products = [
  {
    id: "1",
    name: "Mug",
    price: "$15.00",
    rating: 200,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    id: "2",
    name: "Vase",
    price: "$35.00",
    rating: 50,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    id: "3",
    name: "Toy Train",
    price: "$15.00",
    rating: 25,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    id: "4",
    name: "Umbrella",
    price: "$45.00",
    rating: 50,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
];

export default function LatestProductsSection() {
  return (
    <section className={styles.latestProducts}>
      <h3 className={styles.heading}>Latest Products</h3>
      <div className={styles.grid}>
        {products.map((product, i) => (
          <ProductCard
            key={i}
            name={product.name}
            image={product.image}
            price={product.price}
            id={product.id}
          />
        ))}
      </div>
    </section>
  );
}
