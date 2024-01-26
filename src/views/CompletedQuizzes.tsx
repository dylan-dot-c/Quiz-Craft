import { useEffect, useState } from "react";
import { getUserSubmissions } from "../lib/apiWrapper";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";

function CompletedQuizzes() {
    const [submissions, setSubmissions] = useState<UserSubmission[]>([]);

    useEffect(() => {
        async function getData() {
            const token = localStorage.getItem("token") || "";
            try {
                const result = await getUserSubmissions(token);
                if (result.data) {
                    setSubmissions(result.data.submissions);
                    console.log(result);
                }
            } catch (err) {
                toast.error("Some error OCcured");
            }
        }

        getData();
    }, []);
    return (
        <div>
            <h1>My Submissions</h1>
            {submissions.length == 0 && <p>No Submitted Questions as yet!</p>}

            <Table striped>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((sub, index) => {
                        return (
                            <tr key={index}>
                                <td>{sub.quiz_title}</td>
                                <td>{sub.author}</td>
                                <td>{sub.grade}</td>
                                <td>{sub.date.slice(0, -3)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default CompletedQuizzes;
