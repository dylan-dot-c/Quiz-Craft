import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSubmissions } from "../lib/apiWrapper";
import { toast } from "react-toastify";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SubmissionCard from "../components/SubmissionCard";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";

function Submissions() {
    const { quiz_id } = useParams();
    const [submissions, setSubmissions] = useState<SubmissionResponse[]>();

    useEffect(() => {
        async function getQuestions(id: string) {
            const token = localStorage.getItem("token") || "";
            try {
                const response = await getSubmissions(token, id);
                console.log(response);
                if (response.data) {
                    setSubmissions(response.data);
                } else {
                    throw Error("Failed to get Data");
                }
            } catch (err) {
                toast("Failed to get submissions");
            }
        }

        getQuestions(quiz_id!);
    }, []);

    return (
        <Container className='mt-4'>
            <Helmet>
                <title>Submissions | Quiz Craft</title>
            </Helmet>
            <Button
                variant={"secondary"}
                className='my-2'
                onClick={() => history.back()}>
                Go Back
            </Button>

            <Row xs={1} md={2} lg={3} className='g-4'>
                {submissions?.map((submission) => {
                    return (
                        <Col key={submission.submission_id}>
                            <SubmissionCard submission={submission} />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default Submissions;
