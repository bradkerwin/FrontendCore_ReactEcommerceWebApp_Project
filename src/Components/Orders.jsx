import { Component } from 'react';
import { ListGroup, Button, Container, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

class OrdersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            customerId: '',
            productId: '',
            selectedOrderId: null,
            error: null
        };
    }

    componentDidMount() {
        this.fetchOrders();
    }

    fetchOrders = () => {
        axios.get('http://127.0.0.1:5000/orders')
             .then(response => {
                console.log(response.data);
                 this.setState({ orders: response.data });
             })
             .catch(error => {
                 console.error('Error fetching data:', error);
                 this.setState({ error: 'Error fetching orders. Please try again later.' });
             });
    }

    deleteOrder = (orderId) => {
        axios.delete(`http://127.0.0.1:5000/orders/${orderId}`)        
             .then(() => {
                 this.fetchOrders();
             })
             .catch(error => {
                 console.error('Error deleting order:', error);
                 this.setState({ error: 'Error deleting order. Please try again.' });
             });
    }

    render() {

        const { error, orders } = this.state;

        return (
            <Container>
                {error && <Alert variant='danger'>{error}</Alert> }
                <h3>Existing Orders</h3>
                <h2 className='mt-4'>View and Modify Existing Orders Here</h2>
                <h4 className='mt-4'>Orders in Process:</h4>
                <ListGroup>
                    {orders.map(order => (
                        <ListGroup.Item key={order.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>Order ID: {order.id}</Card.Title>
                                    <Card.Text>
                                        Customer ID: {order.customer_id} <br/>
                                        Product ID: {order.product_id}
                                    </Card.Text>
                                    <Button variant="danger" onClick={()=> this.deleteOrder(order.id)}>Cancel Order</Button>
                                </Card.Body>
                                </Card>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        );
    }
}

export default OrdersList;