import Card from "react-bootstrap/Card";

type SubmissionCardProps = {
    submission: SubmissionResponse;
};

const SubmissionCard = ({ submission }: SubmissionCardProps) => {
    const date = new Date(submission.date_submitted);
    const { score } = submission;
    let color = "";
    if (score >= 75) {
        color = "success";
    } else if (score > 50 && score < 75) {
        color = "warning";
    } else {
        color = "danger";
    }
    console.log(date);
    return (
        <Card className={`border-${color}`}>
            <Card.Body>
                <Card.Title>{submission.user.firstName}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                    {submission.date_submitted}
                </Card.Subtitle>
                <Card.Text className={`text-${color} fs-3`}>
                    Score: {submission.score}%
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default SubmissionCard;
