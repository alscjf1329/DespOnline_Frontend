import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import paymentsKey from "../Constants/PaymentsConstants";
import backEndUri from "../Constants/Constants";
import { maxPrice } from "../Constants/DonationConstans";

const selector = "#payment-widget";
const clientKey = paymentsKey.clientKey;
const customerKey = ANONYMOUS;

// console.log("clientKey is", clientKey);

export default function Payments() {
    const { data: paymentWidget } = usePaymentWidget(clientKey, customerKey);
    const paymentMethodsWidgetRef = useRef(null);
    const location = useLocation();
    const { userNickname, totalAmount, contentsWidth, contentsHeight } = location.state || {};
    const width = contentsWidth;
    const height = contentsHeight;
    const price = totalAmount;
    const formattedTotalAmount = new Intl.NumberFormat("ko-KR", { currency: "KRW" }).format(price);
    const nickname = userNickname;
    const [buttonHidden, setButtonHidden] = useState(true);
    const [priceCheck, setPriceCheck] = useState(false);
    const [nicknameCheck, setNicknameCheck] = useState(false);

    const nicknameValidation = backEndUri.nicknameValidation; // 닉네임 중복 확인 API

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(nicknameValidation + nickname, {
                    method: "GET",
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        setNicknameCheck(true);
                    } else {
                        setNicknameCheck(false);
                    }
                } else {
                    // 요청이 실패한 경우 에러 처리
                    console.error("서버 요청 실패");
                }
            } catch (error) {
                // 네트워크 오류 또는 다른 예외 처리
                console.error("에러 발생", error);
            }
        };
        fetchData(); // fetchData 함수 호출
    }, [nickname, nicknameCheck]);

    useEffect(() => {
        if (price > maxPrice) {
            setPriceCheck(false);
        } else {
            setPriceCheck(true);
        }
    }, [price, priceCheck]);

    // console.log("priceCheck is", priceCheck);
    // console.log("nicknameCheck is", nicknameCheck);

    useEffect(() => {
        setButtonHidden(!(priceCheck && nicknameCheck));
        // console.log("**buttonHidden is**", buttonHidden);
    }, [priceCheck, nicknameCheck]);

    useEffect(() => {
        if (!paymentWidget) {
            return;
        }
        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(selector, { value: price }, { variantKey: "DEFAULT" });
        paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });
        paymentMethodsWidgetRef.current = paymentMethodsWidget;
    }, [paymentWidget]);

    useEffect(() => {
        const paymentMethodsWidget = paymentMethodsWidgetRef.current;
        if (paymentMethodsWidget) {
            paymentMethodsWidget.updateAmount(price);
        }
    }, [price]);

    function generateOrderId() {
        // 현재 날짜와 시간을 YYYYMMDDHHMMSS 형식의 문자열로 변환
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const day = now.getDate().toString().padStart(2, "0");
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");

        // 무작위 문자열 생성 (예: 4자리 무작위 숫자)
        const randomStr = Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0");

        // 주문번호 형식: YYYYMMDDHHMMSSRRRR (년월일시분초 + 무작위 4자리)
        const orderId = `${year}${month}${day}${hours}${minutes}${seconds}${randomStr}`;
        return orderId;
    }

    //css
    const paymentsContainer = {
        width: contentsWidth > 700 ? contentsWidth / 1.5 - contentsWidth * 0.04 : contentsWidth - contentsWidth * 0.04,
        backgroundColor: "white",
        paddingLeft: contentsWidth * 0.02,
        paddingRight: contentsWidth * 0.02,
        borderRadius: "20px",
    };

    const paymentsTitleContainer = {
        height: height * 0.18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginLeft: contentsWidth * 0.02,
        borderBottom: "2px solid lightgrey", // 아래 테두리를 흰색으로 설정
    };
    const paymentsTitle = {
        fontSize: width > 1100 ? "35px" : width > 900 ? "30px" : width > 700 ? "25px" : "20px", // 글자 크기 설정
        fontWeight: "bold",
        margin: 0,
        marginTop: "5px",
        marginBottom: "5px",
    };
    const paymentsSubTitle = {
        fontSize: width > 1100 ? "20px" : width > 900 ? "18px" : width > 700 ? "15px" : "13px", // 글자 크기 설정
        margin: 0,
        marginBottom: "5px",
    };

    const paymentsbuttonStyle = {
        padding: "10px 30px",
        margin: "0 5px",
    };

    return (
        <div className="contents" style={paymentsContainer}>
            <div style={paymentsTitleContainer}>
                <p style={paymentsTitle}>주문서</p>
                <p style={paymentsSubTitle}> {formattedTotalAmount}원</p>
            </div>
            <div className="box_section">
                <div id="payment-widget" />
                <div id="agreement" />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                        className="button"
                        disabled={buttonHidden}
                        style={{
                            ...paymentsbuttonStyle,
                            backgroundColor: "#4A4443", // A nice shade of green
                            color: "white",
                            border: "none",
                            borderRadius: "20px",
                            cursor: "pointer",
                            fontSize: contentsWidth > 1100 ? "20px" : contentsWidth > 900 ? "18px" : contentsWidth > 700 ? "15px" : "13px",
                            outline: "none",
                            transition: "background-color 0.3s ease",
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = "#372B2A";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = "#4A4443";
                        }}
                        onClick={async () => {
                            try {
                                // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                                // @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
                                await paymentWidget?.requestPayment({
                                    orderId: generateOrderId(),
                                    orderName: `${formattedTotalAmount}원 충전`,
                                    customerName: `${nickname}`,
                                    customerEmail: "customer123@gmail.com",
                                    customerMobilePhone: "01012341234",
                                    successUrl: `${window.location.origin}/success?nickname=${encodeURIComponent(nickname)}`,
                                    failUrl: `${window.location.origin}/fail`,
                                });
                            } catch (error) {
                                // 에러 처리하기
                                console.error(error);
                            }
                        }}
                    >
                        결제하기
                    </button>
                </div>
            </div>
        </div>
    );
}

function usePaymentWidget(clientKey, customerKey) {
    return useQuery({
        queryKey: ["payment-widget", clientKey, customerKey],
        queryFn: () => loadPaymentWidget(clientKey, customerKey),
    });
}