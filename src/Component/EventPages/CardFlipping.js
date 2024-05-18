import React, {useEffect, useState} from "react";
import backEndUri from "../../Constants/Constants";
import {useLocation, useNavigate} from "react-router-dom";
import routingPath from "../../Constants/PathConstant";
import "../../CSS/CardFlipping.css";

const CardFlipping = () => {
    const [contentsHeight, setContentsHeight] = useState(100);
    const [contentsWidth, setContentsWidth] = useState(100);
    const navigate = useNavigate();
    const location = useLocation();
    const [eventInfo, setEventInfo] = useState(null);
    const [cardStatus, setCardStatus] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [flipIndexes, setFlipIndexes] = useState([]);
    const [flipOpportunity, setFlipOpportunity] = useState(0);
    const [resetOpportunity, setResetOpportunity] = useState(0);

    useEffect(() => {
        const updateSize = () => {
            const newHeight = window.innerHeight;
            const newWidth = window.innerWidth;
            setContentsHeight(newHeight);
            setContentsWidth(newWidth);
        };

        updateSize();
        window.addEventListener("resize", updateSize);

        const requestOptions = {
            method: "GET",
            credentials: "include",
        };

        fetch(backEndUri.getCardFlippingEvent(getEventId()), requestOptions)
            .then((res) => {
                if (!res.ok) {
                    navigate(routingPath.signin);
                }
                return res.json();
            })
            .then((cardFlippingInfo) => {
                setFlipOpportunity(cardFlippingInfo.eventUserInfo.flipOpportunity);
                setResetOpportunity(cardFlippingInfo.eventUserInfo.resetOpportunity);
                setCardStatus(cardFlippingInfo.eventUserInfo.progress);

                setEventInfo(cardFlippingInfo.eventInfo);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, []);

    const getEventId = () => {
        const pathSegments = location.pathname.split("/");
        return pathSegments[pathSegments.length - 1];
    };

    const backgroundContainer = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 : contentsWidth,
        height: contentsHeight > 500 ? contentsHeight / 2 : contentsHeight,
        marginTop: contentsHeight * 0.05,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "20px",
        flexDirection: "column",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    };

    const cardContainer = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around", // 가운데 정렬
        width: "100%", // 카드 컨테이너의 너비를 100%로 설정
        gap: "10px", // 카드 사이의 간격
    };

    const cardStyle = {
        flexBasis: "calc(20% - 10px)",
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
        transformOrigin: "center",
        border: "1px solid #ccc",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    };

    const textStyle = {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        transition: "transform 0.3s ease-in-out",
    };

    const flippedTextStyle = {
        transform: "rotateY(180deg)",
        transition: "all 500ms"
    };

    const unFlippedStyle = (index) => {
        return {
            transform:
                hoverIndex === index || flipIndexes.includes(index)
                    ? "scale(1.2)"
                    : "scale(1)",
        };
    };

    const handleCardHover = (index) => {
        setHoverIndex(index);
    };

    const onClickCard = (index) => {
        if (cardStatus[index] != null) {
            return;
        }

        if (flipIndexes.includes(index)) {
            const newFlipIndex = [...flipIndexes].filter((e) => e !== index);
            setFlipIndexes(newFlipIndex);
            return;
        }

        if (flipIndexes.length >= eventInfo.info.flipCount) {
            return;
        }

        const newFlipIndex = [...flipIndexes, index];
        setFlipIndexes(newFlipIndex);
    };

    const onClickFlipButton = () => {
        if (flipIndexes.length !== eventInfo.info.flipCount) {
            return;
        }
        const data = {
            flipIndexes: flipIndexes,
        };

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data), // JSON 형식으로 데이터 변환
            credentials: "include",
        };
        const beforeCardStatus = [...cardStatus];

        fetch(backEndUri.flipCards(getEventId()), requestOptions)
            .then((res) => {
                if (!res.ok) {
                    alert("용사님! 뒤집을 기회가 없는거 아닐까요?");
                }
                return res.json();
            })
            .then((flipResult) => {
                if (flipResult.success) {
                    setCardStatus(flipResult.cardStatus);
                } else {
                    const newCardStatus = [...cardStatus];

                    let i = 0
                    flipIndexes.forEach(index => {
                        newCardStatus[index] = flipResult.flippedCardAnswer[i];
                        i++;
                    })

                    setCardStatus(newCardStatus)
                }

                if (!flipResult.success) {
                    setTimeout(() => {
                        setCardStatus(beforeCardStatus);
                    }, 1000);
                }
                setFlipIndexes([]);
            })
            .catch((error) => {
                setFlipIndexes([]);
                console.error("Error:", error);
            });
    };

    return (
        <div style={backgroundContainer}>
            <div className="eventInfoContainer">
                <div className="titleContainer">
                    {eventInfo !== null ? eventInfo.title : null}
                </div>
                <div className="descriptionContainer">
                    {eventInfo !== null ? eventInfo.description : null}
                </div>
            </div>
            <div style={cardContainer}>
                {cardStatus &&
                    cardStatus.map((card, index) => (
                        <div
                            key={index}
                            style={{
                                ...cardStyle,
                                ...(card !== null ? {transform: "rotateY(180deg)"} : {}),
                                ...unFlippedStyle(index),
                            }}
                            onMouseEnter={() => handleCardHover(index)}
                            onMouseLeave={() => handleCardHover(index)}
                            onClick={() => onClickCard(index)}
                        >
                            <div style={{
                                ...textStyle,
                                ...(card !== null ? flippedTextStyle : unFlippedStyle())
                            }}>
                                {card !== null ? <div> {card} </div> : <div> {"앞면"} </div>}
                            </div>
                        </div>
                    ))}
            </div>
            <div className="button-container">
                <button className="button" onClick={onClickFlipButton}>
                    Flip {flipOpportunity}회
                </button>
                <button className="button" onClick={() => {
                }}>
                    Reset {resetOpportunity}회
                </button>
            </div>
        </div>
    );
};

export default CardFlipping;
