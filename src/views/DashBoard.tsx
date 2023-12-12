import { useUser } from "../contexts/userContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getUserQuizzes, deleteQuiz } from "../lib/apiWrapper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import AddNewQuestionModal from "../components/AddNewQuizModal";
import UserInfo from "../components/UserInfo";
import PublishQuiz from "../components/PublishQuiz";
import UnPublishQuiz from "../components/UnPublishQuiz";

import {
    ClipboardCheckFill,
    PatchQuestionFill,
    PlusCircleFill,
} from "react-bootstrap-icons";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function DashBoard() {
    const [quizzes, setUserQuizzes] = useState<UserQuiz[]>([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { user } = useUser();
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

    async function handleDeleteQuiz(quiz_id: number) {
        const token = localStorage.getItem("token") || "";

        try {
            const response = await deleteQuiz(token, quiz_id);
            if (response.data) {
                toast.success(`Quiz id ${quiz_id} has been delete!`);
                getData();
            }
        } catch (err) {
            console.log(err);
            toast.warn("Failed to delete the quiz");
        }
    }

    useEffect(() => {
        if (!user) {
            toast.warn("Please login to continue");
            navigate("/login");
        }

        getData();
    }, []);

    function copyQuizLink(quiz_id: number) {
        const url = window.location.origin + "/#/quiz/" + quiz_id;
        try {
            navigator.clipboard.writeText(url);

            toast.success("Link has been copied to clipboard");
        } catch (err) {
            toast.error("Failed to copy link");
        }
    }

    if (!user) {
        return <p>You must be logged in to access this page</p>;
    }

    return (
        <div className='container mx-auto mt-3'>
            <div className='col'>
                <h1 className='btn cta cta-button fs-1'>Quiz Craft Studio</h1>
                <h2 className='fs-5 d-md-flex d-block my-2 justify-content-between '>
                    Welcome Back,{" "}
                    <span className='text-success'>
                        {user?.firstName} {user?.lastName}
                    </span>
                    <UserInfo />
                </h2>
                {showModal && (
                    <AddNewQuestionModal
                        show={showModal}
                        setShow={setShowModal}
                    />
                )}

                <div className='quizzes'>
                    <div className='d-flex gap-3'>
                        <h3>Your Quizzes</h3>
                        <Button onClick={() => setShowModal(true)}>
                            Add New Quiz <PlusCircleFill />
                        </Button>
                    </div>
                    <hr />
                    <div className='row gap-3'>
                        {quizzes.length == 0 && (
                            <h1 className='text-center fs-6 text-secondary '>
                                <PatchQuestionFill size={30} color={"blue"} />{" "}
                                <br />
                                You currently have no quizzes. <br /> Click + to
                                create one now
                            </h1>
                        )}
                        {quizzes.map((quiz) => {
                            return (
                                <Card
                                    className='col-md-5 col-12'
                                    key={quiz.quiz_id}>
                                    <Card.Header className='d-flex justify-content-between align-items-center '>
                                        <span>{quiz.title}</span>{" "}
                                        <ButtonGroup>
                                            {quiz.published ? (
                                                <UnPublishQuiz
                                                    quiz_id={quiz.quiz_id}
                                                    callback={getData}
                                                />
                                            ) : (
                                                <PublishQuiz
                                                    quiz_id={quiz.quiz_id}
                                                    callback={getData}
                                                />
                                            )}
                                            <Button
                                                variant='warning'
                                                onClick={() =>
                                                    copyQuizLink(quiz.quiz_id)
                                                }>
                                                Copy Link <ClipboardCheckFill />
                                            </Button>{" "}
                                        </ButtonGroup>
                                    </Card.Header>
                                    <Card.Body>
                                        {quiz.description}
                                        <br />
                                        <Link to={`/quiz/edit/${quiz.quiz_id}`}>
                                            <Button variant='outline-warning'>
                                                Edit Quiz
                                            </Button>
                                        </Link>
                                        <Button
                                            variant='danger'
                                            onClick={() =>
                                                handleDeleteQuiz(quiz.quiz_id)
                                            }>
                                            Delete Quiz
                                        </Button>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
