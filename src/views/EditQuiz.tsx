import { Link, useParams } from "react-router-dom";
import { getQuestionsForQuizEdit } from "../lib/apiWrapper";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import TriviaQuestionModal from "../components/TriviaQuestionsModal";
import { v4 as uuidv4 } from "uuid";
import { addQuestions } from "../lib/apiWrapper";
import { TrashFill } from "react-bootstrap-icons";

function EditQuiz() {
    const { quiz_id } = useParams();
    const [editQuestions, setEditQuestions] = useState<QuestionResponse | null>(
        null
    );

    function deleteAnswer(questionIndex: number, answerIndex: number) {
        setEditQuestions((prev) => {
            if (prev) {
                const updatedQuestions = prev.questions.map(
                    (question, index) => {
                        if (index === questionIndex) {
                            const updatedAnswers =
                                question.incorrect_answers.filter(
                                    (_, i) => i !== answerIndex
                                );

                            return {
                                ...question,
                                incorrect_answers: updatedAnswers,
                            };
                        }
                        return question;
                    }
                );

                return {
                    ...prev,
                    questions: updatedQuestions,
                };
            }
            return null;
        });
    }

    useEffect(() => {
        async function getData() {
            try {
                const token = localStorage.getItem("token") || "";
                const response = await getQuestionsForQuizEdit(
                    token,
                    parseInt(quiz_id!)
                );
                console.log(response);
                if (response.data) {
                    setEditQuestions(response.data);
                }
            } catch (err) {
                toast.error("Some error occured");
            }
        }

        getData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setEditQuestions((prev) => {
            return {
                ...prev!,
                [name]: value,
            };
        });
    };

    function handleRadioChange(
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) {
        const { value } = e.target;
        console.log(e, e.target);

        setEditQuestions((prev) => {
            if (prev) {
                return {
                    ...prev,
                    questions: prev.questions.map((question, index_) => {
                        if (index_ === index) {
                            const correctAnswer =
                                question.incorrect_answers.find(
                                    (answer) => answer.id === value
                                );
                            const currentAnswer = question.correct_answer;

                            return {
                                ...question,
                                correct_answer: {
                                    id: value,
                                    text: correctAnswer?.text || "sus",
                                },
                                incorrect_answers: [
                                    ...question.incorrect_answers,
                                    currentAnswer,
                                ]
                                    .filter((answer) => answer.id !== value) // Exclude the new correct answer
                                    .map((answer) => ({
                                        id: answer.id,
                                        text: answer.text,
                                    })),
                            };
                        } else {
                            // Make sure to keep the other questions unchanged
                            return question;
                        }
                    }),
                };
            } else {
                return null;
            }
        });
    }

    function handleAddNewQuestion() {
        const new_question: QuizQuestion = {
            question: "New Question",
            incorrect_answers: [{ text: "Option 1", id: uuidv4() }],
            correct_answer: { text: "Correct Answer", id: uuidv4() },
            question_id: uuidv4(),
        };

        setEditQuestions((prev) => {
            return {
                title: prev?.title!,
                description: prev?.description!,
                questions: [...prev?.questions!, new_question],
            };
        });

        toast.success("New Question Added");
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const token = localStorage.getItem("token") || "";
        const response = await addQuestions(token, +quiz_id!, editQuestions!);

        console.log(response);
        toast.success("Questions has been saved");
    }

    function handleDelete(index: number) {
        setEditQuestions((prev) => {
            if (prev) {
                const result = prev.questions.filter(
                    (_, index_) => index_ != index
                );
                toast.warn("Question has been deleted");

                return {
                    ...prev,
                    questions: result,
                };
            } else {
                return null;
            }
        });
    }

    function handleQuestionChange(
        e: React.ChangeEvent<HTMLInputElement>,
        index_: number
    ) {
        const { value } = e.target;

        setEditQuestions((prevQuestions) => {
            if (prevQuestions) {
                const newQuestions = prevQuestions.questions.map(
                    (question, index) => {
                        if (index == index_) {
                            return {
                                ...question,
                                question: value,
                            };
                        } else {
                            return question;
                        }
                    }
                );

                return {
                    ...prevQuestions,
                    questions: newQuestions,
                };
            } else {
                return null;
            }
        });
    }

    function addAnswer(questionIndex: number) {
        setEditQuestions((prev) => {
            if (prev) {
                const updatedQuestions = prev.questions.map(
                    (question, index) => {
                        if (index === questionIndex) {
                            const newAnswer = {
                                text: "New Answer",
                                id: uuidv4(),
                            };
                            return {
                                ...question,
                                incorrect_answers: [
                                    ...question.incorrect_answers,
                                    newAnswer,
                                ],
                            };
                        }
                        return question;
                    }
                );

                return {
                    ...prev,
                    questions: updatedQuestions,
                };
            }
            return null;
        });
    }

    function handleCorrectAnswerChange(
        e: React.ChangeEvent<HTMLInputElement>,
        questionIndex: number
    ) {
        const { value } = e.target;

        setEditQuestions((prevQuestions) => {
            if (prevQuestions) {
                const newQuestions = prevQuestions.questions.map(
                    (question, qIndex) => {
                        if (questionIndex == qIndex) {
                            const newAnswer = {
                                ...question.correct_answer,
                                text: value,
                            };
                            return {
                                ...question,
                                correct_answer: newAnswer,
                            };
                        } else {
                            return question;
                        }
                    }
                );
                return {
                    ...prevQuestions,
                    questions: newQuestions,
                };
            } else {
                return null;
            }
        });
    }

    function handleAnswerChange(
        e: React.ChangeEvent<HTMLInputElement>,
        questionIndex: number,
        answerIndex: number
    ) {
        const { value } = e.target;

        setEditQuestions((prev) => {
            if (prev) {
                const updatedQuestions = prev.questions.map(
                    (question, qIndex) => {
                        if (qIndex === questionIndex) {
                            const updatedAnswers =
                                question.incorrect_answers.map(
                                    (answer, aIndex) => {
                                        if (aIndex === answerIndex) {
                                            return {
                                                ...answer,
                                                text: value,
                                            };
                                        }
                                        return answer;
                                    }
                                );

                            return {
                                ...question,
                                incorrect_answers: updatedAnswers,
                            };
                        }
                        return question;
                    }
                );

                return {
                    ...prev,
                    questions: updatedQuestions,
                };
            }
            return null;
        });
    }

    return (
        <div className='bg-success-subtle py-5  '>
            <div className='container my-2'>
                <Link to={`/quiz/submissions/${quiz_id}`}>
                    <Button>View Submissions</Button>
                </Link>
            </div>
            <Form className='container  mx-auto' onSubmit={handleSubmit}>
                <div className='mb-4 p-3 rounded-4 border border-black bg-white'>
                    <Form.Group>
                        <Form.Label>Quiz Description</Form.Label>
                        <Form.Control
                            value={editQuestions?.description}
                            name='description'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Quiz Title</Form.Label>
                        <Form.Control
                            value={editQuestions?.title}
                            name='title'
                            onChange={handleChange}
                        />
                        <ButtonGroup className='d-flex justify-content-center  text-center mt-3 w-75 mx-auto'>
                            <Button
                                onClick={handleAddNewQuestion}
                                variant='info'>
                                Add new Question
                            </Button>
                            <TriviaQuestionModal
                                setEditQuestions={setEditQuestions}
                            />
                            <Button type='submit' variant='success'>
                                Upload Changes
                            </Button>
                        </ButtonGroup>
                    </Form.Group>
                </div>

                {editQuestions?.questions.map((questionObj, index) => {
                    const allAnswers = [
                        ...questionObj.incorrect_answers,
                        questionObj.correct_answer,
                    ];
                    return (
                        <div
                            key={questionObj.question_id}
                            className='mb-4 p-3 rounded-4 border border-black bg-white'>
                            <input
                                className='form-control'
                                title={questionObj.question}
                                type='text'
                                id={questionObj.question_id}
                                value={questionObj.question}
                                name={questionObj.question_id}
                                onChange={(e) => {
                                    handleQuestionChange(e, index);
                                }}
                            />
                            <div className='d-flex justify-content-center '>
                                <ButtonGroup className='mt-3'>
                                    <Button
                                        variant='danger'
                                        onClick={() => handleDelete(index)}>
                                        Delete Question
                                    </Button>
                                    <Button
                                        variant='success'
                                        onClick={() => addAnswer(index)}>
                                        Add New ANswer
                                    </Button>
                                </ButtonGroup>
                            </div>

                            {allAnswers.map((answer, answer_index) => {
                                const correct =
                                    answer.id == questionObj.correct_answer.id;
                                return (
                                    <div
                                        key={answer.id}
                                        className='d-flex gap-2 align-items-center '>
                                        <Form.Check
                                            className='d-inline '
                                            type='radio'
                                            value={answer.id}
                                            name={questionObj.question_id}
                                            checked={correct}
                                            onChange={(e) =>
                                                handleRadioChange(e, index)
                                            }
                                        />
                                        <Form.Label className='d-flex gap-2 align-items-center'>
                                            <input
                                                title={answer.text}
                                                className='form-control d-inline'
                                                type='text'
                                                value={answer.text}
                                                onChange={(e) => {
                                                    if (correct) {
                                                        handleCorrectAnswerChange(
                                                            e,
                                                            index
                                                        );
                                                    } else {
                                                        handleAnswerChange(
                                                            e,
                                                            index,
                                                            answer_index
                                                        );
                                                    }
                                                }}
                                            />

                                            {!correct && (
                                                <Button
                                                    variant='danger'
                                                    className=''
                                                    onClick={() =>
                                                        deleteAnswer(
                                                            index,
                                                            answer_index
                                                        )
                                                    }>
                                                    <TrashFill />
                                                </Button>
                                            )}
                                        </Form.Label>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </Form>
        </div>
    );
}

export default EditQuiz;
