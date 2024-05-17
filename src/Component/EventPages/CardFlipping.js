import React, {useEffect, useState} from "react";
import backEndUri from "../../Constants/Constants";
import {useLocation, useNavigate} from "react-router-dom";
import routingPath from "../../Constants/PathConstant";

const CardFlipping = () => {
    const [contentsHeight, setContentsHeight] = useState(100);
    const [contentsWidth, setContentsWidth] = useState(100);
    const navigate = useNavigate();
    const location = useLocation();
    const [cardStatus, setCardStatus] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [flipIndexes, setFlipIndexes] = useState([]);
    const [flipCount, setFlipCount] = useState(0);

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
                setCardStatus(cardFlippingInfo.eventUserInfo.progress);
                setFlipCount(cardFlippingInfo.eventInfo.info.flipCount)
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
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
    };

    const textStyle = {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    };

    const flippedStyle = {
        transform: "rotateY(180deg)",
    };

    const handleCardHover = (index) => {
        setHoverIndex(index);
    };

    const onClickCard = (index) => {
        if (cardStatus[index] != null) {
            return;
        }

        if (flipIndexes.includes(index)) {
            const newFlipIndex = [...flipIndexes].filter(e => e !== index)
            setFlipIndexes(newFlipIndex);
            return;
        }

        if (flipIndexes.length >= flipCount) {
            return;
        }

        const newFlipIndex = [...flipIndexes, index];
        setFlipIndexes(newFlipIndex);
    }

    return (
        <div style={backgroundContainer}>
            <div style={cardContainer}>
                {cardStatus &&
                    cardStatus.map((card, index) => (
                        <div
                            key={index}
                            style={{
                                ...cardStyle,
                                ...(card ? flippedStyle : {}),
                                transform: hoverIndex === index || flipIndexes.includes(index) ? "scale(1.2)" : "scale(1)",
                            }}
                            onMouseEnter={() => handleCardHover(index)}
                            onMouseLeave={() => handleCardHover(index)}
                            onClick={() => onClickCard(index)}
                        >
                            <div style={textStyle}>
                                {card ? "뒤집" : "앞면"}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CardFlipping;
