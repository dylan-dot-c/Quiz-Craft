import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import PublishQuiz from "../components/PublishQuiz";
import UnPublishQuiz from "../components/UnPublishQuiz";
import { ClipboardCheckFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteQuiz } from "../lib/apiWrapper";

type QuizCardProps = {
    quiz: UserQuiz;
    getData: () => void;
};
function QuizCard({ quiz, getData }: QuizCardProps) {
    function copyQuizLink(quiz_id: number) {
        const url = window.location.origin + "/#/quiz/" + quiz_id;
        try {
            navigator.clipboard.writeText(url);

            toast.success("Link has been copied to clipboard");
        } catch (err) {
            toast.error("Failed to copy link");
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
    return (
        <Card key={quiz.quiz_id}>
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
                        onClick={() => copyQuizLink(quiz.quiz_id)}>
                        Copy Link <ClipboardCheckFill />
                    </Button>{" "}
                </ButtonGroup>
            </Card.Header>
            <Card.Body>
                <Card.Text>{quiz.description}</Card.Text>

                <Link to={`/quiz/edit/${quiz.quiz_id}`}>
                    <Button variant='outline-warning'>Edit Quiz</Button>
                </Link>
                <Button
                    variant='danger'
                    onClick={() => handleDeleteQuiz(quiz.quiz_id)}>
                    Delete Quiz
                </Button>
            </Card.Body>
        </Card>
    );
}

export default QuizCard;
