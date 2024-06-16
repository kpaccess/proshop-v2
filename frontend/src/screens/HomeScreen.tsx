import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { ProductPropsV1 } from "../types";

import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery("Product");

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">Something went wrong </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products?.map((product: ProductPropsV1, index: number) => {
              return (
                <Col
                  key={`${product?._id} - ${index}`}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
};
export default HomeScreen;
