import { useUser } from "../contexts/userContext";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import AddNewQuestionModal from "../components/AddNewQuizModal";
import UserInfo from "../components/UserInfo";

import { PlusCircleFill } from "react-bootstrap-icons";
import UserQuizzes from "../components/UserQuizzes";

function DashBoard() {
    const [showModal, setShowModal] = useState(false);
    const { user } = useUser();

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
                    <UserQuizzes />
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
