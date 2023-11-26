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
                    toast("Quizzes has been fetched");
                }
            } catch (err) {
                toast("An error occured");
            }
        }

        getData();
    }, []);
    return (
        <div className='row gap-3 mt-3 px-4'>
            {quizzes.map((quiz) => {
                return <Quiz key={quiz.quiz_id} quiz={quiz} />;
            })}
        </div>
    );
}

export default Quizzes;
