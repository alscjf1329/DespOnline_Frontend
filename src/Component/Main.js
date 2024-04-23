import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Announcement from "./Announcement";
import Character from "./Character";
import Ranking from "./Ranking";
import UserSearch from "./UserSearch";
import Donation from "./Donation";
import Payments from "./Payments";
import Success from "./Success";
import Fail from "./Fail";
import NicknameValidation from "./NicknameValidation";
import EventPage from "./EventPage";
import Signin from "./Signin";
import Signup from "./Signup";
import AuthenticateServerUser from "./AuthenticateServerUser"; // Signup 컴포넌트 import 추가

const Main = () => {
    const [hour, setHour] = useState(new Date().getHours());
    const mainMap_night = "https://despbukkit.s3.ap-northeast-2.amazonaws.com/mainMap_night.jpg";
    const mainMap_daytime = "https://despbukkit.s3.ap-northeast-2.amazonaws.com/mainMap_daytime.jpg";
    const mainMap_evening = "https://despbukkit.s3.ap-northeast-2.amazonaws.com/mainMap_evening.jpg";

    useEffect(() => {
        const interval = setInterval(() => {
            const currentHour = new Date().getHours();
            setHour(currentHour);
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const mainMap = hour >= 7 && hour < 16 ? mainMap_daytime : hour >= 16 && hour < 20 ? mainMap_evening : mainMap_night;

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const containerBackStyle = {
        backgroundColor: "#231C0D",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
    };

    const containerStyle = {
        width: width,
        height: height,
        filter: "blur(3px)",
        backgroundImage: `url(${mainMap})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        overflowX: "auto",
        overflowY: "auto",
        zIndex: 1,
    };

    const containerCoverStyle = {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: width,
        height: height,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 2,
    };

    const contentLayoutStyle = {
        height: height,
        width: width > 700 ? width / 1.5 : width,
    };

    const navStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(5px)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
    };

    const linkContainerStyle = {
        display: "flex",
        alignItems: "center",
    };

    const linkStyle = {
        color: "white",
        fontSize: "16px",
        textDecoration: "none",
        marginLeft: "20px",
    };

    return (
        <div style={containerBackStyle}>
            <div style={containerStyle}></div>
            <div style={containerCoverStyle}>
                <div style={contentLayoutStyle}>

                    <nav style={navStyle}>
                        <div/>
                        <div style={linkContainerStyle}>
                            <a href="/signin" style={linkStyle}>Sign In</a>
                            <a href="/signup" style={linkStyle}>Sign Up</a>
                        </div>
                    </nav>
                    <Router>
                        <Navigation/>
                        <Routes>
                            <Route exact path="/" element={<Home/>}/>
                            <Route path="/Announcement" element={<Announcement/>}/>
                            <Route path="/Character" element={<Character/>}/>
                            <Route path="/Ranking" element={<Ranking/>}/>
                            <Route path="/UserSearch" element={<UserSearch/>}/>
                            <Route path="/NicknameValidation" element={<NicknameValidation/>}/>
                            <Route path="/Donation" element={<Donation/>}/>
                            <Route path="/Payments" element={<Payments/>}/>
                            <Route path="/Success" element={<Success/>}/>
                            <Route path="/Fail" element={<Fail/>}/>
                            <Route path="/EventPage" element={<EventPage/>}/>
                            <Route path="/Signin" element={<Signin/>}/>
                            <Route path="/Signup" element={<Signup/>}/>
                            <Route path="/AuthenticateServerUser" element={<AuthenticateServerUser/>}/>
                        </Routes>
                    </Router>
                </div>
            </div>
        </div>
    );
};

export default Main;
