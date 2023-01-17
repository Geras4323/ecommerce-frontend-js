import React from 'react';

import { ProductCard } from '../components/ProductCard';
import { useGetProducts } from '../hooks/useGetProducts';


const API = process.env.BASE_URL ? `${process.env.BASE_URL}/products` : 'http://localhost:5000/api/v1/products';
// const API = 'http://localhost:5000/api/v1/products';


function ProductsList({ email, category }) {
  const products = useGetProducts(API)

  const [filteredProducts, setFilteredProducts] = React.useState([]);

  React.useEffect(() => {
    if (category !== 0) {
      const temp = products.filter(product => product.categoryID === category);
      setFilteredProducts(temp);
    }
  }, [category])

  return (
    <section className="mt-24 mb-8">
      <div className="grid grid-cols-autosm gap-6 place-content-center   sm:grid-cols-automd">

        {category === 0
          ? products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                logged={email ? true : false}
              />
            ))
          : filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                logged={email ? true : false}
              />
            ))
        }

      </div>
    </section>
  );
}

export { ProductsList }