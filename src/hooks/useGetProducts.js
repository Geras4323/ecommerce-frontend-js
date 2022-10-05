import { useState, useEffect } from 'react';

function useGetProducts(API) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAPI() {
      const response = await fetch(API)
      const data = await response.json()
      setProducts(data)
      setIsLoading(false)
    }

    fetchAPI()
  }, [])

  return (products)
}

export { useGetProducts };