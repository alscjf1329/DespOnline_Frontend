import React, {useEffect, useRef, useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {Radar} from "react-chartjs-2";

import {
    CharacterExplanation,
    CharacterImgSrc_1,
    CharacterImgSrc_2,
    CharacterImgSrc_3,
    CharacterPlayVideo,
    CharacterRaderChart,
    CharacterRaderChartOptions,
} from "../Constants/CharacterConstants";

const Character = () => {
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

    const [hoveredCharacter, setHoveredCharacter] = useState(null);
    const handleMouseEnter = (characterName) => {
        setHoveredCharacter(characterName);
    };
    const handleMouseLeave = () => {
        setHoveredCharacter(null);
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [chracterYoutubeKey, setchracterYoutubeKey] = useState(null);
    const [chracterRaderChartData, setchracterRaderChartData] = useState(CharacterRaderChart.BELPHEGOR.chartData);
    const [CharacterName, setCharacterName] = useState("");
    const [CharacterRole, setCharacterRole] = useState("");

    const openModal = (clickedCharacterName) => {
        setModalOpen(true);
        setchracterYoutubeKey(CharacterPlayVideo[clickedCharacterName]);
        // CharacterRaderChart에서 해당 캐릭터의 chartData 가져오기
        const chartData = CharacterRaderChart[clickedCharacterName]?.chartData;
        if (chartData) {
            setchracterRaderChartData(chartData);
        } else {
            // 해당 캐릭터의 데이터가 없을 경우 예외 처리 또는 기본값 설정
            // 예외 처리 예시:
            console.error(`No chartData found for character: ${clickedCharacterName}`);
        }
        setCharacterName(clickedCharacterName);
        setCharacterRole(CharacterExplanation[clickedCharacterName]);
    };
    const closeModal = () => {
        setModalOpen(false);
        var div = document.getElementById(chracterYoutubeKey);
        var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
        iframe.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
    };

    //css
    const characterImgLayout = {
        paddingTop: contentsHeight > 500 ? contentsHeight * 0.05 : 25,
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
    };

    const isHovered = {
        filter: "brightness(20%)",
        transitionDuration: "1s",
        transitionTimingFunction: "ease",
        transform: "scale(1.2)",
        transformOrigin: "center",
    };

    const isUnHovered = {
        filter: "none",
        transitionDuration: "1s",
        transitionTimingFunction: "ease",
    };

    const isTextHovered = {
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
        opacity: 1,
        transitionDuration: "1s",
        transitionTimingFunction: "ease",
        fontSize: contentsWidth > 700 ? contentsWidth * 0.013 : 10,
        fontWeight: "bold",
    };

    const isTextUnHovered = {
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
        opacity: 0,
        transitionDuration: "1s",
        fontSize: contentsWidth > 700 ? contentsWidth * 0.013 : 10,
        fontWeight: "bold",
        transitionTimingFunction: "ease",
    };
    const imgContainder = {
        zIndex: 4,
        position: "relative",
        filter: modalOpen === true ? "blur(5px)" : "none",
    };
    const modalStyle = {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        width: contentsWidth > 700 ? contentsWidth / 1.5 : contentsWidth,
        height: contentsHeight > 500 ? contentsHeight / 1.4 : contentsHeight,
        position: "absolute",
        zIndex: modalOpen === false ? "3" : "5",
        display: modalOpen === false ? "none" : "block",
    };

    const characterText = {
        fontSize: contentsWidth > 1100 ? "25px" : contentsWidth > 900 ? "23px" : contentsWidth > 700 ? "20px" : "18px", // 글자 크기 설정
        fontWeight: "bold",
        color: "white",
    };

    return (
        <div ref={contentsRef} className="contents">
            <div style={modalStyle} className="contents">
                <div className="modalClose" onClick={closeModal}
                     style={{display: "flex", justifyContent: "flex-end", padding: 20}}>
                    <AiOutlineClose className="modalCloseIcon"
                                    size={contentsWidth > 600 ? 30 : contentsWidth > 500 ? 20 : 15} color="white"/>
                </div>
                <div id={chracterYoutubeKey} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <iframe
                        width={contentsWidth > 700 ? contentsWidth * 0.4 : contentsWidth}
                        height={contentsWidth > 700 ? contentsWidth * 0.225 : contentsWidth}
                        src={`https://www.youtube.com/embed/${chracterYoutubeKey}?autoplay=1&rel=0&mute=0&autohide='2'&modestbranding=1&enablejsapi=1&version=3&playerapiid=ytplayer`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    marginTop: contentsHeight * 0.05
                }}>
                    <div
                        style={{
                            width: contentsWidth > 700 ? contentsWidth * 0.25 : contentsWidth,
                            height: contentsWidth > 700 ? contentsWidth * 0.25 : contentsWidth,
                        }}
                    >
                        <Radar data={chracterRaderChartData} options={CharacterRaderChartOptions.chartOptions}/>
                    </div>
                    <div
                        style={{
                            width: contentsWidth > 700 ? contentsWidth * 0.25 : contentsWidth,
                            height: contentsWidth > 700 ? contentsWidth * 0.1 : contentsWidth,
                            // backgroundColor: "rgba(150, 150, 150, 0.7)",
                            borderRadius: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <p style={characterText}>
                            {CharacterName} - {CharacterRole}
                        </p>
                    </div>
                </div>
            </div>
            <div style={imgContainder}>
                <div style={{...characterImgLayout, textAlign: "center"}}>
                    {Object.keys(CharacterImgSrc_1).map((characterName) => (
                        <div
                            style={{position: "relative", overflow: "hidden"}}
                            className="img_box"
                            key={characterName}
                            onMouseEnter={() => handleMouseEnter(characterName)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="img_box__overlay" onClick={() => openModal(characterName)}>
                                <img
                                    src={CharacterImgSrc_1[characterName]}
                                    alt={characterName}
                                    width={"90%"}
                                    height={"100%"}
                                    style={hoveredCharacter === characterName ? isHovered : isUnHovered}
                                />
                            </div>
                            <p style={hoveredCharacter === characterName ? isTextHovered : isTextUnHovered}>{characterName}</p>
                        </div>
                    ))}
                </div>
                <div style={{...characterImgLayout, textAlign: "center"}}>
                    {Object.keys(CharacterImgSrc_2).map((characterName) => (
                        <div
                            style={{
                                position: "relative",
                                overflow: "hidden",
                            }}
                            className="img_box"
                            key={characterName}
                            onMouseEnter={() => handleMouseEnter(characterName)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="img_box__overlay"
                                 onClick={characterName === "VALKYRIE" ? () => openModal(characterName) : null}>
                                <img
                                    src={CharacterImgSrc_2[characterName]}
                                    alt={characterName}
                                    width={"90%"}
                                    height={"100%"}
                                    style={{
                                        ...(hoveredCharacter === characterName && characterName !== "EMPTY" ? isHovered : isUnHovered),
                                        opacity: characterName === "EMPTY" ? 0 : 1,
                                    }}
                                />
                            </div>
                            <p style={hoveredCharacter === characterName && characterName !== "EMPTY" ? isTextHovered : isTextUnHovered}>
                                {characterName === "UNKNOWN1" ? "Comming Soon..." : characterName}
                            </p>
                        </div>
                    ))}
                </div>
                <div style={{...characterImgLayout, textAlign: "center"}}>
                    {Object.keys(CharacterImgSrc_3).map((characterName) => (
                        <div
                            style={{position: "relative", overflow: "hidden"}}
                            className="img_box"
                            key={characterName}
                            onMouseEnter={() => handleMouseEnter(characterName)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="img_box__overlay">
                                <img
                                    src={CharacterImgSrc_3[characterName]}
                                    alt={characterName}
                                    width={"90%"}
                                    height={"100%"}
                                    style={hoveredCharacter === characterName ? isHovered : isUnHovered}
                                />
                            </div>
                            <p style={hoveredCharacter === characterName ? isTextHovered : isTextUnHovered}>Comming
                                Soon...</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Character;
