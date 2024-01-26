import { useUser } from "../contexts/userContext";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import AddNewQuestionModal from "../components/AddNewQuizModal";
import { PlusCircleFill } from "react-bootstrap-icons";
import UserQuizzes from "../components/UserQuizzes";
import { Helmet } from "react-helmet";

function DashBoard() {
    const [showModal, setShowModal] = useState(false);
    const { user } = useUser();

    return (
        <div className='container mx-auto mt-3'>
            <Helmet>
                <title>Dashboard | Quiz Craft</title>
            </Helmet>
            <div className='col'>
                <h2 className='fs-5 d-block my-2 text-secondary'>
                    Welcome Back,{" "}
                    <span className='text-success fs-3'>
                        {user && (
                            <>
                                {user.firstName},{user.lastName}
                            </>
                        )}
                    </span>
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
                    <UserQuizzes />
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
