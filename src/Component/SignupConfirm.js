import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import "../CSS/Signin.css";
import backEndUri from "../Constants/Constants";
import {useNavigate} from "react-router-dom";
import "../CSS/SignupConfirm.css"

const SignupConfirm = (signupData) => {
    const [contentsHeight, setContentsHeight] = useState(100);
    const [contentsWidth, setContentsWidth] = useState(100);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const navigate = useNavigate();

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

    const {register, handleSubmit, formState: {errors}} = useForm();
    const backgroundContainer = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 : contentsWidth,
        marginTop: contentsHeight * 0.05,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20px",
        flexDirection: "column",
    };

    const onSubmit = (data) => {
        setIsLoading(true); // 폼 제출 시 로딩 상태 활성화
        const payload = {
            nickname: data.nickname,
            authenticationCode: data.authenticationCode,
            id: signupData.id,
            password: signupData.password
        }
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload), // JSON 형식으로 데이터 변환
            credentials: "include",
        };
        // post 요청 보내기
        fetch(backEndUri.signup, requestOptions)
            .then((res) => {
                setIsLoading(false)
                if (!res.ok) {
                    res.text().then((message) => alert(message));
                } else {
                    navigate("/signin")
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div style={backgroundContainer}>
            <div className={isLoading ? "loading-overlay" : ""}>
                {isLoading && ( // 로딩 중일 때 로딩 화면 표시
                    <div className="loading">인증 중...</div>
                )}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
                <h2 className="heading">서버 유저 인증</h2>
                <div className="input-container">
                    <label htmlFor="nickname" className="label">닉네임</label>
                    <input
                        id="nickname"
                        {...register('nickname', {required: '닉네임을 입력하세요'})}
                        type="text"
                        className="input-field"
                        placeholder="마크 서버 닉네임 입력"
                    />
                    {errors.nickname && (
                        <p className="error-message">{errors.nickname.message}</p>
                    )}
                </div>

                <div className="input-container">
                    <label htmlFor="authenticationCode" className="label">인증 코드</label>
                    <input
                        id="authenticationCode"
                        {...register('authenticationCode', {required: '인증 코드를 입력하세요'})}
                        type="password"
                        className="input-field"
                        placeholder="/token으로 발급받은 인증코드 입력"
                    />
                    {errors.authenticationCode && (
                        <p className="error-message">{errors.authenticationCode.message}</p>
                    )}
                </div>

                <button type="submit" className="button">
                    회원가입
                </button>
            </form>
        </div>
    );
};

export default SignupConfirm;