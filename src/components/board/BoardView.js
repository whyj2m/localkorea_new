import React from 'react';
import { useEffect, useState } from "react";
import { Row, Col } from 'react-bootstrap';

import { getTourBaordList } from '../../api/BoardApi';
import BoardNav from './BoardNav';

import '../../styles/board/boardView.scss';

function BoardView() {

    // 관광지 추천 게시판 상세 내용 가져오기
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


    // BoardView 컴포넌트의 내용
    return (
        <div>
            <BoardNav />

            <div className='container'>
                <div className='boardView-all'>
                    <div className="underline" />
                    {TourBoardListData.map(item => (
                        <Row>
                            <Col xs={4} md={1}>
                                <div>제목</div>
                            </Col>
                            <Col xs={8} md={8}>
                                <div>{item.title}</div>
                            </Col>
                        </Row>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BoardView;