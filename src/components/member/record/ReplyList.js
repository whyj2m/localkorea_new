import { Container, Button, Pagination } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";

function ReplyList() {
  return (
    <>
      <h3 className="title">나의 활동 - 댓글</h3>
      <table className="replylist">
        <thead>
          <tr>
            <th>카테고리</th>
            <th>글제목</th>
            <th>댓글내용</th>
            <th>좋아요수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>관광지 추천</td>
            <td>게시글 제목입니다.</td>
            <td>작성한 댓글 내용</td>
            <td>
              <FaHeart />3
            </td>
          </tr>
          <tr>
            <td>관광지 추천</td>
            <td>게시글 제목입니다.</td>
            <td>작성한 댓글 내용</td>
            <td>
              <FaHeart />3
            </td>
          </tr>
          <tr>
            <td>관광지 추천</td>
            <td>게시글 제목입니다.</td>
            <td>작성한 댓글 내용</td>
            <td>
              <FaHeart />3
            </td>
          </tr>
          <tr>
            <td>관광지 추천</td>
            <td>게시글 제목입니다.</td>
            <td>작성한 댓글 내용</td>
            <td>
              <FaHeart />3
            </td>
          </tr>
          <tr>
            <td>관광지 추천</td>
            <td>게시글 제목입니다.</td>
            <td>작성한 댓글 내용</td>
            <td>
              <FaHeart />3
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

export default ReplyList;
