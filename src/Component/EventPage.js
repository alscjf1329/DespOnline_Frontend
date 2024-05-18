import React, {useEffect, useState} from "react";
import backEndUri from "../Constants/Constants";
import {useNavigate} from "react-router-dom";

const EventPage = () => {
    const [contentsHeight, setContentsHeight] = useState(100);
    const [contentsWidth, setContentsWidth] = useState(100);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

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
            method: 'GET',
        };

        fetch(backEndUri.getEventsInPeriod, requestOptions)
            .then((res) => {
                if (!res.ok) {
                    alert("관리자에게 문의해주세요")
                }
                return res.json();
            })
            .then((data) => {
                setEvents(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, []);

    function handleEventClick(eventItem) {
        navigate(eventItem.type + "/" + eventItem.id)
    }

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
    };

    const eventListContainer = {
        width: '90%',
        height: '90%',
        overflowY: 'auto',
    };

    const eventContainer = {
        marginBottom: '10px',
        padding: '10px',
        borderRadius: '10px',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
    };

    const eventBanner = {
        width: '60%',
        marginRight: '10px',
    };

    return (
        <div style={backgroundContainer}>
            <div style={eventListContainer}>
                {events.length > 0 ? (
                    events.map((eventItem, index) => (
                        <div key={index} style={eventContainer} onClick={() => handleEventClick(eventItem)}>
                            <img src={eventItem.bannerUri} style={eventBanner} alt="이벤트 베너"/>
                            <div>
                                <h3>{eventItem.title}</h3>
                                <p>{eventItem.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{textAlign: 'center'}}>이벤트가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default EventPage;
