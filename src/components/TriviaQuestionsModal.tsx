import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import categories from "../lib/categories";
import { v4 as uuidv4 } from "uuid";
import { Buffer } from "buffer";

type TriviaProps = {
    setEditQuestions: React.Dispatch<
        React.SetStateAction<QuestionResponse | null>
    >;
};

type TriviaForm = {
    amount: number;
    category: "" | number;
    difficulty: string;
};
function TriviaQuestionModal({ setEditQuestions }: TriviaProps) {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState<TriviaForm>({
        amount: 10,
        category: "",
        difficulty: "",
    });
    const baseURL = "https://opentdb.com/api.php?encode=base64&";
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        let queryString = getQueryString();
        const apiURL = baseURL + queryString;

        const response = await axios.get<TriviaResponse>(apiURL);
        if (response) {
            console.log(response.data);

            setEditQuestions((prev) => {
                const new_questions: QuizQuestion[] = response.data.results.map(
                    (question) => {
                        const incorrect_answers: Answer[] =
                            question.incorrect_answers.map((answer) => {
                                return {
                                    id: uuidv4(),
                                    text: Buffer.from(
                                        answer,
                                        "base64"
                                    ).toString("utf8"),
                                };
                            });

                        return {
                            question: Buffer.from(
                                question.question,
                                "base64"
                            ).toString("utf8"),
                            question_id: uuidv4(),
                            correct_answer: {
                                id: uuidv4(),
                                text: Buffer.from(
                                    question.correct_answer,
                                    "base64"
                                ).toString("utf8"),
                            },
                            incorrect_answers: incorrect_answers,
                        };
                    }
                );

                return {
                    description: prev?.description!,
                    title: prev?.title!,
                    questions: [...prev?.questions!, ...new_questions],
                };
            });
        }

        setShow(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    function getQueryString() {
        var string = "";
        string += `amount=${formData.amount}`;
        if (formData.category) {
            string += `&category=${formData.category}`;
        }
        if (formData.difficulty) {
            string += `&difficulty=${formData.difficulty}`;
        }

        return string;
    }

    return (
        <>
            <Button variant='outline-success' onClick={handleShow}>
                Get Random Trivia Questions
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Get Random Trivia Questions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mt-3'>
                            <Form.Label>Number of Questions</Form.Label>
                            <Form.Control
                                type='number'
                                max={20}
                                min={1}
                                value={formData.amount}
                                name='amount'
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Select Category</Form.Label>
                            <Form.Control
                                as='select'
                                title='Select Category'
                                value={formData.category}
                                aria-label='Select Category to get'
                                name='category'
                                onChange={handleChange}>
                                <option value=''>Any Category</option>
                                {categories.trivia_categories.map(
                                    (category) => {
                                        return (
                                            <option
                                                key={category.id}
                                                value={category.id}>
                                                {category.name}
                                            </option>
                                        );
                                    }
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Select Difficulty</Form.Label>
                            <Form.Control
                                as='select'
                                name='difficulty'
                                onChange={handleChange}
                                value={formData.difficulty}>
                                <option>Any Difficulty</option>
                                {["easy", "medium", "hard"].map(
                                    (diff, index) => {
                                        return (
                                            <option key={index} value={diff}>
                                                {diff.toUpperCase()}
                                            </option>
                                        );
                                    }
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Button
                            variant='primary'
                            type='submit'
                            className='mt-3 w-100'>
                            Get Questions!
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <p className='text-secondary text-center'>
                        Powered by{" "}
                        <a href='https://opentdb.com/'>OpenTriviaDataBaseAPI</a>
                    </p>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TriviaQuestionModal;
