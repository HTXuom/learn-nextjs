import { Button } from "@/components/ui/button";
import Footer from "./_components/Footer";
import ProductList from "./_components/ProductList";
import Slider from "./_components/Slider";

export default function Home() {
  return (
    <div>
      <Slider/>
      <ProductList />
      <Footer />
      
    </div>
  );
}

