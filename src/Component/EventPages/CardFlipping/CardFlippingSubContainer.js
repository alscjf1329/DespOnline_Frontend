import React, {useState} from 'react';
import "../../../CSS/CardFlipping.css";

const CardFlippingSubContainer = ({eventInfo, eventUserInfo}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <div className="card-flipping-sub-container">
            <div>
                <strong>판당 남은 기회: </strong> {eventUserInfo.remainingFlipCount}회
            </div>
            <div>
                <strong>뒤집기 기회:</strong> {eventUserInfo.flipOpportunity}회
            </div>
            <div>
                <strong>리셋 기회:</strong> {eventUserInfo.resetOpportunity}회
            </div>
            <div>
                <strong
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    현재 보상 단계 </strong>
                : {eventUserInfo.rewardLevel}회
            </div>
            <div className="tooltip-icon">
                {showTooltip && (
                    <div className="tooltip">
                        <table>
                            <thead>
                            <tr>
                                <th>보상 단계</th>
                                <th>보상</th>
                            </tr>
                            </thead>
                            <tbody>
                            {eventInfo.info.rewardDescription.map((description, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{description}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardFlippingSubContainer;
