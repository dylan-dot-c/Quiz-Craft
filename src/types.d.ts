type User = {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    id?: number;
    readonly token?: string;
};

type APIResponse<T> = {
    data?: T;
    error?: string;
    msg?: string;
};

type QuizType = {
    quiz_id: number;
    title: string;
    description: string;
    questions: number;
    submissions: number;
    author: {
        firstName: string;
        lastName: string;
        id: number;
    };
};

type QuizQuestion = {
    question: string;
    question_id: number;
    correct_answer: Answer;
    incorrect_answers: Answer[];
};

type Answer = {
    id: number;
    text: string;
};

type UserAnswer = {
    question_id: number;
    answer_id: number;
};

type SubmitQuiz = {
    score: number;
    responses: UserAnswer[];
};
type QuestionResponse = {
    questions: QuizQuestion[];
};
