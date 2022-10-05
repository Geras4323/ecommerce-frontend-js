import React from 'react';

import { ProductCard } from '../components/ProductCard';

import { useGetProducts } from '../hooks/useGetProducts';


const API = 'https://api.escuelajs.co/api/v1/products?limit=30&offset=0';

function ProductsList() {
  const products = useGetProducts(API)



  return (
    <section className="mt-24 mb-8">
      <div className="grid grid-cols-autosm gap-6 place-content-center   sm:grid-cols-automd">

        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>
    </section>
  );
}

export { ProductsList }