
import { useRef } from "react";
import { getPuja, getPujaById } from "../state/pujaAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const useLandingHook = () => {
    const sendBtnRef = useRef()
    const textAreaRef = useRef()
    const handleSend= () => {
        console.log("Send message");
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return {
        sendBtnRef,
        handleSend,
        textAreaRef,
        getPuja,
        getPujaById,
        dispatch,
        navigate
    }
}

export default useLandingHook;