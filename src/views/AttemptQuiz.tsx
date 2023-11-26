import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getQuestionsForQuiz } from "../lib/apiWrapper";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import QuestionCard from "../components/QuestionCard";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

type Params = {
    id: number;
};
function AttemptQuiz() {
    const { id } = useParams();
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getQuestionsForQuiz(parseInt(id!));
                if (response.data) {
                    setQuestions(response.data.questions);
                    toast("Questions fetched");
                    console.log(response.data);
                }
            } catch (err) {
                toast("Some error");
            }
        }

        fetchData();
    }, []);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        let total = 0;
        for (let question of questions) {
            const answer = userAnswers.find(
                (answer_) => answer_.question_id == question.question_id
            );
            if (answer?.answer_id == question.correct_answer.id) {
                total++;
            }
        }

        let score = ((total / questions.length) * 100).toFixed();
        toast("Congrats! Your score is " + score);
    }
    return (
        <Container>
            <form onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                    <QuestionCard
                        key={index}
                        question={question}
                        index={index}
                        userAnswers={userAnswers}
                        setAnswers={setUserAnswers}
                    />
                ))}
                <Button variant='primary' className='mx-auto' type='submit'>
                    Submit Quiz
                </Button>
            </form>
        </Container>
    );
}

export default AttemptQuiz;
