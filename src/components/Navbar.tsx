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
                    <Navbar.Brand as={Link} to='/'>
                        <img
                            src='/quiz.png'
                            className='bg-white'
                            width={40}
                            alt=''
                        />{" "}
                        Craft
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='me-auto'>
                            <Nav.Link as={Link} to='/quizzes'>
                                All Quizzes
                            </Nav.Link>
                            <Nav.Link as={Link} to={"/dashboard"}>
                                Quiz Craft Studio
                            </Nav.Link>
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
