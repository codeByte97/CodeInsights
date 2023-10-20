import React from 'react';
import './card.css';
function CodeForceCard(props) {
  return (
    <>
      {
        props.message === 'Temporialy Not Available' ?
          <div className="leetcode-card" >
            <img src='/codeforces.png'  style={{ borderRadius: '0%' }} alt={'codeforces'} className="user-avatar" />
            <p  style={{backgroundColor:props.color}}  >{props.username}</p>
            <div className="leetcode-stats">
              <center>
                <div className="stat">
                  <span style={{ color: "red" }} className="value">{props.message}</span>
                </div>
              </center>
            </div>
          </div>
          : <div className="leetcode-card" >
          <img src='/codeforces.png'  style={{ borderRadius: '0%' }} alt={'codeforces'} className="user-avatar" />
          <p  style={{color:props.color,fontWeight:'bolder',fontSize:'1.5rem'}}  >{props.username}</p>
            <div className="leetcode-stats">
              <div className="stat">
                <span className="label">Rating:</span>
                <span className="value">{props.rating}</span>
              </div>
              <div className="stat">
                <span className="label">maxrank:</span>
                <span className="value" style={{color:props.maxcolor}} >{props.maxrank}</span>
              </div>
              <div className="stat">
                <span className="label">maxrating:</span>
                <span className="value">{props.maxrating}</span>
              </div>
              <div className="stat">
                <span className="label">Rank:</span>
                <span className="value" style={{color:props.color}} >{props.rank}</span>
              </div>
            </div>
          </div>}
    </>
  );
};
export default CodeForceCard;