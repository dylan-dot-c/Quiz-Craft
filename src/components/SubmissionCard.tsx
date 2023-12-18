import Card from "react-bootstrap/Card";

type SubmissionCardProps = {
    submission: SubmissionResponse;
};

const SubmissionCard = ({ submission }: SubmissionCardProps) => {
    const date = new Date(submission.date_submitted);
    console.log(date);
    return (
        <Card>
            <Card.Body>
                <Card.Title>{submission.user.firstName}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                    {submission.date_submitted}
                </Card.Subtitle>
                <Card.Text>{submission.score}</Card.Text>
                <Card.Link href='#'>Card Link</Card.Link>
                <Card.Link href='#'>Another Link</Card.Link>
            </Card.Body>
        </Card>
    );
};

export default SubmissionCard;
