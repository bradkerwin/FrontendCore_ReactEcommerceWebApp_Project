import { Component } from 'react';
import { ListGroup, Button, Container, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            selectedCustomerId: null,
            error: null
        };
    }

    componentDidMount() {
        this.fetchCustomers();
    }

    fetchCustomers = () => {
        axios.get('http://127.0.0.1:5000/customers')
             .then(response => {
                console.log(response.data);
                 this.setState({ customers: response.data });
             })
             .catch(error => {
                 console.error('Error fetching data:', error);
                 this.setState({ error: 'Error fetching customers. Please try again later.' });
             });
    }

    deleteCustomer = (customerId) => {
        console.log(customerId)
        axios.delete(`http://127.0.0.1:5000/customers/${customerId}`)
             .then(() => {
                 this.fetchCustomers();
             })
             .catch(error => {
                 console.error('Error deleting customer:', error);
                 this.setState({ error: 'Error deleting customer. Please try again.' });
             });
    }

    render() {

        const { error, customers } = this.state;

        return (

            <Container>
                {error && <Alert variant='danger'>{error}</Alert> }
                <h3>Customers</h3>
                <ListGroup>
                    {customers.map(customer => (
                        <ListGroup.Item key={customer.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>{customer.name}</Card.Title>
                                    <Card.Text>
                                        {customer.email} <br/>
                                        {customer.phone}
                                    </Card.Text>
                                    <Button variant="danger" onClick={()=> this.deleteCustomer(customer.id)}>Remove Customer</Button>
                                </Card.Body>
                                </Card>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        );
    }
}

export default CustomerList;