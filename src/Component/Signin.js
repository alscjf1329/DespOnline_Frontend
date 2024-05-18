import React, {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import "../CSS/Signin.css";
import backEndUri from "../Constants/Constants";
import SiteInfo from "./SiteInfo";
import {useDispatch} from "react-redux";
import {login} from '../auth/authSlice';
import routingPath from "../Constants/PathConstant";

const Signin = () => {
    const dispatch = useDispatch();
    const [contentsHeight, setContentsHeight] = useState(100);
    const [contentsWidth, setContentsWidth] = useState(100);
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [passwordValue, setPasswordValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const contentsRef = useRef(null);

    const backgroundContainer = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 : contentsWidth,
        marginTop: contentsHeight * 0.05,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20px",
        flexDirection: "column",
    };

    useEffect(() => {
        const updateSize = () => {
            const newHeight = window.innerHeight;
            const newWidth = window.innerWidth;
            setContentsHeight(newHeight);
            setContentsWidth(newWidth);
        };
        updateSize();
        window.addEventListener("resize", updateSize);

        signin(null);

        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, []);

    const signin = (data) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data), // JSON 형식으로 데이터 변환
            credentials: "include"
        };
        // post 요청 보내기
        fetch(backEndUri.signin, requestOptions)
            .then(res => {
                if (!res.ok) {
                    setPasswordValue("")
                    if (data != null) {
                        setErrorMessage("로그인에 실패했습니다.")
                    }
                    return;
                }
                dispatch(login());
                navigate(routingPath.eventPage); // 페이지 이동
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handlePasswordChange = (e) => {
        setPasswordValue(e.target.value); // 비밀번호 상태(state) 업데이트
    };

    const onSubmit = (data) => {
        signin(data)
    };

    const inputIdContainer = (<input
        id="id"
        {...register('id', {required: '아이디를 입력하세요'})}
        type="text"
        className="signin-input-field"
    />)

    const inputPasswordContainer = (<input
        id="password"
        {...register('password', {
            required: '비밀번호를 입력하세요',
            minLength: {value: 6, message: '비밀번호는 최소 6자 이상이어야 합니다'}
        })}
        type="password"
        className="signin-input-field"
        value={passwordValue}
        onChange={handlePasswordChange}
    />)

    return (
        <div ref={contentsRef} className="contents">
            <div style={backgroundContainer}>
                <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
                    <h2 className="signin-heading">로그인</h2>

                    <div className="signin-input-container">
                        <label htmlFor="id" className="signin-label">아이디</label>
                        {inputIdContainer}
                        {errors.id && (
                            <p className="error-message">{errors.id.message}</p>
                        )}
                    </div>

                    <div className="signin-input-container">
                        <label htmlFor="password" className="signin-label">비밀번호</label>
                        {inputPasswordContainer}
                        {errors.password && (
                            <p className="error-message">{errors.password.message}</p>
                        )}
                    </div>

                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}
                    <button type="submit" className="signin-button">
                        로그인
                    </button>
                </form>
                <SiteInfo width={contentsWidth} height={contentsHeight}/>
            </div>
        </div>
    );
};

export default Signin;
