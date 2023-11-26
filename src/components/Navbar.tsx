import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useUser } from "../contexts/userContext";
import { Link } from "react-router-dom";

function Header() {
    const { user, logout } = useUser();

    return (
        <>
            <Navbar expand='lg' bg='dark' data-bs-theme='dark'>
                <Container>
                    <Navbar.Brand href='#home'>Quiz Craft</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='me-auto'>
                            <Nav.Link href='#home'>Home</Nav.Link>
                            <Nav.Link as={Link} to='/quizzes'>
                                All Quizzes
                            </Nav.Link>
                            <Nav.Link href='#pricing'>Pricing</Nav.Link>
                        </Nav>
                        <Nav>
                            {user ? (
                                <>
                                    <Navbar.Text>
                                        Logged in as{" "}
                                        {user.firstName + " " + user.lastName}
                                    </Navbar.Text>
                                    <Nav.Link>
                                        <Button
                                            variant='danger'
                                            onClick={logout}>
                                            Logout
                                        </Button>
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to='/login'>
                                        <Button variant='outline-success'>
                                            Login
                                        </Button>
                                    </Nav.Link>
                                    <Nav.Link as={Link} to='/signup'>
                                        <Button variant='warning'>
                                            SignUp
                                        </Button>
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
