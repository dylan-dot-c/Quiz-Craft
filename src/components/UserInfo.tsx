import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useUser } from "../contexts/userContext";
import Form from "react-bootstrap/Form";
import { deleteUser, updateUser } from "../lib/apiWrapper";
import { toast } from "react-toastify";

function UserInfo() {
    const { user, logout } = useUser();
    const [userData, setUserData] = useState<User>(user!);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setUserData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    }

    async function handleDelete() {
        const token = localStorage.getItem("token") || "";

        const del = confirm(
            "Are you sure you want to delete your account? This action can't be undone and all related information will be deleted as well."
        );
        if (del) {
            try {
                const response = await deleteUser(token);

                if (response) {
                    toast.warn("User has been deleted!");
                    logout();
                }
            } catch (err) {
                toast.error("Failed to delete your account");
            }
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        const token = localStorage.getItem("token") || "";
        e.preventDefault();

        try {
            const response = await updateUser(token, userData);
            if (response.data) {
                toast.success("User information has been updated");
                logout();
            }
        } catch (err) {
            toast("Failed to update user");
        }
    }

    return (
        <div className='w-75'>
            <h1>Edit My Account</h1>

            <Form onSubmit={handleSubmit} className='col-md-9 col-sm-12'>
                <Form.Group className='mt-3'>
                    <Form.Label className='fw-bold '>First Name</Form.Label>
                    <Form.Control
                        required
                        onChange={handleChange}
                        name='firstName'
                        value={userData.firstName}
                    />
                </Form.Group>
                <Form.Group className='mt-3'>
                    <Form.Label className='fw-bold '>Last Name</Form.Label>
                    <Form.Control
                        required
                        onChange={handleChange}
                        name='lastName'
                        value={userData.lastName}
                    />
                </Form.Group>
                <Form.Group className='mt-3'>
                    <Form.Label className='fw-bold '>Email</Form.Label>
                    <Form.Control
                        disabled
                        required
                        onChange={handleChange}
                        name='email'
                        value={userData.email}
                    />
                    <Button
                        type='submit'
                        variant='warning'
                        className='w-100 mt-3'>
                        Save Changes
                    </Button>
                </Form.Group>
                <div className=''>
                    <Button
                        className='mt-3 w-100'
                        variant='danger'
                        onClick={handleDelete}>
                        Delete User
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default UserInfo;
