import Button from "react-bootstrap/Button";
import { publishQuiz } from "../lib/apiWrapper";
import { toast } from "react-toastify";
import { CloudArrowUp, CloudUploadFill } from "react-bootstrap-icons";
// import { ArrowRight } from "react-bootstrap-icons";

type Props = {
    quiz_id: number;
    callback?: () => void;
};

function PublishQuiz({ quiz_id, callback }: Props) {
    async function handleClick() {
        try {
            const token = localStorage.getItem("token") || "";
            const response = await publishQuiz(token, quiz_id);
            if (response.data) {
                toast.success("Quiz has been published");
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
        <Button variant='primary' onClick={handleClick}>
            Publish Quiz <CloudUploadFill />
        </Button>
    );
}

export default PublishQuiz;
