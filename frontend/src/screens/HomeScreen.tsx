import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import { ProductsProps } from "../types";

const HomeScreen = () => {
  const [products, setProducts] = useState<ProductsProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");

      setProducts(data);
    };

    fetchProducts();
  }, []);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product, index: number) => (
          <Col key={`${product?._id} - ${index}`} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};
export default HomeScreen;
