import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { ProductsProps } from "../types";
import Rating from "../components/Rating";

const ProductScreen = () => {
  const { id: productId } = useParams<{ id: string }>();

  const [product, setProduct] = useState({} as ProductsProps);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);

      setProduct(data);
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back{" "}
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product?.image} alt={product?.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product?.name}</h3>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <Rating
              value={product?.rating || 0}
              text={`${product?.numReviews} reviews`}
            />
          </ListGroup.Item>
          <ListGroup.Item>Description: {product?.description}</ListGroup.Item>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product?.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product && product?.countInStock > 0
                        ? "In Stock"
                        : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product?.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default ProductScreen;
