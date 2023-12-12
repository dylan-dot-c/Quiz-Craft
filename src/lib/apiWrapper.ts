import axios from "axios";

let baseURL: string;
if (import.meta.env.PROD) {
    baseURL = import.meta.env.VITE_PROD_API + "/api";
} else {
    baseURL = import.meta.env.VITE_DEV_API + "/api";
}
console.log(import.meta.env.PROD);

const apiClientNoAuth = () => {
    return axios.create({
        baseURL: baseURL,
    });
};

const apiClientBasicAuth = (username: string, password: string) =>
    axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: "Basic " + btoa(`${username}:${password}`),
        },
    });

const apiClientTokenAuth = (token: string) =>
    axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: "Bearer " + token,
        },
    });

async function signUpUser(userData: User): Promise<APIResponse<any>> {
    let data, error, response;

    try {
        response = await apiClientNoAuth().post("/user/new", userData);
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "Someting is sus";
        }
    }

    return { data, error };
}
const loginUser = async (
    email: string,
    password: string
): Promise<APIResponse<User>> => {
    let data, error;

    try {
        const response = await apiClientBasicAuth(email, password).post(
            "/user/login"
        );

        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 401) {
                // Handle 401 Unauthorized error
                error = "Invalid email or password";
            } else {
                // Handle other Axios errors
                error = err.message;
            }
        } else {
            // Handle non-Axios errors
            error = "Something sus has happened";
        }
    }

    return { data, error };
};

async function updateUser(token: string, user: User) {
    let data, error;

    try {
        const response = await apiClientTokenAuth(token).put(
            "/user/update",
            user
        );
        if (response.data) {
            data = response.data;
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "Something sus has happened";
        }
    }

    return { data, error };
}

const deleteUser = async (token: string) => {
    let data, error;

    try {
        const response = await apiClientTokenAuth(token).delete("/user/delete");
        if (response.data) {
            data = response.data;
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "Something sus has happened";
        }
    }

    return { data, error };
};

async function getUserInfo(token: string): Promise<APIResponse<User>> {
    let data, error;

    try {
        const response = await apiClientTokenAuth(token).get("/user/token");
        if (response.data) {
            data = response.data;
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "Something sus has happened";
        }
    }
    return { data, error };
}

const getAllQuizzes = async (): Promise<APIResponse<QuizType[]>> => {
    let data, error;

    try {
        const response = await apiClientNoAuth().get("/quiz/all");

        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "Something weird happened";
        }
    }

    return { data, error };
};

const publishQuiz = async (token: string, quiz_id: number) => {
    let data, error;
    try {
        const response = await apiClientTokenAuth(token).post(
            "/quiz/publish/" + quiz_id
        );
        if (response.data) {
            data = response.data;
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "Something weird happened";
        }
    }

    return { data, error };
};

const unpublishQuiz = async (token: string, quiz_id: number) => {
    let data, error;
    try {
        const response = await apiClientTokenAuth(token).post(
            "/quiz/unpublish/" + quiz_id
        );
        if (response.data) {
            data = response.data;
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "Something weird happened";
        }
    }

    return { data, error };
};
const getQuestionsForQuiz = async (
    quiz_id: number
): Promise<APIResponse<QuestionResponse>> => {
    let data, error;

    try {
        const response = await apiClientNoAuth().get(
            "quiz/question/" + quiz_id
        );
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "Something weird happened";
        }
    }

    return { data, error };
};

const deleteQuiz = async (
    token: string,
    quiz_id: number
): Promise<APIResponse<{ msg: string }>> => {
    let data, error;

    try {
        const response = await apiClientTokenAuth(token).delete(
            "/quiz/delete/" + quiz_id
        );
        if (response.data) {
            data = response.data;
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "Something weird happened";
        }
    }

    return { data, error };
};

async function submitAnswers(
    token: string,
    answerPayload: SubmitQuiz,
    quiz_id: number
): Promise<APIResponse<Record<string, string>>> {
    let data, error;

    try {
        const response = await apiClientTokenAuth(token).post(
            "/quiz/submit/" + quiz_id,
            answerPayload
        );
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "Something weird happened";
        }
    }

    return { data, error };
}

async function getUserQuizzes(token: string): Promise<APIResponse<UserQuiz[]>> {
    let data, error;

    try {
        const response = await apiClientTokenAuth(token).get(
            "/quiz/user-quizzes"
        );
        if (response.data) {
            data = response.data.data;
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "Something weird happened";
        }
    }

    return { data, error };
}

async function addNewQuiz(
    token: string,
    description: string,
    title: string
): Promise<APIResponse<NewQuizResponse>> {
    let data, error;

    try {
        const response = await apiClientTokenAuth(token).post("/quiz/new", {
            title,
            description,
        });
        if (response.data) {
            data = response.data;
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "Something weird happened";
        }
    }

    return { data, error };
}

async function getQuestionsForQuizEdit(
    token: string,
    quiz_id: number
): Promise<APIResponse<QuestionResponse>> {
    let data, error;

    try {
        const response = await apiClientTokenAuth(token).get(
            "quiz/edit/" + quiz_id
        );
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "Something weird happened";
        }
    }

    return { data, error };
}

async function addQuestions(
    token: string,
    quiz_id: number,
    questionsInfo: QuestionResponse
) {
    let data, error;
    const questions = questionsInfo.questions;

    const postQuestions = questions.map((question) => {
        const answers = [...question.incorrect_answers].map((answer) => {
            return {
                id: answer.id,
                text: answer.text,
                correct: false,
            };
        });
        const correct_answer = question.correct_answer;
        answers.push({
            id: correct_answer.id,
            text: correct_answer.text,
            correct: true,
        });
        return {
            question: question.question,
            id: question.question_id,
            answers: answers,
        };
    });

    try {
        const response = await apiClientTokenAuth(token).post(
            "/quiz/questions/add/" + quiz_id,
            {
                questions: postQuestions,
                description: questionsInfo.description,
                title: questionsInfo.title,
            }
        );
        if (response.data) {
            data = response.data;
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "Something weird happened";
        }
    }

    return { data, error };
}

export {
    signUpUser,
    loginUser,
    getUserInfo,
    updateUser,
    deleteUser,
    getAllQuizzes,
    deleteQuiz,
    getQuestionsForQuiz,
    publishQuiz,
    unpublishQuiz,
    submitAnswers,
    getUserQuizzes,
    addNewQuiz,
    getQuestionsForQuizEdit,
    addQuestions,
};
