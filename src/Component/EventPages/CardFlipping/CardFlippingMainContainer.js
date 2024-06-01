import React, {useState} from "react";
import backEndUri from "../../../Constants/Constants";

const MainContainer = ({eventId, eventInfo, eventUserInfo, setEventUserInfo}) => {
    const [hoverIndex, setHoverIndex] = useState(null);
    const [flipIndexes, setFlipIndexes] = useState([]);

    const handleCardHover = (index) => {
        setHoverIndex(index);
    };

    const onClickCard = (index) => {
        if (eventUserInfo.cardStatus[index] != null) {
            return;
        }

        if (flipIndexes.includes(index)) {
            const newFlipIndex = [...flipIndexes].filter((e) => e !== index);
            setFlipIndexes(newFlipIndex);
            return;
        }

        if (flipIndexes.length >= eventInfo.details.flipCount) {
            return;
        }

        const newFlipIndex = [...flipIndexes, index];
        setFlipIndexes(newFlipIndex);
    };

    const onClickFlipButton = () => {
        if (flipIndexes.length !== eventInfo.details.flipCount) {
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

        fetch(backEndUri.flipCards(eventId), requestOptions)
            .then((res) => {
                if (!res.ok) {
                    alert("용사님! 뒤집을 기회가 없는거 아닐까요?");
                }
                return res.json();
            })
            .then((flipResult) => {
                setEventUserInfo(prevState => ({
                    ...prevState,
                    flipOpportunity: flipResult.remainingFlipOpportunity,
                    rewardLevel: flipResult.rewardLevel
                }));

                if (flipResult.success) {
                    setEventUserInfo(prevState => ({
                        ...prevState,
                        cardStatus: flipResult.cardStatus
                    }));
                } else {
                    const newCardStatus = [...eventUserInfo.cardStatus];

                    let i = 0
                    flipIndexes.forEach(index => {
                        newCardStatus[index] = flipResult.flippedCardAnswer[i];
                        i++;
                    })

                    setEventUserInfo(prevState => ({
                        ...prevState,
                        cardStatus: newCardStatus
                    }));

                    setTimeout(() => {
                        setEventUserInfo(prevState => ({
                            ...prevState,
                            cardStatus: flipResult.cardStatus
                        }));
                    }, 1000);
                }
                setFlipIndexes([]);
            })
            .catch((error) => {
                setFlipIndexes([]);
                console.error("Error:", error);
            });
    };

    const onClickResetButton = () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        };

        fetch(backEndUri.resetCardStatus(eventId), requestOptions)
            .then((res) => {
                if (!res.ok) {
                    alert("용사님! 리셋할 기회가 없는거 아닐까요?");
                }
                return res.json();
            })
            .then((resetResult) => {
                setEventUserInfo(prevState => ({
                    ...prevState,
                    rewardLevel: resetResult.rewardLevel,
                    cardStatus: resetResult.cardStatus,
                    resetOpportunity: resetResult.remainingResetOpportunity
                }));
                setFlipIndexes([]);
            })
            .catch((error) => {
                setFlipIndexes([]);
                console.error("Error:", error);
            });
    }


    const cardContainer = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around", // 가운데 정렬
        width: "100%", // 카드 컨테이너의 너비를 100%로 설정
        gap: "10px", // 카드 사이의 간격
    };

    const cardStyle = {
        flexBasis: "calc(min(20%, 200px) - 10px)",
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
        transformOrigin: "center",
        // border: "1px solid #ccc",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // background: "#fff",
        // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
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
    return (
        <div className="card-flipping-main-container">
            <div style={cardContainer}>
                {eventUserInfo.cardStatus &&
                    eventUserInfo.cardStatus.map((card, index) => (
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
                                <img src={eventInfo.details.imgs[card]} alt="Card Back"
                                     style={{maxWidth: "100%", height: "auto"}}/>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="card-flipping-button-container">
                <button className="card-flipping-button" onClick={onClickFlipButton}>
                    Flip {eventUserInfo.flipOpportunity}회
                </button>
                <button className="card-flipping-button" onClick={onClickResetButton}>
                    Reset {eventUserInfo.resetOpportunity}회
                </button>
            </div>
        </div>
    );
};

export default MainContainer;
