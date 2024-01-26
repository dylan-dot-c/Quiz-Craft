import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import { ClipboardCheck, Pencil, Trash3 } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteQuiz, publishQuiz, unpublishQuiz } from "../lib/apiWrapper";
import Form from "react-bootstrap/Form";

type QuizCardProps = {
    quiz: UserQuiz;
    getData: () => void;
};
function QuizCard({ quiz, getData }: QuizCardProps) {
    function copyQuizLink(quiz_id: number) {
        const url = window.location.origin + "/#/quizzes/" + quiz_id;
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
                <span className='fw-bold'>{quiz.title}</span>{" "}
                <ToggleQuizVisibility
                    published={quiz.published}
                    quiz_id={quiz.quiz_id}
                    callback={getData}
                />
            </Card.Header>
            <Card.Body>
                <Card.Text>{quiz.description}</Card.Text>
                <div className='d-flex justify-content-end '>
                    <ButtonGroup className='end-0'>
                        <Link to={`/dashboard/quizzes/edit/${quiz.quiz_id}`}>
                            <Button title='Edit Quiz' variant=''>
                                <Pencil size={20} color='orange' />
                            </Button>
                        </Link>
                        <Button
                            variant=''
                            title='Delete Quiz'
                            onClick={() => {
                                const result = confirm(
                                    `Are you sure you want to delete the ${quiz.title} quiz? If so, all related information will be deleted. This can't be undone.`
                                );
                                if (result) {
                                    handleDeleteQuiz(quiz.quiz_id);
                                }
                            }}>
                            <Trash3 size={20} color={"red"} />
                        </Button>
                        <Button
                            variant=''
                            onClick={() => copyQuizLink(quiz.quiz_id)}
                            title='Copy Quiz'>
                            <ClipboardCheck size={20} color={"blue"} />
                        </Button>
                    </ButtonGroup>
                </div>
            </Card.Body>
        </Card>
    );
}

export default QuizCard;

export function ToggleQuizVisibility({
    published,
    quiz_id,
    callback,
}: {
    published: boolean;
    quiz_id: number;
    callback?: () => void;
}) {
    async function handleChange() {
        if (published) {
            try {
                const token = localStorage.getItem("token") || "";
                const response = await unpublishQuiz(token, quiz_id);
                if (response.data) {
                    toast.warn("Quiz has been Taken Down");
                    if (callback) {
                        callback();
                    }
                } else {
                    toast.error("Failed to publish quiz");
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const token = localStorage.getItem("token") || "";
                const response = await publishQuiz(token, quiz_id);
                if (response.data) {
                    toast.success("Quiz has been published");
                    if (callback) {
                        callback();
                    }
                } else {
                    toast.error("Failed to publish quiz");
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <div className='d-flex gap-1 align-items-center  '>
            <Form.Label className='mb-0' htmlFor='public'>
                Public
            </Form.Label>{" "}
            <Form.Check
                checked={published}
                id='public'
                type='switch'
                onChange={handleChange}
            />
        </div>
    );
}
