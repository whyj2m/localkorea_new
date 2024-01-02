// Video.js

import React from "react";
import "../../styles/Video.css";

function Video() {
  let imageSource;
  let videoText;

  // 기본값으로 main 경로 설정
  imageSource = "/assets/video/mainimage.jpg";
  videoText =
    "모든 날이 새로움으로 가득찬, 희망과 긍정의 순간을 함께 만들어가는 즐거움을 찾아 떠나는 여정.";

  return (
    <div className="video">
      <div className="video-container">
        {/* 이미지 태그로 변경 */}
        <img src={imageSource} alt="main background" className="videoSrc" />
        <div className="video-text">
          <h1>{videoText}</h1>
        </div>
      </div>
    </div>
  );
}

export default Video;
