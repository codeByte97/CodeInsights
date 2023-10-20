import React from 'react';
import './card.css'; 
function LeetCodeCard(props) {
  return (
    <div className="leetcode-card">
      <img src='/LeetCode.jpg' style={{ borderRadius: '0%' }} alt={'LeetCode'} className="user-avatar" />
      <p style={{color:'black',fontWeight:'bolder',fontSize:'1.5rem'}} >{props.username}</p>
      <div className="leetcode-stats">
        <div className="stat">
          <span className="label">Total Solved:</span>
          <span className="value">{props.totalSolved}</span>
        </div>
        <div className="stat">
          <span className="label" style={{ color: 'red' }}>Hard:</span>
          <span className="value">{props.hardSolved}</span>
        </div>
        <div className="stat">
          <span className="label" style={{ color: 'orange' }}>Medium:</span>
          <span className="value">{props.mediumSolved}</span>
        </div>
        <div className="stat">
          <span className="label" style={{ color: 'darkgreen' }}>Easy:</span>
          <span className="value">{props.easySolved}</span>
        </div>
        <div className="stat">
          <span className="label">Rank:</span>
          <span className="value">{props.rank}</span>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeCard;