import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import { loginUser } from "../lib/apiWrapper";
import { Helmet } from "react-helmet";

type FormData = {
    email: string;
    password: string;
};

function Login() {
    const search = useLocation().search;
    // console.log(search);
    const params = new URLSearchParams(search);
    const { login } = useUser();
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData((prevData) => {
            const { name, value } = e.target;
            return {
                ...prevData,
                [name]: value,
            };
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            console.log("LOggind in");
            const response = await loginUser(formData.email, formData.password);
            console.log("LOggind in");
            console.log(response);

            if (response.data) {
                login(response.data);
                toast.success("User Logged In successfully", {
                    type: "success",
                });
                localStorage.setItem("token", response.data.token || "");
                const urlToNav = params.has("redirect_url")
                    ? params.get("redirect_url")
                    : "/dashboard";
                navigate(urlToNav as string);
            } else {
                throw response.error;
            }
        } catch (err) {
            console.log("Error is", err);
            toast.error(err as string, {
                type: "error",
            });
        }
    }

    return (
        <div className='bg'>
            <Helmet>
                <title>Login Page | Quiz Craft</title>
                <meta
                    name='description'
                    content='Login and get Started in crafting wonderful quizzes'
                />
            </Helmet>
            <div className='container mx-auto mt-5'>
                <div className='border border-1 col-md-6 col-12 mx-auto p-4 rounded-4 bg-white'>
                    <div className='text-center'>
                        <h1>Login</h1>
                        <p>
                            To get started in creating awesome online quizzes
                            login now!
                        </p>
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mt-2'>
                            <Form.Label htmlFor='email'>Email</Form.Label>
                            <Form.Control
                                type='email'
                                id='email'
                                name='email'
                                required
                                onChange={handleChange}
                                value={formData.email}
                            />
                        </Form.Group>
                        <Form.Group className='mt-2'>
                            <Form.Label htmlFor='password'>Password</Form.Label>
                            <Form.Control
                                type='password'
                                name='password'
                                id='password'
                                onChange={handleChange}
                                value={formData.password}
                                required
                            />
                        </Form.Group>

                        <Button
                            variant='primary'
                            className='w-100 mt-2'
                            type='submit'>
                            Login
                        </Button>
                    </Form>
                    <p className='mt-3 text-secondary text-center '>
                        Dont have an account? <Link to='/signup'>SIgn Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
