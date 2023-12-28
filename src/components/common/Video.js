import { useLocation } from 'react-router-dom';
import '../../styles/Video.css';

function Video() {
  const location = useLocation();
  const currentPath = location.pathname;

  let videoSource;
  let videoText;

  switch (currentPath) {
    case `${process.env.PUBLIC_URL}/regionfood`:
      videoSource = "/assets/video/regionfoodvideo.mp4";
      videoText = "특산물";
      break;
    case `${process.env.PUBLIC_URL}/festival/main`:
      videoSource = "/assets/video/festival.mp4";
      videoText = "축제";
      break;
    case `${process.env.PUBLIC_URL}/place/main`:
      videoSource = "/assets/video/place.mp4";
      videoText = "관광지";
      break;
    case `${process.env.PUBLIC_URL}/local/main`:
      videoSource = "/assets/video/localseoul.mp4";
      videoText = "지역소개";
      break;

    default:
      videoSource = "/assets/video/mainvideo.mp4";
      videoText = "모든 날이 새로움으로 가득찬, 희망과 긍정의 순간을 함께 만들어가는 즐거움을 찾아 떠나는 여정.";
      break;
  }

  return (
    <div className="video">
      <div className='video-container'>
        <video autoPlay loop muted className='videoSrc'>
          <source src={videoSource} type='video/mp4' />
        </video>
        <div className="video-text">
          <h1>{videoText}</h1>
        </div>
      </div>
    </div>
  );
}

export default Video;
