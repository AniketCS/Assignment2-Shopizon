import Header from "@/lib/ui/header/Header";
import LatestProducts from "@/lib/ui/pages/home/LatestProductsSection";
import BrandsRow from "@/lib/ui/pages/home/BrandsRowSection";
import PromotionsBanner  from "@/lib/ui/pages/home/PromoBannerSection";
import Footer from "@/lib/ui/footer/Footer";

export default function Home() {
  return (
    <div className="page">
      <Header />
      <main>
        <PromotionsBanner />
        <BrandsRow />
        <LatestProducts />
      </main>

      <Footer />
    </div>
  );
}
