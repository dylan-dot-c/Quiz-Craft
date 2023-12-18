import { getUserQuizzes } from "../lib/apiWrapper";
import QuizCard from "./QuizCard";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PatchQuestionFill } from "react-bootstrap-icons";

function UserQuizzes() {
    const [quizzes, setUserQuizzes] = useState<UserQuiz[]>([]);

    async function getData() {
        try {
            const token = localStorage.getItem("token") || "";
            const response = await getUserQuizzes(token);
            console.log(response);
            if (response.data) {
                setUserQuizzes(response.data);
            }
        } catch (err) {
            toast.error("Some Error Occured");
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Row xs={1} md={2} lg={2} className='g-4'>
            {quizzes.length == 0 && (
                <h1 className='text-center fs-6 text-secondary '>
                    <PatchQuestionFill size={30} color={"blue"} /> <br />
                    You currently have no quizzes. <br /> Click + to create one
                    now
                </h1>
            )}
            {quizzes.map((quiz) => {
                return (
                    <Col key={quiz.quiz_id}>
                        <QuizCard quiz={quiz} getData={getData} />
                    </Col>
                );
            })}
        </Row>
    );
}

export default UserQuizzes;
