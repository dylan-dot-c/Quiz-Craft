import { getAllQuizzes } from "../lib/apiWrapper";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Quiz from "../components/Quiz";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function Quizzes() {
    const [quizzes, setQuizzes] = useState<QuizType[]>([]);

    useEffect(() => {
        async function getData() {
            try {
                const response = await getAllQuizzes();
                if (response.data) {
                    setQuizzes(response.data);
                }
            } catch (err) {
                toast.error("Error getting quizzes");
            }
        }

        getData();
    }, []);
    return (
        <Container>
            <Row xs={1} md={2} lg={3} className='g-4 my-4'>
                {quizzes.map((quiz) => {
                    return (
                        <Col key={quiz.quiz_id}>
                            <Quiz key={quiz.quiz_id} quiz={quiz} />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default Quizzes;
