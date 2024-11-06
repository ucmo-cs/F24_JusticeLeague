import React from 'react';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Customer() {
  const navigate = useNavigate();

  const styles = {
    button: {
      backgroundColor: '#05654d',
      borderColor: '#05654d',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      border: '2px solid grey',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
      backgroundColor: '#05654d',
      color: '#FFFFFF',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '10px',
      fontSize: '16px',
      borderBottom: '2px solid grey', 
      borderLeft: 'none',
      borderRight: 'none',
    },
    cell: {
      textAlign: 'center',
      padding: '10px',
      fontSize: '14px',
      borderBottom: '2px solid grey', 
      borderLeft: 'none', 
      borderRight: 'none', 
    },
  };

  return (
    <Container>
      <Row className="my-3 align-items-center">
        <Col className="text-start">
          <Button style={styles.button} onClick={() => window.location.href = 'http://localhost:3000'}>
            Logout
          </Button>
        </Col>
        <Col className="text-center"></Col>
        <Col className="text-end">
          <Button style={styles.button} onClick={() => navigate('/info')}>
            Account Information
          </Button>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <h3 style={{ color: '#05654d' }}>Your Loans</h3>
          <Table striped bordered hover style={styles.table}>
            <thead>
              <tr>
                <th style={styles.header}>Date</th>
                <th style={styles.header}>Amount Owed</th>
                <th style={styles.header}>Original Amount</th>
                <th style={styles.header}>Interest Rate</th>
                <th style={styles.header}>Pay-off Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.cell}>03/14/24</td>
                <td style={styles.cell}>$7,894.65</td>
                <td style={styles.cell}>$10,000.00</td>
                <td style={styles.cell}>5.76%</td>
                <td style={styles.cell}>08/14/26</td>
              </tr>
              <tr>
                <td style={styles.cell}>06/05/24</td>
                <td style={styles.cell}>$10,898.05</td>
                <td style={styles.cell}>$15,500.00</td>
                <td style={styles.cell}>2.07%</td>
                <td style={styles.cell}>08/14/26</td>
              </tr>
              <tr>
                <td style={styles.cell}>04/30/24</td>
                <td style={styles.cell}>$15,006.92</td>
                <td style={styles.cell}>$20,000.00</td>
                <td style={styles.cell}>8.20%</td>
                <td style={styles.cell}>07/14/28</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Customer;
