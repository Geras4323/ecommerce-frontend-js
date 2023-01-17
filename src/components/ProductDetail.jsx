import React from 'react';


function ProductDetail({ product, handleAddProduct, isAdded, setIsDetailShown }) {

  const handleCloseDetail = () => {
    setIsDetailShown(false)
  }


  return (
    <React.Fragment>
      <div
        className="w-0 h-0   sm:w-2/3 sm:h-screen fixed top-16 right-0 left-0 bottom-0 bg-black bg-opacity-30"
        onClick={handleCloseDetail}
      ></div>

      <aside className="w-full h-full pb-20 bg-white fixed top-16 right-0 border-t border-t-very-light-pink flex flex-col justify-between   sm:w-1/3">
        <div
          className="bg-white w-10 h-10 border border-very-light-pink absolute top-6 left-6 z-20 p-3 rounded-full   hover:cursor-pointer"
          onClick={handleCloseDetail}
        >
          <img src="/assets/icons/icon_close.png" alt="close" />
        </div>
        <img src={product.image} alt={product.name} className="w-full h-80 sm:p-2 sm:pt-0 object-cover rounded-b-2xl border-b border-b-very-light-pink"/>

        <div className="h-full mt-6 mx-6 flex flex-col justify-between">
          <div className="h-full flex flex-col">
            <section>
              <p className="text-xl text-black mb-1 font-bold">{`$ ${product.price}`}</p>
              <p className="text-lg mb-6 text-gray-500">{product.name}</p>
            </section>
            <div className="h-4/5 overflow-y-auto">
              <p className="h-4/5 text-md text-gray-500">{product.description}</p>
            </div>
          </div>

          {!isAdded
            ? <button
                className="h-14 mt-6 bg-hospital-green border-none rounded-lg text-white w-full cursor-pointer text-md font-bold flex justify-center items-center gap-3"
                onClick={() => handleAddProduct(product)}
              >
                <img src="/assets/icons/bt_add_to_cart.svg" alt="add to cart" />
                Add to cart
              </button>
            : <div
                className="h-12 mt-6 bg-white border border-very-light-pink rounded-lg text-very-light-pink w-full text-md font-bold flex justify-center items-center"
              >
              <img src="/assets/icons/bt_added_to_cart.svg" alt="added to cart" />
              Added to cart
              </div>
          }
        </div>
      </aside>
    </React.Fragment>
  );
}

export { ProductDetail }