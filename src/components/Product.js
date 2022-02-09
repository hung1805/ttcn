import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  const history = useHistory();
  const addToCartHandler = () => {
    if (product.countInStock === 0)
      return alert("Product Out of Stock. Please try later");
    history.push(`/cart/${product._id}?qty=1`);
  };
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
        <Button variant="dark" onClick={() => addToCartHandler()}>
          Add To Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
