import Button from "react-bootstrap/Button";
import { unpublishQuiz } from "../lib/apiWrapper";
import { toast } from "react-toastify";
import { CloudArrowDownFill } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";

type Props = {
    quiz_id: number;
    callback?: () => void;
};

function UnPublishQuiz({ quiz_id, callback }: Props) {
    async function handleClick() {
        try {
            const token = localStorage.getItem("token") || "";
            const response = await unpublishQuiz(token, quiz_id);
            if (response.data) {
                toast.warn("Quiz has been Taken Down");
                if (callback) {
                    callback();
                }
            } else {
                toast.error("Failed to publish quiz");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        
    );
}

export default UnPublishQuiz;
