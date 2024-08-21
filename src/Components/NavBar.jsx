import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function NavigationBar() {
    return (
        <Navbar bg="primary" expand="md">
            <Navbar.Brand href="/customers">Welcome to E-Commerce</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as= {NavLink} to="/" activeclassname="active">
                    Home
                    </Nav.Link>
                    
                    <Nav.Link as= {NavLink} to="/newcustomer" activeclassname="active">
                    Add New Customer
                    </Nav.Link>

                    <Nav.Link as= {NavLink} to="/customers" activeclassname="active">
                    View Existing Customers
                    </Nav.Link>

                    <Nav.Link as= {NavLink} to="/newproduct" activeclassname="active">
                    Add New Product
                    </Nav.Link>

                    <Nav.Link as= {NavLink} to="/products" activeclassname="active">
                    View Our Products
                    </Nav.Link>

                    <Nav.Link as= {NavLink} to="/neworder" activeclassname="active">
                    Add New Order
                    </Nav.Link>

                    <Nav.Link as= {NavLink} to="/orders" activeclassname="active">
                    Existing Orders
                    </Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar;