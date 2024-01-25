import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { SideBarBody } from "../SideBar";

function ResponsiveExample() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
                variant='primary'
                className='d-lg-none'
                onClick={handleShow}>
                Launch
            </Button>

            <Offcanvas show={show} onHide={handleClose} responsive='lg'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <SideBarBody />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default ResponsiveExample;
