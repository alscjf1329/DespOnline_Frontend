import React, {useEffect, useRef, useState} from "react";
import backEndUri from "../Constants/Constants";
import tier from "../Constants/TierConstants";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const Ranking = () => {
    const [contentsHeight, setContentsHeight] = useState(100);
    const [contentsWidth, setContentsWidth] = useState(100);
    const contentsRef = useRef(null);
    const [dataPVP, setDataPVP] = useState([]);
    const [dataLEVEL, setDataLEVEL] = useState([]);
    const [selectedValue, setSelectedValue] = useState("LEVEL");
    const [hoveredRow, setHoveredRow] = useState(null);

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

    useEffect(() => {
        fetch(backEndUri.rankingPVP, {
            method: "GET",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((res) => {
                console.log("res PVP is", res);
                setDataPVP(res);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

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
                // console.log("res LEVEL is", res);
                setDataLEVEL(res);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
    };

    const handleMouseEnter = (index) => {
        setHoveredRow(index);
    };

    const handleMouseLeave = () => {
        setHoveredRow(null);
    };

    const donationChargeContainer = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 : contentsWidth,
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
    };

    const donationTitle = {
        fontSize: contentsWidth > 1100 ? "23px" : contentsWidth > 900 ? "20px" : contentsWidth > 700 ? "17px" : "15px", // 글자 크기 설정
        fontWeight: "bold",
    };

    const selectStyle = {
        padding: "5px 15px",
        margin: "0 20px",
        fontSize: "16px",
        backgroundColor: "#4A4443",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        outline: "none",
    };

    const tableStyle = {
        marginBottom: contentsHeight * 0.05,
        width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.08 : contentsWidth - contentsWidth * 0.08,
        borderCollapse: "collapse",
    };

    const theadStyle = {
        height: contentsHeight / 15,
        backgroundColor: "#4A4443",
        color: "white",
        fontSize: contentsWidth > 1100 ? "20px" : contentsWidth > 900 ? "17px" : contentsWidth > 700 ? "15px" : "13px", // 글자 크기 설정
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
            <div style={donationChargeContainer}>
                <div style={donationTitleContainer}>
                    <p style={donationTitle}>실시간 랭킹</p>
                    <select value={selectedValue} onChange={handleSelectChange} style={selectStyle}>
                        <option value="LEVEL">LEVEL 랭킹</option>
                        <option value="PVP">PVP 랭킹</option>
                    </select>
                </div>
                {selectedValue === "PVP" && (
                    <table style={tableStyle}>
                        <thead style={theadStyle}>
                        <tr>
                            <th>순위</th>
                            <th>닉네임</th>
                            <th>티어</th>
                            <th>승</th>
                            <th>무</th>
                            <th>패</th>
                            <th>승점</th>
                            <th>승률</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataPVP.length > 0 &&
                            dataPVP.map((item, index) => (
                                <tr
                                    key={index}
                                    style={{
                                        ...trStyle,
                                        fontWeight: hoveredRow === index ? "bold" : "normal",
                                    }}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <td style={tdStyle}>{index + 1}</td>
                                    <td style={tdStyle}>{item.nickname}</td>
                                    <td style={{
                                        flexDirection: "column",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <img
                                            src={tier[item.record.tier]}
                                            alt={item.record.tier}
                                            style={{
                                                width: contentsHeight > 600 ? `${contentsHeight / 15}px` : "40px",
                                                height: contentsHeight > 600 ? `${contentsHeight / 15}px` : "40px",
                                            }}
                                        />
                                        {item.record.tier}
                                    </td>

                                    <td style={tdStyle}>{item.record.victory}</td>
                                    <td style={tdStyle}>{item.record.draw}</td>
                                    <td style={tdStyle}>{item.record.defeat}</td>
                                    <td style={tdStyle}>{item.record.score}</td>
                                    <td style={tdStyle}>{item.record.winRate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {selectedValue === "LEVEL" && (
                    <table style={tableStyle}>
                        <thead style={theadStyle}>
                        <tr>
                            <th>순위</th>
                            <th>닉네임</th>
                            <th>직업</th>
                            <th>레벨</th>
                            <th>경험치</th>
                            <th>마지막 접속시간</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataLEVEL.length > 0 &&
                            dataLEVEL.map((item, index) => (
                                <tr
                                    key={index}
                                    style={{
                                        ...trStyle,
                                        fontWeight: hoveredRow === index ? "bold" : "normal",
                                    }}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <td style={tdStyle}>{index + 1}</td>
                                    <td style={tdStyle}>{item.nickname}</td>
                                    <td style={tdStyle}>{item.job}</td>
                                    <td style={tdStyle}>{item.level}</td>
                                    <td style={tdStyle}>{item.expPercent.toFixed(3)}%</td>
                                    <td style={tdStyle}>{item.lastPlayTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Ranking;