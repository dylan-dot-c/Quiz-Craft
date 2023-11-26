import axios from "axios";

const baseURL = "http://127.0.0.1:5000/api";

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
            error = err.message;
        } else {
            error = "Something sus has happened";
        }
    }

    return { data, error };
};

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

export { signUpUser, loginUser, getAllQuizzes, getQuestionsForQuiz };