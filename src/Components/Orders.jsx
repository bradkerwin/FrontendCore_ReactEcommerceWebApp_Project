import { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

class OrdersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
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
                <h3>Orders</h3>
                <ListGroup>
                    {orders.map(order => (
                        <ListGroup.Item key={order.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded">
                            <Link to={`/edit-order/${order.id}`} className='text-primary'>{order.name}</Link>
                            <Button variant="outline-danger" size="sm" onClick={()=> this.deleteOrder(order.id)}>Delete</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        );
    }
}

export default OrdersList;