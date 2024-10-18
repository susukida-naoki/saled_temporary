import React from 'react';
import ActionCampaign from './ActionCampaign';
import KnowledgeCampaign from './KnowledgeCampaign';
import './Campaign.css';

const Campaign: React.FC = () => {
  return (
    <div className="campaign">
      <div className="campaign-content">
        <div className="campaign-section">
          {/* <div className="header-icon"></div> */}
          {/* <h2 className="section-title">アクションカンペ</h2> */}
          <ActionCampaign />
        </div>
        <div className="campaign-section">
          {/* <h2 className="section-title">ナレッジカンペ</h2> */}
          <KnowledgeCampaign />
        </div>
      </div>
    </div>
  );
}

export default Campaign;