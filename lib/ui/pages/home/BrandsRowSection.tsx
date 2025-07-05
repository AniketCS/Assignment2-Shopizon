import styles from './BrandsRowSection.module.css';

const brandLogos = ['elvis', 'comax', 'mba', 'hp', 'nocoffee'];

export default function BrandsRowSection() {
  return (
    <section className={styles.brandsRow}>
      {brandLogos.map((brand, index) => (
        <img
          key={index}
          src={`/brands/${brand}.png`}
          alt={brand}
          className={styles.logo}
        />
      ))}
    </section>
  );
}
