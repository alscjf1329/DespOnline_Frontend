import React, {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import "../CSS/Signup.css";
import backEndUri from "../Constants/Constants";
import SignupConfirm from "./SignupConfirm";

const Signup = () => {
    const [contentsHeight, setContentsHeight] = useState(100);
    const [contentsWidth, setContentsWidth] = useState(100);
    const [isIdConfirmed, setIsIdConfirmed] = useState(false);
    const [isPasswordMatchedMessage, setIsPasswordMatchedMessage] = useState("");
    const [isPasswordMatched, setIsPasswordMatched] = useState(false);
    const [isSignupConfirmNeeded, setIsSignupConfirmNeeded] = useState(false); // 로딩 상태 추가
    const contentsRef = useRef(null);

    useEffect(() => {
        const updateSize = () => {
            const newHeight = window.innerHeight;
            const newWidth = window.innerWidth;
            setContentsHeight(newHeight);
            setContentsWidth(newWidth);
        };

        updateSize();
        window.addEventListener("resize", updateSize);

        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, []);

    const backgroundContainer = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 : contentsWidth,
        marginTop: contentsHeight * 0.05,
        marginBottom: contentsHeight * 0.3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20px",
        flexDirection: "column",
    };

    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const id = watch("id", "")
    const password = watch("password", "");
    const confirmedPassword = watch("confirmedPassword", "")

    const onSubmit = (data) => {
        setIsSignupConfirmNeeded(true)

    };

    const onConfirmIdDuplication = () => {
        const id = document.getElementById("id").value;
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: id}), // JSON 형식으로 데이터 변환
        };
        fetch(backEndUri.confirmIdExistence, requestOptions)
            .then((res) => {
                if (!res.ok) {
                    alert("이미 존재하는 ID입니다.");
                    setIsIdConfirmed(false);
                } else {
                    alert("사용 가능한 ID입니다.");
                    setIsIdConfirmed(true);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        if (password === "" || confirmedPassword === "") {
            return
        }
        if (password !== confirmedPassword) {
            setIsPasswordMatchedMessage("비밀번호가 일치하지 않습니다.");
            setIsPasswordMatched(false)
        } else {
            setIsPasswordMatchedMessage("비밀번호가 일치합니다.");
            setIsPasswordMatched(true)
        }
    }, [password, confirmedPassword, watch]);

    return (
        <div ref={contentsRef} className="contents">
            <div style={backgroundContainer}>
                {
                    isSignupConfirmNeeded ?
                        <SignupConfirm id={id} password={password}/> :
                        <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
                            <h2 className="signup-heading">회원가입</h2>

                            <div className="signup-input-container">
                                <label htmlFor="id" className="signup-label">
                                    아이디
                                </label>
                                <input
                                    id="id"
                                    {...register("id", {required: "아이디를 입력하세요"})}
                                    type="text"
                                    className="signup-input-field-id"
                                    disabled={isIdConfirmed}
                                />
                                <button
                                    id="idDuplicationConfirmButton"
                                    type="button"
                                    onClick={onConfirmIdDuplication}
                                    className="signup-id-duplication-confirm-button"
                                >
                                    중복확인
                                </button>
                                {errors.id && <p className="error-message">{errors.id.message}</p>}
                            </div>

                            <div className="signup-input-container">
                                <label htmlFor="password" className="signup-label">
                                    비밀번호
                                </label>
                                <input
                                    id="password"
                                    {...register("password", {
                                        required: "비밀번호를 입력하세요",
                                        minLength: {
                                            value: 6,
                                            message: "비밀번호는 최소 6자 이상이어야 합니다",
                                        },
                                    })}
                                    type="password"
                                    className="signup-input-field-password"
                                />
                                {errors.password && (
                                    <p className="error-message">{errors.password.message}</p>
                                )}
                            </div>
                            <div className="signup-input-container">
                                <label htmlFor="confirmedPassword" className="signup-label">
                                    비밀번호 확인
                                </label>
                                <input
                                    id="confirmedPassword"
                                    {...register("confirmedPassword", {
                                        required: "다시 비밀번호를 입력하세요",
                                        validate: (value) =>
                                            value === password ? null : "비밀번호가 일치하지 않습니다.",
                                    })}
                                    type="password"
                                    className="signup-input-field-confirmedPassword"
                                />
                                {errors.confirmedPassword && (
                                    <p className="error-message">
                                        {errors.confirmedPassword.message}
                                    </p>
                                )}
                                {isPasswordMatched ?
                                    <p className="signup-correct-message">{isPasswordMatchedMessage}</p> :
                                    <p className="error-message">{isPasswordMatchedMessage}</p>
                                }
                            </div>

                            <button type="submit" className="signup-button">
                                다음
                            </button>
                        </form>

                }
            </div>
        </div>
    );
};

export default Signup;
