import React, {useEffect, useRef, useState} from "react";
import backEndUri from "../../../Constants/Constants";
import {useLocation, useNavigate} from "react-router-dom";
import "../../../CSS/CardFlipping.css";
import CardFlippingSubContainer from "./CardFlippingSubContainer";
import routingPath from "../../../Constants/PathConstant";
import CardFlippingMainContainer from "./CardFlippingMainContainer";

const CardFlipping = () => {
    const [contentsHeight, setContentsHeight] = useState(100);
    const [contentsWidth, setContentsWidth] = useState(100);
    const navigate = useNavigate();
    const location = useLocation();
    const contentsRef = useRef(null); // 컨텐츠의 ref를 설정
    const [eventUserInfo, setEventUserInfo] = useState({
        rewardLevel: 0,
        cardStatus: [],
        flipOpportunity: 0,
        resetOpportunity: 0,
        remainingFlipCount: 0
    });
    const [eventInfo, setEventInfo] = useState(null);

    const updateSize = () => {
        const newHeight = window.innerHeight;
        const newWidth = window.innerWidth;
        setContentsHeight(newHeight);
        setContentsWidth(newWidth);
    };

    useEffect(() => {

        const requestOptions = {
            method: "GET",
            credentials: "include",
        };

        fetch(backEndUri.getCardFlippingEvent(getEventId()), requestOptions)
            .then((res) => {
                if (!res.ok) {
                    navigate(routingPath.signin);
                    return
                }
                return res.json();
            })
            .then((cardFlippingInfo) => {
                setEventUserInfo({
                    rewardLevel: cardFlippingInfo.eventUserInfo.rewardLevel,
                    cardStatus: cardFlippingInfo.eventUserInfo.progress,
                    flipOpportunity: cardFlippingInfo.eventUserInfo.flipOpportunity,
                    resetOpportunity: cardFlippingInfo.eventUserInfo.resetOpportunity,
                    remainingFlipCount: cardFlippingInfo.eventUserInfo.remainingFlipCount
                });
                setEventInfo(cardFlippingInfo.eventInfo);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    useEffect(() => {
        window.addEventListener("resize", updateSize);
        updateSize(); // 초기에도 호출하도록 변경
        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, [eventInfo]);

    const getEventId = () => {
        const pathSegments = location.pathname.split("/");
        return pathSegments[pathSegments.length - 1];
    };

    const backgroundContainer = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 : contentsWidth,
        paddingTop: contentsHeight > 500 ? contentsHeight * 0.03 : 25,
        marginTop: contentsHeight * 0.05,
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "20px",
        flexDirection: "column",
    };

    return (
        <div ref={contentsRef} className="contents">
            <div style={backgroundContainer}>
                <div style={{
                    padding: "20px",
                    gap: "20px"
                }}>
                    <div className="card-flipping-eventInfo-container">
                        <div className="card-flipping-title-container">
                            {eventInfo !== null ? eventInfo.title : null}
                        </div>
                        <div className="card-flipping-description-container">
                            {eventInfo !== null ? eventInfo.description : null}
                        </div>
                    </div>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                    }}>
                        <CardFlippingMainContainer
                            eventId={getEventId()}
                            eventInfo={eventInfo}
                            eventUserInfo={eventUserInfo}
                            setEventUserInfo={setEventUserInfo}
                        />
                        <CardFlippingSubContainer eventInfo={eventInfo} eventUserInfo={eventUserInfo}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardFlipping;
