import React from 'react';
import { Button, Table } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

//<Image src="MyImages/commercebank.png" alt=""/>

 
function Customer() {
  return (
    <div style={{margin: "0em 3em 0em 3em"}}>
      <br></br>
      <div style={{margin: "0em 0em 0em 6em"}}>
      <Button variant="success">Back</Button>{' '}
      </div>
      <br></br>
      <br></br>
      <div style={{margin: "0em 0em 0em 57em"}}>
      <Button variant="success">Account Information</Button>{' '}
      </div>
      <div style={{margin: "0em 6em 0em 6em"}}>
      <h3 style={{color: "#006E52"}}>Your Loans</h3>
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
    </div>
    </div>
  );
}


export default Customer;