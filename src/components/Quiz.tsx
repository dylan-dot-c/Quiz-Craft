import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

type QuizProps = {
    quiz: QuizType;
};

function Quiz({ quiz }: QuizProps) {
    const { firstName, lastName } = quiz.author;
    return (
        <>
            <Card
                className=' col-12 col-md-4 rounded-3 shadow-lg '
                data-bs-theme='dark'>
                <Card.Header className='d-flex justify-content-between '>
                    <span>Quiz</span>
                    <span>Submissions: {quiz.submissions}</span>
                    <span>Questions: {quiz.questions}</span>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{quiz.title}</Card.Title>

                    <Card.Text>{quiz.description}</Card.Text>

                    <Link to={"/quiz/" + quiz.quiz_id}>
                        <Button variant='primary'>Attempt Quiz </Button>
                    </Link>
                </Card.Body>
                <Card.Footer>
                    <Card.Text>Made By {firstName + " " + lastName}</Card.Text>
                </Card.Footer>
            </Card>
        </>
    );
}

export default Quiz;
