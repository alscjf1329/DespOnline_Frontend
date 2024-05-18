import React, {useEffect, useRef, useState} from "react";
import "../CSS/Contents.css";
import {Announcement, banner, Ranking} from "../Constants/HomeConstants";
import {useNavigate} from "react-router-dom";
import backEndUri from "../Constants/Constants";

const Home = () => {
    //navBar 사이즈 설정
    const [contentsHeight, setContetnsHeight] = useState(100); // 초기 높이를 100으로 설정
    const [contentsWidth, setContentsWidth] = useState(100); // 초기 너비를 100으로 설정
    const contentsRef = useRef(null);
    const [dataLEVEL, setDataLEVEL] = useState([]);

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

    //nav 버튼 클릭 시 페이지 이동
    const navigate = useNavigate();
    const path = "/Ranking";

    useEffect(() => {
        fetch(backEndUri.rankingLevel, {
            method: "GET",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((res) => {
                console.log("res LEVEL is", res);
                setDataLEVEL(res);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const HomeBannerStyle = {
        height: contentsWidth > 700 ? contentsWidth / 4 : contentsWidth / 3,
        width: contentsWidth > 700 ? contentsWidth / 1.5 : contentsWidth,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };
    const HomeInfoStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingLeft: contentsWidth * 0.01,
        paddingRight: contentsWidth * 0.01,
    };
    const HomeAnnouncementStyle = {
        width: contentsWidth * 0.32,
    };
    const HomeAnnouncementText = {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        borderBottom: "1px solid white", // 아래 테두리를 흰색으로 설정
        marginBottom: contentsHeight * 0.01,
    };
    const HomeText = {
        paddingRight: contentsWidth * 0.015,
        color: "white", // 텍스트 색상을 흰색으로 설정
        fontSize: contentsWidth > 1100 ? "23px" : contentsWidth > 900 ? "20px" : contentsWidth > 700 ? "15px" : "13px", // 글자 크기 설정
        cursor: "pointer", // 커서를 손가락 모양으로 설정
    };
    const HomeAnnouncementBoxStyle = {
        marginBottom: contentsHeight * 0.01,
        height: contentsHeight > 700 ? contentsHeight * 0.3 : contentsHeight * 0.3,
        // backgroundColor: "rgba(255, 255, 255, 0.7",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        borderRadius: "5px",
        marginTop: contentsWidth * 0.01,
    };

    const tableStyle = {
        marginBottom: contentsHeight * 0.05,
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "rgba(255, 255, 255, 0.7",
    };

    const theadStyle = {
        height: contentsHeight / 15,
        backgroundColor: "#4A4443",
        color: "white",
        fontSize: contentsWidth > 1100 ? "17px" : contentsWidth > 900 ? "15px" : contentsWidth > 700 ? "13px" : "12px", // 글자 크기 설정
        fontWeight: "bold",
    };

    const tdStyle = {
        fontSize: contentsWidth > 1100 ? "17px" : contentsWidth > 900 ? "15px" : contentsWidth > 700 ? "13px" : "10px", // 글자 크기 설정
        textAlign: "center",
        borderBottom: "1px solid #4A4443",
        padding: "10px 0",
    };

    const trStyle = {
        borderBottom: "1px solid #4A4443",
    };
    return (
        <div ref={contentsRef} className="contents">
            <div style={HomeBannerStyle}>
                <img src={banner.url} alt="DESP-ONLINE"
                     style={{width: "100%", height: contentsWidth > 700 ? contentsWidth / 4.5 : contentsWidth / 3}}/>
            </div>
            <div style={HomeInfoStyle}>
                <div style={HomeAnnouncementStyle}>
                    <div style={HomeAnnouncementText}>
                        <p
                            style={HomeText}
                            onClick={() => {
                                navigate(path);
                            }}
                        >
                            {Ranking.name}
                        </p>
                    </div>
                    <div style={HomeAnnouncementBoxStyle}>
                        <table style={tableStyle}>
                            <thead style={theadStyle}>
                            <tr>
                                <th>순위</th>
                                <th>닉네임</th>
                                <th>직업</th>
                                <th>레벨</th>
                                <th>경험치</th>
                            </tr>
                            </thead>
                            <tbody>
                            {dataLEVEL.length > 0 &&
                                dataLEVEL.slice(0, 3).map(
                                    (
                                        item,
                                        index // 0부터 2까지만 출력
                                    ) => (
                                        <tr key={index} style={trStyle}>
                                            <td style={tdStyle}>{index + 1}</td>
                                            <td style={tdStyle}>{item.nickname}</td>
                                            <td style={tdStyle}>{item.job}</td>
                                            <td style={tdStyle}>{item.level}</td>
                                            <td style={tdStyle}>{item.expPercent.toFixed(3)}</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={HomeAnnouncementStyle}>
                    <div style={HomeAnnouncementText}>
                        <p style={HomeText}>{Announcement.name}</p>
                    </div>
                    <div style={HomeAnnouncementBoxStyle}>
                        <h3>공지사항</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
