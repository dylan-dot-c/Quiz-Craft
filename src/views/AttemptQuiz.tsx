import { useParams, useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getQuestionsForQuiz, submitAnswers } from "../lib/apiWrapper";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import QuestionCard from "../components/QuestionCard";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { NIL } from "uuid";
import { useUser } from "../contexts/userContext";

function AttemptQuiz() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useUser();
    const [questions, setQuestions] = useState<QuestionResponse | null>(null);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (!user) {
            toast.warn("You must be logged in to complete a quiz");
            navigate(`/login?redirect_url=/quiz/${id}`);
        }

        async function fetchData() {
            try {
                const response = await getQuestionsForQuiz(parseInt(id!));
                if (response.data) {
                    setQuestions(response.data);
                    console.log(response.data);
                } else {
                    toast.error("Invalid Quiz ID");
                    navigate("/quizzes");
                }
            } catch (err) {
                toast.error("Some error");
            }
        }

        fetchData();
    }, []);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        let total = 0;
        if (questions) {
            for (let question of questions?.questions!) {
                const answer = userAnswers.find(
                    (answer_) => answer_.question_id == question.question_id
                );
                if (answer?.answer_id == question.correct_answer.id) {
                    total++;
                }
            }

            var score = ((total / questions?.questions.length) * 100).toFixed();
            var userResult: SubmitQuiz = {
                score: parseInt(score),
                responses: userAnswers.filter(
                    (answer) => answer.answer_id != NIL
                ),
            };
            setScore(parseInt(score)!);

            async function sendData() {
                const token = localStorage.getItem("token") || "";
                const response = await submitAnswers(
                    token,
                    userResult,
                    parseInt(id!)
                );
                if (response.data) {
                    toast.success(response?.data.success!);
                } else {
                    toast.error("An error has occured");
                }
            }
            setSubmitted(true);
            sendData();
        } else {
            toast.warn("Questions not found");
        }
    }

    if (submitted) {
        return (
            <div className='d-flex justify-content-center text-center mt-5'>
                <div>
                    <img
                        src='/thanks.svg'
                        width={200}
                        className=''
                        alt='Thanks for submitting this quiz'
                    />
                    <h3 className='mt-3'>
                        You scored{" "}
                        <span className='text-success fw-bold '>{score}% </span>
                        well done!!
                    </h3>
                    <p className='text-secondary'>
                        Thanks for submitting this quiz! <br /> For more
                        interesting quizzes you can go back to the{" "}
                        <span className='text-primary'>Quizzes Page</span>
                    </p>
                    <Link to='/quizzes'>
                        <Button variant='outline-success'>
                            Back To Quizzes Page
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div className='bg-warning-subtle pt-5'>
            <Container className=''>
                <Card
                    data-bs-theme='dark'
                    className='col-12 col-md-6 mx-auto p-2 mt-3 border shadow-sm border-black'>
                    <Card.Title>{questions?.title}</Card.Title>
                    <Card.Body>{questions?.description}</Card.Body>
                </Card>
                <Form onSubmit={handleSubmit}>
                    {questions?.questions.map((question, index) => (
                        <QuestionCard
                            key={index}
                            question={question}
                            index={index}
                            userAnswers={userAnswers}
                            setAnswers={setUserAnswers}
                        />
                    ))}
                    <div className='d-flex justify-content-center'>
                        <Button
                            variant='primary'
                            className='mx-auto col-12 col-md-6 mt-3 p-2 cta cta-button'
                            type='submit'>
                            Submit Quiz
                        </Button>
                    </div>
                </Form>

                <p className='text-center text-secondary mt-2'>
                    This form was not created neither enforced by QuizCraft
                </p>
            </Container>
        </div>
    );
}

export default AttemptQuiz;
