// react
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// css
// import { Button } from 'react-bootstrap';
import '../../styles/board/companyView.scss';

// 토큰
import { jwtDecode } from "jwt-decode";

// icon
import { MdOutlineLocationOn, MdDateRange } from "react-icons/md";
// import { IoPersonCircleOutline } from "react-icons/io5";

// API
import { getCompanyDetail, postReply } from "../../api/BoardApi";
import { getReply } from "../../api/BoardApi";

// component
import BoardNav from './BoardNav';

// 시간
import moment from 'moment';

function CompanyView() {
  const { bno } = useParams();
  const [commentContent, setCommentContent] = useState('');

  // 댓글
  const [replyList, setReplyList] = useState([]);
  const [companyBoardListData, setCompanyBoardListData] = useState([]);

  // 토큰 가져오기
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  const decodedToken = jwtDecode(accessToken); // jwt 디코딩하여 페이로드에 엑세스
  const userId = decodedToken.id; // 사용자id에 엑세스

  // 댓글 조회
  const fetchReplyData = async () => {
    try {
      const response = await getReply(bno);
      const data = response.data;
      console.log("댓글: ", data);

      data.sort((a, b) => new Date(b.regDate) - new Date(a.regDate)); // 최근 등록댓글이 상단으로

      setReplyList(data);
    } catch (error) {
      console.error("댓글 데이터 가져오기 오류:", error);
    }
  };

  // 게시글 조회
  useEffect(() => {
    const fetchCompanyBoardListData = async () => {
      try {
        const response = await getCompanyDetail(bno);
        const data = response.data;

        setCompanyBoardListData(Array.isArray(data) ? data : [data]);
        fetchReplyData();
      } catch (error) {
        console.error("Error fetching local data:", error);
      }
    };

    fetchCompanyBoardListData();
  }, [bno]);

  // 댓글 작성
  const handleSubmit = async (e, bno) => {
    e.preventDefault();

    try {
      const commentData = {
        content: commentContent,
        bno: bno,
        id : userId
      };

      const response = await postReply(commentData);
      console.log(response);
      alert('댓글 작성 완료');

      setCommentContent(''); // 댓글 작성후 빈 배열로

      fetchReplyData();
    } catch (error) {
      console.log("댓글 작성 실패");
      alert('댓글 작성 실패');
    }
  };

  const handleChange = (e) => {
    setCommentContent(e.target.value);
  };

  return (
    <>
      <BoardNav />
      {companyBoardListData.map(item => (
        <div key={item.uniqueId} className='d-flex justify-content-center modal-'>
          <div className='companyView'>
            <div className="row">
              <div className="area-left col-md-6">
                <div className="info-left">
                  <h2 className="main-title">{item.title}</h2>
                  <div className="nav">
                    <div>
                      <p className='nav-location'><MdOutlineLocationOn className='nav-location-icon' />{item.location}</p>
                    </div>
                    <div className='nav-date'>
                      <MdDateRange className='nav-date-icon' />
                      <p className="nave-date-regDate">{moment(item.regDate).format('YYYY/MM/DD')}</p>
                    </div>
                    <div>
                      {/* <p className='nav-writer'><IoPersonCircleOutline className="nav-person-icno" />{item.id.id}</p> */}
                    </div>
                  </div>
                  <div>
                    {item.content}
                  </div>
                  <div className='Reply_div'>
                    <div>
                      <p>{userId}</p>
                    </div>
                    <div className='Reply_write'>
                      <textarea
                        rows='3'
                        type="text"
                        id="write_reply"
                        placeholder='100자 이내의 글을 입력해주세요.'
                        maxLength='100'
                        name='write_reply'
                        value={commentContent}
                        onChange={handleChange}
                      />
                      <input type='submit' value='등록' id='reply_submit_button'
                        onClick={(e) => handleSubmit(e, item.bno)} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="area-right col-md-6">
                <div className="Reply-list">
                  {replyList.map((reply) => (
                    <div key={reply.bno}>
                      <div className="Reply-nav">
                        <div className="nick-name">{reply.id}</div>
                        <div className="time">{reply.regDate}</div>
                      </div>
                      <div>
                        <div className="Reply-content">{reply.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CompanyView;
