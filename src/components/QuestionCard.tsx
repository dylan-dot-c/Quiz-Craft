import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { NIL as NIL_UUID } from "uuid";

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
                { question_id: question.question_id, answer_id: NIL_UUID },
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
                        answer_id: e.target.value!,
                    };
                } else {
                    return answer;
                }
            });
            return newAnswers;
        });
    }

    return (
        <Card className='col-md-6 col-12 mx-auto mt-4 border-secondary rounded-4'>
            <Card.Body>
                <Card.Title>{question.question}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                    1 point
                </Card.Subtitle>
                {allAnswers.map((answer) => {
                    return (
                        <div
                            key={answer.id + ""}
                            className='p-2 w-auto  rounded-4 bg-warning-subtle my-2'>
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
