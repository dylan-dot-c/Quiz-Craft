import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { signUpUser } from "../lib/apiWrapper";
import { useNavigate, Link } from "react-router-dom";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPass: string;
};

function SignUp() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPass: "",
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
            const response = await signUpUser(formData);

            if (response) {
                toast.success("User Signed up successfully", {
                    type: "success",
                });
                navigate("/login");
            } else {
                toast.error("Failed to signup user");
            }
        } catch (err) {
            toast.error("Failed to sign up user", {
                type: "error",
            });
        }
    }

    return (
        <div className='bg'>
            <div className='container mx-auto mt-5   '>
                <div className='border border-1 col-md-8 col-12 mx-auto p-4 rounded-4 bg-white'>
                    <div className='text-center'>
                        <h1>SignUp</h1>
                        <p>
                            To get started in creating awesome online quizzes
                            sign up now!
                        </p>
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <div className='row justify-content-between'>
                            <Form.Group className='col-md-6'>
                                <Form.Label htmlFor='firstName'>
                                    First Name
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    id='firstName'
                                    name='firstName'
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className='col-md-6 col-12'>
                                <Form.Label htmlFor='lastName'>
                                    Last Name
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    id='lastName'
                                    name='lastName'
                                    required
                                    onChange={handleChange}
                                    value={formData.lastName}
                                />
                            </Form.Group>
                        </div>
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
                        <Form.Group className='mt-2'>
                            <Form.Label htmlFor='confirmPass'>
                                Confirm Password
                            </Form.Label>
                            <Form.Control
                                type='password'
                                id='confirmPass'
                                name='confirmPass'
                                onChange={handleChange}
                                value={formData.confirmPass}
                                required
                            />
                        </Form.Group>
                        <Button
                            variant='primary'
                            className='w-100 mt-2'
                            type='submit'
                            disabled={
                                formData.password == "" ||
                                formData.password != formData.confirmPass
                            }>
                            Sign Up
                        </Button>
                    </Form>
                    <p className='mt-3 text-secondary text-center '>
                        Already have an account? <Link to='/login'>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
