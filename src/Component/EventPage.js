import React, {useEffect, useState} from "react";

const EventPage = () => {
    const [contentsHeight, setContetnsHeight] = useState(100); // 초기 높이를 100으로 설정
    const [contentsWidth, setContentsWidth] = useState(100); // 초기 너비를 100으로 설정

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

    return (
        <div>
            <div style={donationChargeContainer}>
                <p> 이벤트 페이지</p>
            </div>
        </div>
    );
};
export default EventPage;
