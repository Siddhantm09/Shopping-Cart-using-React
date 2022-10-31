import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddtoCart, fetchAllProducts } from "../Redux/reducer/ProductSlice";
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const { products, loading } = useSelector((state) => state.allProducts);

  return (
    <>
      <div className="container-fluid">
        <div className="col">
          <div className="row">
            <h1 className="text-center mt-4">All Products</h1>
            {loading && <h2>Loading!!</h2>}
            {products &&
              products.map((item) => {
                return (
                  <div class="card mx-auto my-4 " style={{ width: "18rem" }}>
                    <img
                      src={item.image}
                      class="card-img-top img-responsive"
                      alt="Image"
                    />
                    <div class="card-body">
                      <h5 class="card-title">{item.title}</h5>
                      <p class="card-text">${item.price}</p>
                      <button
                        onClick={() => dispatch(AddtoCart(item.id))}
                        className="btn btn-primary"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
