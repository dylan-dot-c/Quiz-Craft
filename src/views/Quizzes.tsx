import { getAllQuizzes } from "../lib/apiWrapper";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Quiz from "../components/Quiz";

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
        <div className='row mt-3 p-4 gap-5 justify-content-center     mx-auto'>
            {quizzes.map((quiz) => {
                return <Quiz key={quiz.quiz_id} quiz={quiz} />;
            })}
        </div>
    );
}

export default Quizzes;
