import { Container, Button, Pagination } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";

function BoardList() {
  return (
    <>
      <h3 className="title">나의 활동 - 게시글</h3>
      
      <h4 className="title">관광지 추천</h4>
      <table className="boardlist recommendAttraction">
        <thead>
          <tr>
            <th>지역</th>
            <th>제목</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>서울</td>
            <td>게시글 제목입니다.</td>
            <td>
              <BsEye />
              11
            </td>
          </tr>
          <tr>
            <td>강원</td>
            <td>게시글 제목입니다.</td>
            <td>
              <BsEye />
              11
            </td>
          </tr>
          <tr>
            <td>충청</td>
            <td>게시글 제목입니다.</td>
            <td>
              <BsEye />
              11
            </td>
          </tr>
          <tr>
            <td>서울</td>
            <td>게시글 제목입니다.</td>
            <td>
              <BsEye />
              11
            </td>
          </tr>
          <tr>
            <td>서울</td>
            <td>게시글 제목입니다.</td>
            <td>
              <BsEye />
              11
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination className="pagination justify-content-center">
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Item>{4}</Pagination.Item>
        <Pagination.Item>{5}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
      <h4 className="title">여행 메이트</h4>
      <table className="boardlist travel_mate">
        <thead>
          <tr>
            <th>지역</th>
            <th>제목</th>
            <th>조회수</th>
            <th>댓글수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>서울</td>
            <td>게시글 제목입니다.</td>
            <td>
              <BsEye />
              11
            </td>
            <td>
              <FaRegCommentDots />9
            </td>
          </tr>
          <tr>
            <td>인천</td>
            <td>게시글 제목입니다.</td>
            <td>
              <BsEye />
              11
            </td>
            <td>
              <FaRegCommentDots />9
            </td>
          </tr>
          <tr>
            <td>부산</td>
            <td>게시글 제목입니다.</td>
            <td>
              <BsEye />
              11
            </td>
            <td>
              <FaRegCommentDots />9
            </td>
          </tr>
          <tr>
            <td>인천</td>
            <td>게시글 제목입니다.</td>
            <td>
              <BsEye />
              11
            </td>
            <td>
              <FaRegCommentDots />9
            </td>
          </tr>
          <tr>
            <td>인천</td>
            <td>게시글 제목입니다.</td>
            <td>
              <BsEye />
              11
            </td>
            <td>
              <FaRegCommentDots />9
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination className="pagination justify-content-center">
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Item>{4}</Pagination.Item>
        <Pagination.Item>{5}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </>
  );
}

export default BoardList;
