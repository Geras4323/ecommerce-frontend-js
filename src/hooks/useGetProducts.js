import { useState, useEffect } from 'react';

export function useGetProducts(API) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAPI() {
      const response = await fetch(API)
      const data = await response.json()
      setProducts(data.sort((a, b) => a.id - b.id))
      setIsLoading(false)
    }

    fetchAPI()
  }, [])

  return (products)
}