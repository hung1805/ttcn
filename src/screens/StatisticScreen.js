import React from "react";
import { useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { seeStatistic } from "../actions/statisticActions";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const StatisticScreen = () => {
  const order = ["QTY", "DOANH SO"];
  const sort = ["DESC", "INC"];
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [limit, setLimit] = useState(1);
  const [orderBy, setOrderBy] = useState(order[0]);
  const [sortType, setSortType] = useState(sort[0]);
  const [message, setMessage] = useState("");
  const { loading, data, error } = useSelector((state) => state.statistic);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!startTime || !endTime || !limit || !orderBy || !sortType) {
      alert("Please fill the data");
    } else {
      const option = {
        startTime,
        endTime,
        limit: Number(limit),
        orderBy,
        sortType,
      };
      dispatch(seeStatistic(option));
      console.log(option);
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>Select Time</h2>
        {message && <Message variant="danger">{message}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="startTime">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="11/11/2011"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="endTime">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="11/11/2012"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="limit">
            <Form.Label>Limit Products</Form.Label>
            <Form.Control
              type="number"
              min={1}
              placeholder="Enter limit products"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="orderBy">
            <Form.Label>Order By</Form.Label>
            <Form.Control
              as="select"
              type="string"
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
            >
              {order.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="sortType">
            <Form.Label>Sort Type</Form.Label>
            <Form.Control
              as="select"
              type="string"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              {sort.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            See the Statistic
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {data && (
          <>
            <h2>Products's Details:</h2>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Sale</th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((item, index) => (
                  <tr key={item.product._id}>
                    <td>{index + 1}</td>
                    <td>{item.product.name}</td>
                    <td>{item.qty}</td>
                    <td>${item.sale}</td>
                    <td>
                      <Link to={`/product/${item.product._id}`}>Product Detail</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <br />
            <h2>Total Bill:</h2>

            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Total Saled</th>
                  <th>Total Tax Price</th>
                  <th>Total Shipping Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${data?.totalSale}</td>
                  <td>${data?.totalTaxPrice.toFixed(2)}</td>
                  <td>${data?.totalShippingPrice}</td>
                </tr>
              </tbody>
            </Table>
          </>
        )}
      </Col>
    </Row>
  );
};

export default StatisticScreen;
