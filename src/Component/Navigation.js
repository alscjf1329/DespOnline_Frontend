import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

const Navigation = () => {
    //size에 따라 nav sidebar 생셩
    const [navMenu, setNavMenu] = useState(false);
    const handleNavMenu = (width) => {
        width < 700 ? setNavMenu(true) : setNavMenu(false);
    };

    //navBar 사이즈 설정
    const [navHeight, setNavHeight] = useState(100); // 초기 높이를 100으로 설정
    const [navWidth, setNavWidth] = useState(100); // 초기 너비를 100으로 설정
    const navRef = useRef(null);

    useEffect(() => {
        const updateSize = () => {
            const newHeight = window.innerHeight; // 현재 브라우저 창의 높이
            const newWidth = window.innerWidth; // 현재 브라우저 창의 너비
            setNavHeight(newHeight); // 높이 업데이트
            setNavWidth(newWidth); // 너비 업데이트
        };

        // 컴포넌트가 마운트될 때 사이즈 설정
        updateSize();
        handleNavMenu(navWidth);

        // 브라우저 창의 크기가 변경될 때 사이즈 다시 설정
        window.addEventListener("resize", updateSize);

        return () => {
            // 컴포넌트가 언마운트될 때 이벤트 리스너 삭제
            window.removeEventListener("resize", updateSize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        handleNavMenu(navWidth);
    }, [navWidth]);

    //nav 버튼 클릭 시 페이지 이동
    const buttonsLeft = [
        {label: "공지\n사항", path: "/Announcement"},
        {label: "캐릭터\n가이드", path: "/Character"},
        {label: "이벤트", path: "/EventPage"},
    ];
    const buttonsHome = [{label: "Home", path: "/"}];
    const buttonsRight = [
        {label: "랭킹", path: "/Ranking"},
        {label: "유저 검색", path: "/UserSearch"},
        {label: "충전", path: "/NicknameValidation"},
    ];
    const navigate = useNavigate();

    // 현재 활성 버튼을 추적하는 상태
    const [activeButton, setActiveButton] = useState("Home");
    const handleButtonClick = (buttonLabel, path) => {
        // 현재 활성 버튼을 업데이트
        setActiveButton(buttonLabel);
        navigate(path);
    };

    const navBarWideStyle = {
        marginTop: "20px",
        height: navHeight > 600 ? `${navHeight / 6}px` : "100px",
        borderBottom: "1px solid white", // 아래 테두리를 흰색으로 설정
        display: "flex",
        justifyContent: "space-around", // 버튼 사이의 여백을 동일하게 설정
        alignItems: "center",
        paddingBottom: "10px",
    };

    // const navBarSmallStyle = {
    //     marginTop: "20px",
    //     height: "100px",
    //     borderBottom: "1px solid white", // 아래 테두리를 흰색으로 설정
    //     display: "flex",
    //     paddingBottom: "10px",
    // };

    const navBtnStyle = {
        height: navHeight > 600 ? `${navHeight / 8}px` : "80px",
        backgroundColor: "transparent", // 배경색을 투명으로 설정
        color: "white", // 텍스트 색상을 흰색으로 설정
        border: "none", // 테두리 제거
        cursor: "pointer", // 커서 스타일 변경
        fontSize: navWidth > 1100 ? "25px" : navWidth > 900 ? "20px" : navWidth > 700 ? "15px" : "10px", // 글자 크기 설정
        fontWeight: "thin", // 기본 글씨체보다 가벼운 글씨체로 설정
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        textAlign: "center",
        fontFamily: "NotoSansKR, sans-serif",
    };

    const navBtnStyle2 = {
        width: navWidth / 4,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        whiteSpace: "pre-wrap",
    };
    return (
        <div ref={navRef}>
            {/* {navMenu === false ? (
                //wide screen navBar
                <> */}
            <div style={navBarWideStyle}>
                <div style={navBtnStyle2}>
                    {buttonsLeft.map((button, index) => (
                        <button
                            key={index}
                            style={{
                                ...navBtnStyle,
                                fontWeight: activeButton === button.label ? "bold" : "normal",
                            }}
                            onClick={() => handleButtonClick(button.label, button.path)}
                        >
                            {button.label}
                        </button>
                    ))}
                </div>
                <div>
                    {buttonsHome.map((button, index) => (
                        <img
                            key={index}
                            src="https://despbukkit.s3.ap-northeast-2.amazonaws.com/desp-online+logo.png" // 이미지 경로를 설정
                            alt="Home"
                            onClick={() => handleButtonClick(button.label, button.path)}
                            style={{
                                width: navHeight > 600 ? `${navHeight / 8}px` : "80px",
                                height: navHeight > 600 ? `${navHeight / 8}px` : "80px",
                                fontWeight: activeButton === button.label ? "bold" : "normal",
                            }}
                        />
                    ))}
                </div>
                <div style={navBtnStyle2}>
                    {buttonsRight.map((button, index) => (
                        <button
                            key={index}
                            style={{
                                ...navBtnStyle,
                                fontWeight: activeButton === button.label ? "bold" : "normal",
                            }}
                            onClick={() => handleButtonClick(button.label, button.path)}
                        >
                            {button.label}
                        </button>
                    ))}
                </div>
            </div>
            {/* </>
            ) : (
                //small screen navBar
                <>
                    <div style={navBarSmallStyle}>
                        <div
                            style={{
                                width: navWidth / 3,
                            }}
                        ></div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: navWidth / 3,
                                // backgroundColor: "red", // 배경색을 투명으로 설정
                            }}
                        >
                            {buttonsHome.map((button, index) => (
                                <img
                                    key={index}
                                    src="https://despbukkit.s3.ap-northeast-2.amazonaws.com/desp-online+logo.png" // 이미지 경로를 설정
                                    alt="Home"
                                    onClick={() => handleButtonClick(button.label, button.path)}
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        fontWeight: activeButton === button.label ? "bold" : "normal",
                                    }}
                                />
                            ))}
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                width: navWidth / 3,
                                // backgroundColor: "yellow", // 배경색을 투명으로 설정
                            }}
                        >
                            <button
                                style={{
                                    display: "flex",
                                    padding: "10px",
                                    marginRight: "20px",
                                    backgroundColor: "transparent", // 배경색을 투명으로 설정

                                    border: "none", // 테두리 제거
                                    cursor: "pointer", // 커서 스타일 변경
                                }}
                            >
                                <AiOutlineMenu className="navMenu-icon" size={navWidth > 600 ? 40 : navWidth > 500 ? 35 : 30} color="white" />
                            </button>
                        </div>
                    </div>
                </>
            )} */}
        </div>
    );
};

export default Navigation;