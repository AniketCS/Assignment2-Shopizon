import styles from './PromoBannerSection.module.css';
import { Button } from '@/lib/ui/components/button';


export default function PromoBannerSection() {
  return (
    <section className={styles.banner}>
      <h2>IT’S SUMMER! <br /> 50% OFF ON BEACH ITEMS</h2>
      <Button className={styles.button}>SHOP NOW!</Button>
    </section>
  );
}
