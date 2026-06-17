import { productGridStatic } from "../_statics/products-grid-static";
import ProductCard from "./ProductCard";

function ProductGrid() {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {productGridStatic?.map((product, i: number) => (
        <ProductCard key={i} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
