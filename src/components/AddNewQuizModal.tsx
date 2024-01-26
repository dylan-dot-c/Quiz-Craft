import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { addNewQuiz } from "../lib/apiWrapper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type ModalProps = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    show: boolean;
};

function AddNewQuestionModal({ show, setShow }: ModalProps) {
    const [questionForm, setQuestionForm] = useState({
        title: "",
        description: "",
    });
    const navigate = useNavigate();

    const handleClose = () => setShow(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuestionForm((question) => {
            const { name, value } = e.target;

            return {
                ...question,
                [name]: value,
            };
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token") || "";
            const response = await addNewQuiz(
                token,
                questionForm.description,
                questionForm.title
            );

            if (response.data) {
                const new_quiz_id = response.data.id;
                toast.success(response.data.msg);
                navigate("dashboard/quizzes/quiz/edit/" + new_quiz_id);
            } else {
                toast.error("Failed to create quiz");
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mt-3'>
                            <Form.Label>Quiz Title</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Title'
                                onChange={handleChange}
                                value={questionForm.title}
                                name='title'
                                required
                            />
                        </Form.Group>
                        <Form.Group className='mt-3'>
                            <Form.Label>Quiz Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='description'
                                onChange={handleChange}
                                value={questionForm.description}
                                name='description'
                                required
                            />
                        </Form.Group>
                        <Button
                            variant='primary'
                            type='submit'
                            className='mt-3 w-100'>
                            Create Quiz
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddNewQuestionModal;
