import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import backEndUri from "../Constants/Constants";

const NicknameValidation = () => {
    const [contentsHeight, setContetnsHeight] = useState(100); // 초기 높이를 100으로 설정
    const [contentsWidth, setContentsWidth] = useState(100); // 초기 너비를 100으로 설정
    const contentsRef = useRef(null); // 컨텐츠의 ref를 설정
    const [nickname, setNickname] = useState(""); // 닉네임을 저장하는 상태
    const [confirmedNickname, setConfirmedNickname] = useState(""); // 확인된 닉네임을 저장하는 상태
    const [message, setMessage] = useState("충전하기 전에 닉네임을 확인해주세요"); // 메시지를 저장하는 상태
    const [isButtonHidden, setIsButtonHidden] = useState(true); // 버튼 숨김 여부를 저장하는 상태

    const nicknameValidation = backEndUri.nicknameValidation; // 닉네임 중복 확인 API

    const handleCheckNickname = async () => {
        if (!nickname) {
            setMessage("닉네임을 입력해주세요"); // 메시지 초기화
            setIsButtonHidden(true); // 버튼 숨김
        } else {
            try {
                const response = await fetch(nicknameValidation + nickname, {
                    method: "GET",
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        setMessage("존재하는 닉네임입니다.\n 충전을 눌러 진행해주세요.");
                        setIsButtonHidden(false); // 버튼 표시
                        setConfirmedNickname(nickname); // 확인된 닉네임 업데이트
                    } else {
                        setMessage(`${nickname}은 존재하지 않는 닉네임입니다. \n다시 입력해주세요.`);
                        setNickname(""); // 입력값 초기화
                        setIsButtonHidden(true); // 버튼 숨김
                    }
                } else {
                    // 요청이 실패한 경우 에러 처리
                    console.error("서버 요청 실패");
                }
            } catch (error) {
                // 네트워크 오류 또는 다른 예외 처리
                console.error("에러 발생", error);
            }
        }
    };

    useEffect(() => {
        const updateSize = () => {
            const newHeight = window.innerHeight; // 현재 브라우저 창의 높이
            const newWidth = window.innerWidth; // 현재 브라우저 창의 너비
            setContetnsHeight(newHeight); // 높이 업데이트
            setContentsWidth(newWidth); // 너비 업데이트
        };

        // 컴포넌트가 마운트될 때 사이즈 설정
        updateSize();

        // 브라우저 창의 크기가 변경될 때 사이즈 다시 설정
        window.addEventListener("resize", updateSize);

        return () => {
            // 컴포넌트가 언마운트될 때 이벤트 리스너 삭제
            window.removeEventListener("resize", updateSize);
        };
    }, []);

    useEffect(() => {
    });

    //결제 페이지 이동
    const navigate = useNavigate();
    const Donationpath = "/Donation";

    const donationChargeContainer = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 : contentsWidth,
        height: contentsHeight > 500 ? contentsHeight / 3 : contentsHeight / 2.5,
        marginTop: contentsHeight * 0.05,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "20px",
        flexDirection: "column",
    };

    const donationTitleContainer = {
        // backgroundColor: "lightgrey",
        width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.08 : contentsWidth - contentsWidth * 0.08,
        height: contentsHeight > 500 ? contentsHeight / 9 : contentsHeight / 9,
        marginLeft: contentsWidth * 0.05,
        marginRight: contentsWidth * 0.05,
        display: "flex",
        alignItems: "center",
        paddingLeft: contentsWidth * 0.03,
        borderBottom: "2px solid black", // 아래 테두리를 흰색으로 설정
    };

    const donationAmountContainer = {
        // backgroundColor: "lightgrey",
        width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.08 : contentsWidth - contentsWidth * 0.08,
        height: contentsHeight > 500 ? contentsHeight / 5 : contentsHeight / 5,
        marginLeft: contentsWidth * 0.05,
        marginRight: contentsWidth * 0.05,
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: contentsWidth * 0.03,
    };

    const donationTitle = {
        fontSize: contentsWidth > 1100 ? "23px" : contentsWidth > 900 ? "20px" : contentsWidth > 700 ? "17px" : "15px", // 글자 크기 설정
        fontWeight: "bold",
    };

    const confirmbuttonStyle = {
        padding: "10px 50px",
        margin: "0 20px",
        backgroundColor: "#4A4443", // A nice shade of green
        color: "white",
        border: "none",
        borderRadius: "50px",
        cursor: "pointer",
        fontSize: contentsWidth > 1100 ? "17px" : contentsWidth > 900 ? "15px" : contentsWidth > 700 ? "13px" : "11px", // 글자 크기 설정
        outline: "none", // Remove the outline on focus
        display: isButtonHidden ? "block" : "none",
    };

    const paymentsbuttonStyle = {
        padding: "10px 50px",
        margin: "0 20px",
        backgroundColor: "#4A4443", // A nice shade of green
        color: "white",
        border: "none",
        borderRadius: "50px",
        cursor: "pointer",
        fontSize: contentsWidth > 1100 ? "17px" : contentsWidth > 900 ? "15px" : contentsWidth > 700 ? "13px" : "11px", // 글자 크기 설정
        outline: "none",
        transition: "background-color 0.3s ease",
        display: isButtonHidden ? "none" : "block",
    };

    const nicknameInputContainer = {
        // backgroundColor: "white",
        width: contentsWidth > 700 ? contentsWidth / 2 - contentsWidth * 0.08 : contentsWidth - contentsWidth * 0.08,
        height: contentsHeight > 500 ? contentsHeight / 10 : contentsHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const inputStyle = {
        padding: "10px 20px", // 내부 여백 설정
        fontSize: "16px", // 글자 크기 설정
        border: "2px solid #ccc", // 테두리 설정
        borderRadius: "50px", // 테두리 모서리 둥글게 설정
        width: "40%", // 가로 너비 100%
        boxSizing: "border-box", // 테두리를 포함한 전체 박스 크기 설정
    };

    const messageText = {
        margin: 0,
        fontSize: contentsWidth > 1100 ? "17px" : contentsWidth > 900 ? "15px" : contentsWidth > 700 ? "13px" : "11px", // 글자 크기 설정
    };

    return (
        <div ref={contentsRef} className="contents">
            <div style={donationChargeContainer}>
                <div style={donationTitleContainer}>
                    <p style={donationTitle}>닉네임을 입력해주세요</p>
                </div>
                <div style={donationAmountContainer}>
                    <div style={nicknameInputContainer}>
                        <input
                            style={inputStyle}
                            type="text"
                            placeholder="닉네임"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)} // 입력한 닉네임 업데이트
                        />
                        <button
                            onClick={handleCheckNickname}
                            style={confirmbuttonStyle}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#372B2A";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "#4A4443";
                            }}
                        >
                            확인
                        </button>
                        <button
                            onClick={() => {
                                handleCheckNickname(); // 닉네임 확인 함수 호출
                                if (!isButtonHidden) {
                                    navigate(Donationpath, {state: {confirmedNickname}});
                                }
                            }}
                            style={{
                                ...paymentsbuttonStyle,
                                display: isButtonHidden ? "none" : "block"
                            }} // 버튼 숨김 여부에 따라 스타일 설정
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#372B2A";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "#4A4443";
                            }}
                        >
                            충전
                        </button>
                    </div>
                    <div>
                        <p style={messageText}> {message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NicknameValidation;
