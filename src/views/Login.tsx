import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import { loginUser } from "../lib/apiWrapper";

type FormData = {
    email: string;
    password: string;
};

function Login() {
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
            const response = await loginUser(formData.email, formData.password);

            if (response.data) {
                login(response.data);
                toast("User Logged In successfully", {
                    type: "success",
                });
                localStorage.setItem("token", response.data?.token!);
                navigate("/");
            }
        } catch (err) {
            toast("Failed to login user", {
                type: "error",
            });
        }
    }

    return (
        <div className='container mx-auto mt-5 '>
            <div className='border border-1 w-100 w-md-50 mx-auto p-4 rounded-4'>
                <div className='text-center'>
                    <h1>Login</h1>
                    <p>
                        To get started in creating awesome online quizzes login
                        now!
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
            </div>
        </div>
    );
}

export default Login;
