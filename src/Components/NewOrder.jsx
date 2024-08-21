import { Component } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container, Modal } from 'react-bootstrap';

class NewOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderDate: '',
            customerId: '',
            productId: '',
            errors: {},
            isLoading: false,
            error: null,
            showSuccessModal: false
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validateForm();
        if (Object.keys(errors).length === 0) {

            this.setState({ isLoading: true, error: null })


            const orderData = {
                order_date: this.state.orderDate.trim(),
            };

            axios.post('http://127.0.0.1:5000/orders', orderData)
                .then(() => {
                    this.setState({showSuccessModal: true,
                    isLoading: false    
                })
                    

                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    this.setState({ error: error.toString(), isLoading: false });
                });
        } else {
            this.setState({ errors });
        }
    };

    validateForm = () => {
        const { orderDate, customerId, productId } = this.state;
        const errors = {};
        if (!customerId) errors.customerId = 'Customer ID is required';
        if (!productId) errors.productId = 'Product ID is required';
        if (!orderDate) errors.orderDate = 'Please enter today\'s date';
        return errors;
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    closeModal = () => {
        this.setState({
            showSuccessModal: false,
            orderDate: '',
            customerId: '',
            productId: '',
            errors: {},
        });
    };


    render() {

        const { orderDate, customerId, productId, isLoading, showSuccessModal, error, errors } = this.state;

        return (
            <Container>
                {isLoading && <Alert variant="info">Submitting Order Data...</Alert>}
                {error && <Alert variant="danger">Error Submitting Order: {error}</Alert>}

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formGroupCustomerId">
                        <Form.Label>
                            Enter Your Customer ID
                        </Form.Label>
                        <Form.Control type="text" name="customerID" value={customerId} onChange={this.handleChange} />
                        {errors.customerId && <div style={{ color: 'red'}}>{errors.customerId}</div>}
                    </Form.Group>

                    <Form.Group controlId="formGroupProductId">
                        <Form.Label>
                            Enter The ID of the Product You Would Like to Purchase
                        </Form.Label>
                        <Form.Control type="text" name="productId" value={productId} onChange={this.handleChange} />
                        {errors.productId && <div style={{ color: 'red'}}>{errors.productId}</div>}
                    </Form.Group>

                    <Form.Group controlId="formGroupOrderDate">
                        <Form.Label>
                            Enter Today&lsquo;s Date
                        </Form.Label>
                        <Form.Control type="date" name="orderDate" value={orderDate} onChange={this.handleChange} />
                        {errors.productDetails && <div style={{ color: 'red'}}>{errors.productDetails}</div>}
                    </Form.Group>

                    <Button className="mt-3" variant="primary" type="submit">Submit</Button>
                </Form>

                <Modal show={showSuccessModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Your Order Has Been Placed!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You Will Be Receiving it in 5-7 Business Days!
                    </Modal.Body>
                    <Modal.Body>
                        Thank You for Your Business!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
                
            </Container>
        );
    }
};

export default NewOrder;
