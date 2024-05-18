import React, { useState, useRef, useEffect } from "react";
import { announcementIndex, announcementTutorial } from "../Constants/AnnouncementConstants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Announcement = () => {
    //navBar 사이즈 설정
    const [contentsHeight, setContetnsHeight] = useState(100); // 초기 높이를 100으로 설정
    const [contentsWidth, setContentsWidth] = useState(100); // 초기 너비를 100으로 설정
    const contentsRef = useRef(null);

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

    const [isFocusedAnnouncement, setIsFocusedAnnouncement] = useState(announcementIndex.server); // 현재 포커스된 페이지를 추적하는 상태

    //css
    const indexContainerStyle = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.01 : contentsWidth - contentsWidth * 0.01,
        marginLeft: contentsWidth * 0.01,
        marginRight: contentsWidth * 0.01,
        display: "flex",
        flexDirection: "row",
        marginTop: contentsHeight * 0.05,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "skyblue",
    };

    const announcementContainerStyle = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.01 : contentsWidth - contentsWidth * 0.01,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        marginLeft: contentsWidth * 0.01,
        marginRight: contentsWidth * 0.01,
        display: isFocusedAnnouncement === announcementIndex.server ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: "20px", // 아래쪽 왼쪽 모서리를 둥글게 설정
        borderBottomRightRadius: "20px", // 아래쪽 오른쪽 모서리를 둥글게 설정
    };
    const tutorialContainerStyle = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.01 : contentsWidth - contentsWidth * 0.01,
        marginLeft: contentsWidth * 0.01,
        marginRight: contentsWidth * 0.01,
        display: isFocusedAnnouncement === announcementIndex.tutorial ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
    };
    const indexStyle = {
        width: contentsWidth > 700 ? contentsWidth / 3 : contentsWidth / 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTopLeftRadius: "20px", // 윗쪽 왼쪽 모서리를 둥글게 설정
        borderTopRightRadius: "20px", // 윗쪽 오른쪽 모서리를 둥글게 설정
    };
    const indexText = {
        color: "black", // 텍스트 색상을 흰색으로 설정
        fontWeight: "bold", // 텍스트 굵기를 굵게 설정
        fontSize: contentsWidth > 1100 ? "23px" : contentsWidth > 900 ? "20px" : contentsWidth > 700 ? "17px" : "15px", // 글자 크기 설정
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div ref={contentsRef} className="contents" style={{ display: "flex", flexDirection: "column" }}>
            <div className="announcementIndex" style={indexContainerStyle}>
                <div
                    className={announcementIndex.server}
                    style={{
                        ...indexStyle,
                        backgroundColor: isFocusedAnnouncement === announcementIndex.server ? "rgba(255, 255, 255, 0.5)" : "rgba(150, 150, 150, 0.5)",
                        borderBottom: isFocusedAnnouncement === announcementIndex.server ? "1px solid white" : "1px solid grey", // 아래 테두리를 흰색으로 설정
                    }}
                    onClick={() => {
                        setIsFocusedAnnouncement(announcementIndex.server);
                    }}
                >
                    <p style={indexText}>서버 공지사항</p>
                </div>
                <div
                    className={announcementIndex.tutorial}
                    style={{
                        ...indexStyle,
                        backgroundColor: isFocusedAnnouncement === announcementIndex.tutorial ? "rgba(255, 255, 255, 0.5)" : "rgba(150, 150, 150, 0.5)",
                        borderBottom: isFocusedAnnouncement === announcementIndex.tutorial ? "1px solid white" : "1px solid grey", // 아래 테두리를 흰색으로 설정
                    }}
                    onClick={() => {
                        setIsFocusedAnnouncement(announcementIndex.tutorial);
                    }}
                >
                    <p style={indexText}>튜토리얼</p>
                </div>
            </div>
            <div className="serverAnnouncement" style={announcementContainerStyle}>
                <h2>서버 공지사항</h2>
            </div>
            <div className="tutorialAnnouncement" style={tutorialContainerStyle}>
                <div
                    style={{
                        width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.01 : contentsWidth - contentsWidth * 0.01,
                        height: contentsWidth / 2.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        marginLeft: contentsWidth * 0.01,
                        marginRight: contentsWidth * 0.01,
                        borderBottomLeftRadius: "20px", // 아래쪽 왼쪽 모서리를 둥글게 설정
                        borderBottomRightRadius: "20px", // 아래쪽 오른쪽 모서리를 둥글게 설정
                    }}
                >
                    <Slider
                        {...settings}
                        style={{
                            width: "80%",
                            height: "auto",
                        }}
                    >
                        {Array.from({ length: 16 }, (_, index) => (
                            <div key={index}>
                                <img
                                    src={announcementTutorial[index + 1]}
                                    alt={String(index + 1)}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                    }}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Announcement;
