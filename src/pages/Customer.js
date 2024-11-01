import React from 'react';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';

function Customer() {
  const navigate = useNavigate();

  return (
    <Container>
      <Row className="my-3 align-items-center">
        <Col className="text-start">
          <Button variant="success">Back</Button>
        </Col>
        <Col className="text-center">
          <Image src="MyImages/CommerceBankLogo.png" alt="Commerce Bank Logo" fluid />
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={() => navigate('/info')}>
            Account Information
          </Button>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <h3 style={{ color: "#006E52" }}>Your Loans</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount Owed</th>
                <th>Original Amount</th>
                <th>Interest Rate</th>
                <th>Pay-off Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>03/14/24</td>
                <td>$7,894.65</td>
                <td>$10,000.00</td>
                <td>5.76%</td>
                <td>08/14/26</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Customer;
