import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./purchase.css";
import { TableRow, TableContainer, Table, TableBody, TableCell, Typography, Box } from '@mui/material';

function PurchasePanel() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState({
    buyQuantity: [0, 0, 0],
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/purchase/paymentEntry', { state: { order: order } });
  }

  const handleQuantityChange = (index, value) => {
    setOrder(prevOrder => {
      let newBuyQuantity = [...prevOrder.buyQuantity];
      newBuyQuantity[index] = value;
      return { ...prevOrder, buyQuantity: newBuyQuantity };
    });
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/inventory/items')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  let totalPrice = 0;
  for (let i = 0; i < order.buyQuantity.length; i++) {
    totalPrice += order.buyQuantity[i] * (items[i]?.price || 0);
  }

  return (
    <TableContainer className="container">
      <Box mb={4}>
        <Typography variant="h5" component="div" gutterBottom>
          Purchase Products
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          Specify the quantity for each product you'd like to purchase:
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Table>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1" style={{ marginRight: "10px" }}>
                      {item.name} - ${item.price} each, Quantity:
                    </Typography>
                    <input
                      type="number"
                      required
                      min="0"
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="right">
                <Typography variant="body1">
                  Total Price: ${totalPrice}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br />
        <button type="submit" className="button-27">
          Proceed to Payment
        </button>
      </form>
    </TableContainer>
  );
}

export default PurchasePanel;
