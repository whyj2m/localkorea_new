import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Col, Row } from "react-bootstrap";
import moment from "moment"; // 시간

import { getTourBaordList } from "../../../api/BoardApi";
import BoardNav from "../BoardNav";

import "../../../styles/board/board.scss";
import "../../../styles/board/tourisSpot.scss";

function SearchForm() {
  return (
    <>
      <div className="container search">
        <div className="row justify-content-end">
          <Col md={3} sx={6}>
            <Form className="d-flex ">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 form-control-sm border-0 border-bottom"
                aria-label="zSearch"
              />
              <Button
                className="search-btn"
                as="input"
                type="submit"
                value="검색"
              />{" "}
            </Form>
          </Col>
        </div>
      </div>
    </>
  );
}

function TourisSpot() {
  const navigate = useNavigate();

  // 글작성 버튼 입력시 boardWrite 페이지로 이동
  const handleButtonClick = () => {
    navigate("/board/boardWrite");
  };

  // 관광지 추천 게시판 글 가져오기
  const [TourBoardListData, setTourBoardListData] = useState([]);

  useEffect(() => {
    const fetchTourBoardListData = async () => {
      try {
        const response = await getTourBaordList();
        const data = response.data;
        console.log("TourBoardListData: ", response.data);
        setTourBoardListData(data);
      } catch (error) {
        console.error("Error fetching local data:", error);
      }
    };

    fetchTourBoardListData();
  }, []);

  return (
    <>
      <BoardNav />

      {/* 검색창 */}
      <SearchForm />

      {/* 관광지 카드 */}
      <div className="container">
        <div className="touriSpot-cotent">
          <Row className="align-items-center">
            <Col md={11} className="place-total d-flex align-items-center">
              <strong>
                {/* 총건수 확인 */}총<span> {TourBoardListData.length} </span>건
              </strong>
            </Col>
            <Col md={1} className="d-flex justify-content-end">
              <Button
                className="write-btn"
                as="input"
                type="submit"
                value="글작성"
                onClick={handleButtonClick}
              />
            </Col>
          </Row>

          {TourBoardListData.map((item) => (
            <Link to={`/boardView/${item.bno}`}>
              <Card key={item.bno} className="TourisSpot-Card">
                <Row className="g-0 align-items-center">
                  <Col md={3}>
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "100%" }}
                    >
                      <Card.Img
                        className="TourisSpot-Img"
                        variant="top"
                        src={item.imageSrc}
                      />
                    </div>
                  </Col>
                  <Col md={9}>
                    <Card.Body className="body">
                      <Card.Title className="title">
                        [{item.location}] {item.title}
                      </Card.Title>
                      {/* <Card.Text className="content">
                                                {item.content}
                                            </Card.Text> */}
                      <Card.Text className="time">
                        {moment(item.regDate).format("YYYY/MM/DD")}
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>

                <div className="underline" />
              </Card>
            </Link>
          ))}
          {/* 페이징 */}
          {/* <Row className='justify-content-center align-items-center bottom'>
                            <Col md={11}>
                                <Pagination className='pagination justify-content-center'>
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
                            </Col>
                        </Row> */}
        </div>
      </div>
    </>
  );
}

export { SearchForm, TourisSpot };
