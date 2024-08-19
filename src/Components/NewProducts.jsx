import { Component } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container, Modal } from 'react-bootstrap';

class NewProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            price: '',
            productDetails: '',
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


            const productData = {
                productName: this.state.productName.trim(),
                price: this.state.price.trim(),
                productDetails: this.state.productDetails.trim()
            };

            axios.post('http://127.0.0.1:5000/products', productData)
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
        const { productName, price, productDetails } = this.state;
        const errors = {};
        if (!productName) errors.productName = 'Must enter a name';
        if (!price) errors.price = 'Must enter a price';
        if (!productDetails) errors.productDetails = 'Must enter details';
        return errors;
    };

    handleChange = (event) => {
        const { productName, value } = event.target;
        this.setState({ [productName]: value });
    };

    closeModal = () => {
        this.setState({
            showSuccessModal: false,
            productName: '',
            price: '',
            productDetails: '',
            errors: {},
        });
    };


    render() {

        const { productName, price, productDetails, isLoading, showSuccessModal, error, errors } = this.state;

        return (
            <Container>
                {isLoading && <Alert variant="info">Submitting Product Data...</Alert>}
                {error && <Alert variant="danger">Error Submitting Product: {error}</Alert>}

                <Form onSubmit={this.handleSubmit}>
                    <h2 className="m-3">Enter New Product Details</h2>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>
                            Name of Product
                        </Form.Label>
                        <Form.Control type="text" name="productName" value={productName} onChange={this.handleChange} />
                        {errors.productName && <div style={{ color: 'red'}}>{errors.productName}</div>}
                    </Form.Group>

                    <Form.Group controlId="formGroupPrice">
                        <Form.Label>
                            Price
                        </Form.Label>
                        <Form.Control type="float" name="price" value={price} onChange={this.handleChange} />
                        {errors.price && <div style={{ color: 'red'}}>{errors.price}</div>}
                    </Form.Group>

                    <Form.Group controlId="formGroupDetails">
                        <Form.Label>
                            Give a description of the product
                        </Form.Label>
                        <Form.Control type="text" name="productDetails" value={productDetails} onChange={this.handleChange} />
                        {errors.productDetails && <div style={{ color: 'red'}}>{errors.productDetails}</div>}
                    </Form.Group>

                    <Button className="mt-3" variant="primary" type="submit">Submit</Button>
                </Form>

                <Modal show={showSuccessModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Product Added Succesfully!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Thank you!!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
                
            </Container>
        );
    }
};

export default NewProduct;
