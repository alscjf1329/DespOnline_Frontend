import React, { useRef, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AiOutlineFrown } from "react-icons/ai";

const Fail = () => {
    const [searchParams] = useSearchParams();

    const [contentsHeight, setContetnsHeight] = useState(100); // 초기 높이를 100으로 설정
    const [contentsWidth, setContentsWidth] = useState(100); // 초기 너비를 100으로 설정
    const contentsRef = useRef(null); // 컨텐츠의 ref를 설정

    const navigate = useNavigate();
    const redirect = "/Donation";

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

    // css
    //css
    const donationChargeContainer = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 : contentsWidth,
        height: contentsHeight > 500 ? contentsHeight / 2 : contentsHeight,
        marginTop: contentsHeight * 0.05,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "20px",
        flexDirection: "column",
    };

    const successTitleContainer = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.08 : contentsWidth - contentsWidth * 0.08,
        height: contentsHeight > 500 ? contentsHeight / 3.5 : contentsHeight / 3,
        marginLeft: contentsWidth * 0.05,
        marginRight: contentsWidth * 0.05,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "column",
        borderBottom: "2px solid #372B2A", // 아래 테두리를 흰색으로 설정
    };

    const paymentsTitle = {
        fontSize: contentsWidth > 1100 ? "35px" : contentsWidth > 900 ? "30px" : contentsWidth > 700 ? "25px" : "20px", // 글자 크기 설정
        color: "#372B2A",
        fontWeight: "bold",
        margin: 0,
        marginTop: "0px",
        marginBottom: "0px",
    };

    const successcontentsContainer = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.08 : contentsWidth - contentsWidth * 0.08,
        marginLeft: contentsWidth * 0.05,
        marginRight: contentsWidth * 0.05,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    };

    const sucessSubContents = {
        fontSize: contentsWidth > 1100 ? "20px" : contentsWidth > 900 ? "18px" : contentsWidth > 700 ? "16px" : "15px", // 글자 크기 설정
        color: "#575656",
        fontWeight: "bold",
        margin: 0,
        marginTop: "0px",
        marginBottom: "5px",
    };

    const sucessContents = {
        fontSize: contentsWidth > 1100 ? "20px" : contentsWidth > 900 ? "18px" : contentsWidth > 700 ? "16px" : "15px", // 글자 크기 설정
        color: "#372B2A",
        fontWeight: "bold",
        margin: 0,
        marginTop: "0px",
        marginBottom: "5px",
    };

    return (
        <div ref={contentsRef} className="contents">
            <div style={donationChargeContainer}>
                <div style={successTitleContainer}>
                    <AiOutlineFrown size={contentsWidth > 600 ? 60 : contentsWidth > 500 ? 50 : 40} color="#372B2A" />
                    <p style={paymentsTitle}>결제에 실패했습니다.</p>
                    <p style={sucessContents}>
                        <span
                            className="pathToDonation"
                            style={{ textDecoration: "underline", cursor: "pointer" }}
                            onClick={() => {
                                navigate(redirect); // 클릭 시 리다이렉션 이벤트 발생
                            }}
                        >
                            여기
                        </span>
                        를 눌러 다시 시도해주세요
                    </p>
                </div>
                <div style={successcontentsContainer}>
                    <p style={sucessSubContents}>[ 사유 ]</p>
                    <p style={sucessContents}> {` - ${searchParams.get("message")} - `}</p>
                </div>
            </div>
        </div>
    );
};
export default Fail;
