import React, {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import "../CSS/Signin.css";
import backEndUri from "../Constants/Constants";

const Signin = () => {
    const [contentsHeight, setContentsHeight] = useState(100);
    const [contentsWidth, setContentsWidth] = useState(100);
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [passwordValue, setPasswordValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20px",
        flexDirection: "column",
    };

    const handlePasswordChange = (e) => {
        setPasswordValue(e.target.value); // 비밀번호 상태(state) 업데이트
    };

    const inputIdContainer = (<input
        id="id"
        {...register('id', {required: '아이디를 입력하세요'})}
        type="text"
        className="input-field"
    />)

    const inputPasswordContainer = (<input
        id="password"
        {...register('password', {
            required: '비밀번호를 입력하세요',
            minLength: {value: 6, message: '비밀번호는 최소 6자 이상이어야 합니다'}
        })}
        type="password"
        className="input-field"
        value={passwordValue}
        onChange={handlePasswordChange}
    />)

    const onSubmit = (data) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data) // JSON 형식으로 데이터 변환
        };
        // post 요청 보내기
        fetch(backEndUri.signin, requestOptions)
            .then(res => {
                if (!res.ok) {
                    setPasswordValue("")
                    setErrorMessage("로그인에 실패했습니다.")
                    throw new Error('Network response was not ok');
                }
                navigate("/eventPage"); // 페이지 이동
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div ref={contentsRef} className="contents">
            <div style={backgroundContainer}>
                <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
                    <h2 className="heading">로그인</h2>

                    <div className="input-container">
                        <label htmlFor="id" className="label">아이디</label>
                        {inputIdContainer}
                        {errors.id && (
                            <p className="error-message">{errors.id.message}</p>
                        )}
                    </div>

                    <div className="input-container">
                        <label htmlFor="password" className="label">비밀번호</label>
                        {inputPasswordContainer}
                        {errors.password && (
                            <p className="error-message">{errors.password.message}</p>
                        )}
                    </div>

                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}
                    <button type="submit" className="button">
                        로그인
                    </button>
                </form>
                <SiteInfo width={contentsWidth} height={contentsHeight}/>
            </div>
        </div>
    );
};

export default Signin;
