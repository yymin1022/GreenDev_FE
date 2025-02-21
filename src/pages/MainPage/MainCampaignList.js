// 참여중인 캠페인 목록을 나타내는 컴포넌트
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMyCampaigns } from "../../api/myCampaign";
import "../../styles/MainPage/MainCampaignList.scss";

const MainCampaignList = () => {
  const navigate = useNavigate();
  const userAccessToken = localStorage.getItem("accessToken");
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    if (!userAccessToken) {
      alert("로그인이 필요합니다.");
      navigate("/");
      return;
    }
    getMyCampaigns(userAccessToken)
      .then((response) => {
        setCampaigns(response.data.data.campaigns);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [navigate, userAccessToken]);

  const goCampaignAuth = (campaignId) => {
    navigate(`/campaigns/${campaignId}/participations/post`);
  };

  return (
    <div className="main-campaign-container">
      <h1>참여중 캠페인</h1>
      <div className="main-campaign-list">
        {campaigns.length === 0 ? (
          <p>참여중인 캠페인이 없습니다.</p>
        ) : (
          campaigns.map((campaign) => (
            <div
              className="main-campaign-item"
              key={campaign.id}
              onClick={() => goCampaignAuth(campaign.id)}
            >
              <img src={campaign.imageUrl} alt="campaign img" />
              <h2>#{campaign.title}</h2>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MainCampaignList;
