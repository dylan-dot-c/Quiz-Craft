import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";

type QuestionProps = {
    question: QuizQuestion;
    index: number;
    userAnswers: UserAnswer[];
    setAnswers: React.Dispatch<React.SetStateAction<UserAnswer[]>>;
};

function QuestionCard({
    question,
    index,
    userAnswers,
    setAnswers,
}: QuestionProps) {
    const [allAnswers, setAllAnswers] = useState<Answer[]>([]);

    useEffect(() => {
        const shuffledAnswers = [
            ...question.incorrect_answers,
            question.correct_answer,
        ].sort(() => Math.random() - 0.5);

        setAllAnswers(shuffledAnswers);

        if (
            !userAnswers.some(
                (answer) => answer.question_id === question.question_id
            )
        ) {
            setAnswers((prev) => [
                ...prev,
                { question_id: question.question_id, answer_id: -1 },
            ]);
        }
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target, e.target.name, e.target.value);
        setAnswers((prevAnswers) => {
            const newAnswers = prevAnswers.map((answer, aIndex) => {
                if (aIndex == index) {
                    return {
                        ...answer,
                        answer_id: parseInt(e.target.value!),
                    };
                } else {
                    return answer;
                }
            });
            return newAnswers;
        });
    }

    return (
        <Card className='col-6 mx-auto mt-4'>
            <Card.Body>
                <Card.Title>{question.question}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                    1 point
                </Card.Subtitle>
                {allAnswers.map((answer) => {
                    return (
                        <div key={answer.id + ""}>
                            <Form.Check
                                type='radio'
                                label={answer.text}
                                id={answer.id + ""}
                                name={question.question_id + ""}
                                required
                                value={answer.id}
                                checked={
                                    userAnswers[index]?.answer_id == answer.id
                                }
                                onChange={handleChange}
                            />
                        </div>
                    );
                })}
            </Card.Body>
        </Card>
    );
}

export default QuestionCard;
