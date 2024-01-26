import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { getQuestionsForQuiz, submitAnswers } from "../lib/apiWrapper";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import QuestionCard from "../components/QuestionCard";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { NIL } from "uuid";

import { Helmet } from "react-helmet";
import useSWR from "swr";

function AttemptQuiz() {
    const { quiz_id } = useParams();
    const {
        data: questions,
        isLoading,
        error,
    } = useSWR(quiz_id, getQuestionsForQuiz);

    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    async function sendData(userResult: SubmitQuiz) {
        const token = localStorage.getItem("token") || "";
        const response = await submitAnswers(
            token,
            userResult,
            parseInt(quiz_id!)
        );
        if (response.data) {
            toast.success(response && response.data.success);
        } else {
            toast.error("An error has occured");
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        let total = 0;
        const questionList = questions?.data?.questions || [];
        if (questions) {
            for (const question of questionList) {
                const answer = userAnswers.find(
                    (answer_) => answer_.question_id == question.question_id
                );
                if (
                    (answer && answer.answer_id) == question.correct_answer.id
                ) {
                    total++;
                }
            }
            const questionsLength = questions.data?.questions.length || 0;
            const score = ((total / questionsLength) * 100).toFixed();
            const userResult: SubmitQuiz = {
                score: parseInt(score),
                responses: userAnswers.filter(
                    (answer) => answer.answer_id != NIL
                ),
            };
            setScore(parseInt(score)!);

            setSubmitted(true);
            sendData(userResult);
        } else {
            toast.warn("Questions not found");
        }
    }

    if (error) {
        return <h1>Error!</h1>;
    }

    if (isLoading) {
        return (
            <div className='vh-100 w-100 d-flex align-items-center justify-content-center '>
                LOADING...
            </div>
        );
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
                <Helmet>
                    <title>Attempt Quiz | Quiz Craft</title>
                    <meta
                        name='description'
                        content='Complete a quiz and get your results!'
                    />
                </Helmet>

                <Card
                    data-bs-theme='dark'
                    className='col-12 col-md-6 mx-auto p-2 mt-3 border shadow-sm border-black'>
                    <Card.Title>{questions?.data?.title}</Card.Title>
                    <Card.Body>{questions?.data?.description}</Card.Body>
                </Card>
                <Form onSubmit={handleSubmit}>
                    {questions?.data?.questions.map((question, index) => (
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
