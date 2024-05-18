import React, {useEffect, useRef, useState} from "react";
import backEndUri from "../Constants/Constants";
import tier from "../Constants/TierConstants";

const Ranking = () => {
    const [contentsHeight, setContetnsHeight] = useState(100); // 초기 높이를 100으로 설정
    const [contentsWidth, setContentsWidth] = useState(100); // 초기 너비를 100으로 설정
    const contentsRef = useRef(null); // 컨텐츠의 ref를 설정
    const [data, setData] = useState(null);
    const [nickname, setNickname] = useState(""); // 닉네임을 저장하는 상태
    const [searchUser, setSearchUser] = useState(null); // 확인된 닉네임을 저장하는 상태
    const nicknameValidation = backEndUri.nicknameValidation; // 닉네임 중복 확인 API
    const searchPlayer = backEndUri.searchPlayer;
    const userFace = backEndUri.userFace;

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

    const handleCheckNickname = async () => {
        if (!nickname) {
            alert("닉네임을 입력해주세요"); // 메시지 초기화
        } else {
            try {
                const response = await fetch(nicknameValidation + nickname, {
                    method: "GET",
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        setSearchUser(nickname);
                    } else {
                        alert(`${nickname}은 존재하지 않는 닉네임입니다. \n다시 입력해주세요.`);
                        setNickname(""); // 입력값 초기화
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
        fetch(searchPlayer + nickname, {
            method: "GET",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((res) => {
                console.log("res type is", typeof res);
                console.log("res is", res);
                setData(res);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                // 에러 처리 또는 예외 처리를 여기에 추가할 수 있습니다.
            });
    }, [searchUser]);

    const donationChargeContainer = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 : contentsWidth,
        paddingTop: contentsHeight > 500 ? contentsHeight * 0.03 : 25,
        marginTop: contentsHeight * 0.05,
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "20px",
        flexDirection: "column",
    };

    const donationTitleContainer = {
        // backgroundColor: "lightgrey",
        width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.08 : contentsWidth - contentsWidth * 0.08,
        marginLeft: contentsWidth * 0.05,
        marginRight: contentsWidth * 0.05,
        display: "flex",
        alignItems: "center",
        paddingLeft: contentsWidth * 0.03,
        borderBottom: "2px solid black", // 아래 테두리를 흰색으로 설정
    };

    const donationTitle = {
        fontSize: contentsWidth > 1100 ? "23px" : contentsWidth > 900 ? "20px" : contentsWidth > 700 ? "17px" : "15px", // 글자 크기 설정
        fontWeight: "bold",
    };

    const userSearchBarContainer = {
        // backgroundColor: "lightgrey",
        width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.08 : contentsWidth - contentsWidth * 0.08,
        paddingTop: contentsHeight > 500 ? contentsHeight * 0.03 : 25,
        paddingBottom: contentsHeight > 500 ? contentsHeight * 0.03 : 25,
        marginLeft: contentsWidth * 0.05,
        marginRight: contentsWidth * 0.05,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: contentsWidth * 0.03,
    };

    const userSearchBar = {
        padding: "10px 20px", // 내부 여백 설정
        fontSize: "16px", // 글자 크기 설정
        border: "2px solid #ccc", // 테두리 설정
        borderRadius: "50px", // 테두리 모서리 둥글게 설정
        width: "40%", // 가로 너비 100%
        boxSizing: "border-box", // 테두리를 포함한 전체 박스 크기 설정
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
    };

    const contentsContainer = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.08 : contentsWidth - contentsWidth * 0.08,
        paddingLeft: contentsWidth * 0.03,
        paddingBottom: contentsHeight * 0.03,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        // backgroundColor: "lightgrey",
    };

    const contentsTextContainer = {
        width: "60%",
    };

    const nicknameContainer = {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const nicknameText = {
        fontSize: contentsWidth > 1100 ? "30px" : contentsWidth > 900 ? "25px" : contentsWidth > 700 ? "23px" : "19px", // 글자 크기 설정
        fontWeight: "bold",
        color: "#4A4443",
    };

    const tableStyle = {
        marginBottom: contentsHeight * 0.05,
        width: "100%",
        borderCollapse: "collapse",
    };

    const theadStyle = {
        height: contentsHeight / 15,
        // backgroundColor: "#4A4443",
        color: "#4A4443",
        fontSize: contentsWidth > 1100 ? "20px" : contentsWidth > 900 ? "18px" : contentsWidth > 700 ? "16px" : "14px", // 글자 크기 설정
        fontWeight: "bold",
        borderBottom: "1px solid #4A4443",
        paddingLeft: "10px", // 왼쪽 패딩 설정
        textAlign: "center",
    };

    const tdStyle = {
        fontSize: contentsWidth > 1100 ? "20px" : contentsWidth > 900 ? "18px" : contentsWidth > 700 ? "16px" : "14px", // 글자 크기 설정
        textAlign: "center",
        padding: "10px 0",
        color: "#4A4443",
    };

    const trStyle = {
        borderBottom: "1px solid #4A4443",
    };

    return (
        <div ref={contentsRef} className="contents">
            <div style={donationChargeContainer}>
                <div style={donationTitleContainer}>
                    <p style={donationTitle}>유저 전적 검색</p>
                </div>
                <div style={userSearchBarContainer}>
                    <input
                        style={userSearchBar}
                        ype="text"
                        placeholder="닉네임을 입력해주세요"
                        onChange={(e) => setNickname(e.target.value)} // 입력한 닉네임 업데이트
                    />
                    <button
                        onClick={() => {
                            handleCheckNickname();
                        }}
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
                </div>
                {data !== null && (
                    <div style={contentsContainer}>
                        <img
                            src={userFace + data.levelRank.uuid}
                            alt="face"
                            style={{
                                width: contentsHeight > 600 ? `${contentsHeight / 4}px` : "80px",
                                height: contentsHeight > 600 ? `${contentsHeight / 2}px` : "160px",
                            }}
                        />
                        <p>{userFace + data.levelRank.uuid}</p>
                        <div style={contentsTextContainer}>
                            <div style={nicknameContainer}>
                                <p style={nicknameText}> {data.levelRank.nickname}</p>
                            </div>
                            <table style={tableStyle}>
                                <thead style={theadStyle}>
                                <tr>
                                    <th>직업</th>
                                    <th>레벨</th>
                                    <th>경험치</th>
                                    <th>티어</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td style={tdStyle}>{data.levelRank.job}</td>
                                    <td style={tdStyle}>LV. {data.levelRank.level}</td>
                                    <td style={tdStyle}>{data.levelRank.expPercent.toFixed(3)} %</td>
                                    <td style={{
                                        flexDirection: "column",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <img
                                            src={tier[data.playerVersusRecord.tier]}
                                            alt={data.playerVersusRecord.tier}
                                            style={{
                                                width: contentsHeight > 600 ? `${contentsHeight / 10}px` : "40px",
                                                height: contentsHeight > 600 ? `${contentsHeight / 10}px` : "40px",
                                            }}
                                        />
                                    </td>
                                </tr>
                                </tbody>
                                <thead style={theadStyle}>
                                <tr>
                                    <th>승</th>
                                    <th>무</th>
                                    <th>패</th>
                                    <th>승률</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td style={tdStyle}>{data.playerVersusRecord.victory}</td>
                                    <td style={tdStyle}>{data.playerVersusRecord.draw}</td>
                                    <td style={tdStyle}>{data.playerVersusRecord.defeat}</td>
                                    <td style={tdStyle}>{data.playerVersusRecord.winRate}</td>
                                </tr>
                                </tbody>
                                <thead style={theadStyle}>
                                <tr>
                                    <th colSpan={4}>마지막 접속시간</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td style={tdStyle} colSpan={4}>
                                        {data.levelRank.lastPlayTime}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Ranking;