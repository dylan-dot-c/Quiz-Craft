import { useState, useEffect } from "react";
import { getUserQuizzes } from "../lib/apiWrapper";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function SubmissionTable() {
    const [quizzes, setUserQuizzes] = useState<UserQuiz[]>([]);

    async function getData() {
        try {
            const token = localStorage.getItem("token") || "";
            const response = await getUserQuizzes(token);
            console.log(response);
            if (response.data) {
                setUserQuizzes(response.data);
            } else {
                throw Error("Something went wrong");
            }
        } catch (err) {
            console.log(typeof err);
            toast.error(err as string);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <h2>My Submissions</h2>
            <p>
                Table showing all quizzes and how many submissions you have
                received for each.
            </p>
            {quizzes.length == 0 ? (
                <p>No Quizzes for you!</p>
            ) : (
                <Table striped>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Published</th>
                            <th>Questions</th>
                            <th>Submissions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizzes.map((quiz) => {
                            return (
                                <tr key={quiz.quiz_id}>
                                    <td>
                                        <b>{quiz.title}</b>
                                    </td>
                                    <td className='text-secondary'>
                                        {quiz.description.slice(0, 20)}...
                                    </td>
                                    <td>{`${quiz.published}`.toUpperCase()}</td>
                                    <td>{quiz.total_questions}</td>
                                    <td>{quiz.submissions}</td>
                                    <td>
                                        <Link
                                            to={`/dashboard/submissions/quiz/${quiz.quiz_id}`}>
                                            View Submissions
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default SubmissionTable;
