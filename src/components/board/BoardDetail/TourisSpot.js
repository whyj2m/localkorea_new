import { Form, Button, Card, Pagination, Col, Row } from 'react-bootstrap';
import BoardNav from '../BoardNav';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

import '../../../styles/board/board.scss';
import { getTourBaordList } from '../../../api/BoardApi';

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
                            <Button className='search-btn' as="input" type="submit" value="검색" />{' '}
                        </Form>
                    </Col>
                </div>
            </div >
        </>
    );
}


function TourisSpot() {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/board/boardWrite');
    };


    const [TourBoardListData, setTourBoardListData] = useState([]);

    useEffect(() => {
        const fetchTourBoardListData = async () => {
            try {
                const response = await getTourBaordList();
                const data = response.data
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
            {TourBoardListData.map(item => (
        <Card key={item.id} className='TourisSpot-Card'>
            <Row className="g-0 align-items-center">
                <Col md={8}>
                    <Card.Body>
                        <Card.Title>{item.locationCno} / {item.title}</Card.Title>
                        <Card.Text>
                           {item.content}
                        </Card.Text>
                        <Card.Text>{item.regDate}</Card.Text>
                    </Card.Body>
                </Col>
                <Col md={4}>
                    <div className="d-flex justify-content-center">
                        <Card.Img className='TourisSpot-Img' variant="top" src="../../assets/test/testImg.png" />
                    </div>
                </Col>
            </Row>
        </Card>
    ))}



                <div className="underline"></div>

                <div class="underline"></div>

                {/* 페이징 */}
                <Row className='justify-content-center align-items-center bottom'>
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
                    <Col md={1}>
                        <Button className='write-btn' as="input" type="submit" value="글작성" onClick={handleButtonClick} />
                    </Col>
                </Row>
            </div>

        </>
    );
}

export { SearchForm, TourisSpot };