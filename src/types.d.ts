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

type Person = {
    firstName: string;
    lastName: string;
    id: number;
};

type QuizType = {
    quiz_id: number;
    title: string;
    description: string;
    questions: number;
    submissions: number;
    author: Person;
};

type QuizQuestion = {
    question: string;
    question_id: string;
    correct_answer: Answer;
    incorrect_answers: Answer[];
};

type Answer = {
    id: string;
    text: string;
    correct?: boolean;
};

type UserAnswer = {
    question_id: string;
    answer_id: string;
};

type SubmitQuiz = {
    score: number;
    responses: UserAnswer[];
};
type QuestionResponse = {
    description: string;
    title: string;
    questions: QuizQuestion[];
};

type UserQuiz = {
    quiz_id: number;
    title: string;
    description: string;
    total_questions: number;
    submissions: number;
    published: boolean;
};

type NewQuizResponse = {
    msg: string;
    id: number;
};

type Category = {
    id: number;
    name: string;
};

type CategoryResponse = {
    trivia_categories: Category[];
};

type TriViaQuestion = {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

type TriviaResponse = {
    response_code: number;
    results: TriViaQuestion[];
};

type SubmissionResponse = {
    score: number;
    submission_id: number;
    date_submitted: string;
    user: Person;
};
