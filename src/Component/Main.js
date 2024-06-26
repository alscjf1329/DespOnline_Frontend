import React, {useEffect, useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
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
import Signin from "./Signin";
import Signup from "./Signup";
import SignupConfirm from "./SignupConfirm";
import {logout} from '../auth/authSlice';
import {useDispatch, useSelector} from "react-redux";
import EventPage from "./EventPage";
import CardFlipping from "./EventPages/CardFlipping/CardFlipping";
import backEndUri from "../Constants/Constants";
import routingPath from "../Constants/PathConstant";
import SiteInfo from "./SiteInfo";


const Main = () => {
    const [hour, setHour] = useState(new Date().getHours());
    const mainMap_night = "https://despbukkit.s3.ap-northeast-2.amazonaws.com/mainMap_night.jpg";
    const mainMap_daytime = "https://despbukkit.s3.ap-northeast-2.amazonaws.com/mainMap_daytime.jpg";
    const mainMap_evening = "https://despbukkit.s3.ap-northeast-2.amazonaws.com/mainMap_evening.jpg";
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const handleLogout = () => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        };
        // post 요청 보내기
        fetch(backEndUri.signout, requestOptions)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        dispatch(logout());
    };

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
    const [height, setHeight] = useState(window.innerHeight * 1.5 + 300);

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
        flexDirection: "column",
        width: "100%",
        height: "100%",
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
        marginTop: "50px"
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
                            {isAuthenticated ? (
                                <Link to={routingPath.home} onClick={handleLogout} style={linkStyle}>로그아웃</Link>
                            ) : (
                                <Link to={routingPath.signin} style={linkStyle}>로그인</Link>
                            )}
                            <Link to={routingPath.signup} style={linkStyle}>회원가입</Link>
                        </div>
                    </nav>
                    <Navigation/>
                    <Routes>
                        <Route exact path={routingPath.home} element={<Home/>}/>
                        <Route path={routingPath.announcement} element={<Announcement/>}/>
                        <Route path={routingPath.character} element={<Character/>}/>
                        <Route path={routingPath.ranking} element={<Ranking/>}/>
                        <Route path={routingPath.userSearch} element={<UserSearch/>}/>
                        <Route path={routingPath.nicknameValidation} element={<NicknameValidation/>}/>
                        <Route path={routingPath.donation} element={<Donation/>}/>
                        <Route path={routingPath.payments} element={<Payments/>}/>
                        <Route path={routingPath.success} element={<Success/>}/>
                        <Route path={routingPath.fail} element={<Fail/>}/>
                        <Route path={routingPath.signin} element={<Signin/>}/>
                        <Route path={routingPath.signup} element={<Signup/>}/>
                        <Route path={routingPath.signupConfirm} element={<SignupConfirm/>}/>
                        <Route path={routingPath.eventPage} element={<EventPage/>}/>
                        <Route path={routingPath.cardFlipping} element={<CardFlipping/>}/>
                    </Routes>
                </div>
            </div>
            <SiteInfo/>
        </div>
    );
};

export default Main;
