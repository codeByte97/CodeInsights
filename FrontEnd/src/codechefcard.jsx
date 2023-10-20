import React from 'react';
import './card.css'; 
function CodeChefCard(props) {
  return (
    <div className="leetcode-card">
      <img src='/codechef.jpg' style={{ borderRadius: '0%' }} alt="codechef" className="user-avatar" />
      <p style={{color:'black',fontWeight:'bolder',fontSize:'1.5rem'}} >{props.username}</p>
      <div className="leetcode-stats">
        <div className="stat">
          <span className="label">currentrating:</span>
          <span className="value">{props.currentrating}</span>
        </div>
        <div className="stat">
          <span className="label">highestrating:</span>
          <span className="value">{props.highestrating}</span>
        </div>
        <div className="stat">
          <span className="label">globalrank</span>
          <span className="value">{props.globalrank}</span>
        </div>
        <div className="stat">
          <span className="label">countryrank:</span>
          <span className="value">{props.countryrank}</span>
        </div>
        <div className="stat ">
          <span className="label">stars:</span>
          <span className="value  Stars" style={{backgroundColor:props.color}}>{props.stars}</span>
        </div>
      </div>
    </div>
  );
};
export default CodeChefCard;