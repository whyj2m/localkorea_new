// react
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

// css
import '../../styles/board/companyView.scss';
import { MdOutlineLocationOn, MdDateRange } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { BsSend } from "react-icons/bs";
import { LuDelete } from "react-icons/lu";

// API
import { getCompanyDetail, postReply, getReply, deleteReply } from "../../api/BoardApi";
// import { getReply } from "../../api/BoardApi";
// import { deleteReply } from "../../api/BoardApi";

// 토큰
import { jwtDecode } from "jwt-decode";

// 시간
import moment from 'moment';
import 'moment/locale/ko'; // 한국어 로케일 추가

moment.locale('ko'); // 한국어로 로케일 설정

function CompanyView() {
  const { bno } = useParams();
  const [commentContent, setCommentContent] = useState('');

  // 댓글
  const [replyList, setReplyList] = useState([]);
  const [companyBoardListData, setCompanyBoardListData] = useState([]);

  // 토큰 가져오기
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  const decodedToken = accessToken ? jwtDecode(accessToken) : null; // jwt 디코딩하여 페이로드에 엑세스, 토큰이있는경우만 디코딩
  const userId = decodedToken?.id; // 사용자id에 엑세스
  const userName = decodedToken?.name;


  // 댓글 조회
  const fetchReplyData = async () => {
    try {
      const response = await getReply(bno);
      const data = response.data;

      data.sort((a, b) => new Date(b.regDate) - new Date(a.regDate)); // 최근 등록댓글이 상단으로

      setReplyList(data);
    } catch (error) {
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
        id: userId
      };

      const response = await postReply(commentData);

      setCommentContent(''); // 댓글 작성후 빈 배열로

      fetchReplyData();
    } catch (error) {
      alert('댓글 작성 실패');
    }
  };

  const handleChange = (e) => {
    setCommentContent(e.target.value);
  };

  // 댓글 삭제
  const deleteReplyApi = async (rno) => {
    try {
      const response = await deleteReply(rno);
      fetchReplyData();
    } catch (error) {
      throw error;
    }
  };

  // 삭제 버튼 클릭 시 호출되는 함수
  const handleDeleteReply = async (rno) => {
    try {
      const response = await deleteReplyApi(rno);

      if (response.status === 200) {
        window.location.reload();
      } else {
      }
    } catch (error) {
    }
  }

  // 로그인한 id와 댓글단 id가 같을 때 삭제
  const shouldShowDeleteButton = (reply) => {
    return userId === reply.id;
  };

  return (
    <>
      {/* 게시글확인 + 댓글입력창 */}
      {companyBoardListData.map(item => (
        <div key={item.bno} className='d-flex justify-content-center modal-'>
          <div className='companyView'>
            <div className="row">
              <div className="area-left col-md-6">
                <div className="info-left">
                  <h2>#{item.bno}</h2>
                  <h3 className="main-title">{item.title}</h3>
                  <div className="nav">
                    <div>
                      <p className='nav-location'><MdOutlineLocationOn className='nav-location-icon' />{item.location}</p>
                    </div>
                    <div className='nav-date'>
                      <div className="nav-date-icon"><MdDateRange /></div>
                      <p className="nave-date-regDate">{moment(item.regDate).format('YYYY/MM/DD')}</p>

                    </div>
                    <div>
                      <p className='nav-writer'><IoPersonCircleOutline className="nav-person-icno" />{item.id.name}</p>
                    </div>
                  </div>
                  <div className="body-section1">
                    {item.content}
                  </div>
                  <div className='reply_div'>
                    <p>{userName}</p>
                    <div className='reply_write'>
                      <textarea
                        rows='3'
                        type="text"
                        id="write_reply"
                        placeholder='댓글 달기...'
                        maxLength='100'
                        name='write_reply'
                        value={commentContent}
                        onChange={handleChange}
                      />
                      <button
                        type='submit'
                        id='reply_submit_button'
                        onClick={(e) => handleSubmit(e, item.bno)}
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <BsSend style={{ fontSize: '1.3em' }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* 댓글목록 */}
              <div className="area-right col-md-6">
                <div className="reply-list">
                  {replyList.map((reply) => (
                    <div className="reply-single" key={reply.rno}>
                      <div  >
                        <div className="reply-section1">
                          <div className="nick-name">{reply.name}</div>
                        </div>
                        <div className="reply-section2">
                          <div className="reply-content">{reply.content}</div>
                          {shouldShowDeleteButton(reply) && (
                            <LuDelete className="delete-icon" onClick={() => handleDeleteReply(reply.rno)} />
                          )}
                        </div>
                        <span className="time">{moment(reply.regDate).fromNow()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="companyList">
              <Link to="/board/company">다른 여행 메이트 찾기</Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CompanyView;
