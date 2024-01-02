import '../../../styles/board/notice.scss'
import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import BoardNav from '../BoardNav';


function Notice() {
    const [activeKey, setActiveKey] = useState(null);

    const handleAccordionClick = (eventKey) => {
        setActiveKey(activeKey === eventKey ? null : eventKey);
    };

    return (
        <>
            <BoardNav />

            <div className="container">
                <Accordion activeKey={activeKey} onSelect={handleAccordionClick}>
                    <Card>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header className="headerName">
                                서비스 |      새하마노 방방곡곡은 어떤 사이트인가요?
                            </Accordion.Header>
                            <Accordion.Body>
                                "새하마노 방방곡곡"은 대한민국의 동, 서, 남, 북을 아우르는 우리말로,{"\n"}
                                전국의 지역, 관광지, 축제, 특산물 등 다양한 관광 정보를 종합적으로 제공하는{"\n"}
                                대한민국 방방곡곡 소개 웹사이트입니다. {"\n"}
                                방방곡곡은 기상청 API와 카카오 지도를 기반으로 실시간 날씨와 위치 정보를 제공하며,  {"\n"}
                                대한민국에 대한 다양한 정보를 제공합니다.{"\n"}

                                * 저장한 정보도 웹을 통해 확인하실 수 있습니다. (※회원가입 및 로그인 필수)
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="2">
                            <Accordion.Header id="headerName">
                                회원 |      계정을 잃어버렸어요
                            </Accordion.Header>
                            <Accordion.Body>
                                ① 로그인 버튼을 클릭 합니다 → ② 아이디/비밀번호 찾기 버튼을 클릭합니다. → ③ 본인 인증으로 찾기에서 휴대폰 인증 버튼을 클릭 합니다. → ④본인인증 → 두루누비 계정으로 가입 되어 있을 일 경우 SMS / SNS 계정으로 가입 되어 있을 경우 안내 메시지를 통해 확인 하실 수 있습니다.※두루누비 자료실에서 두루누비 사용자메뉴얼 다운 받으시면 좀 더 편리하고 정확하게 내용을 확인 하실 수 있습니다.※지속적인 오류가 발생 할 경우 오류신고 게시판을 이용하시면 빠른 시일 내 답변 드리겠습니다.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="3">
                            <Accordion.Header id="headerName">
                                 회원 |      비밀번호를 잃어버렸어요
                            </Accordion.Header>
                            <Accordion.Body>
                                ① 로그인 버튼을 클릭 합니다 → ② 아이디/비밀번호 찾기 버튼을 클릭합니다. → ③ 본인 인증으로 찾기에서 휴대폰 인증 버튼을 클릭 합니다. → ④본인인증 → 두루누비 계정으로 가입 되어 있을 경우 SMS / SNS 계정으로 가입 되어 있을 경우 안내 메시지를 통해 확인 하실 수 있습니다.

                                ※두루누비 자료실에서 두루누비 사용자 메뉴얼 다운 받으시면 좀 더 편리하고 정확하게 내용을 확인 하실 수 있습니다.

                                ※지속적인 오류가 발생 할 경우 오류신고 게시판을 이용하시면 빠른 시일 내 답변 드리겠습니다.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="4">
                            <Accordion.Header id="headerName">
                               게시판 |      관광지 추천 게시판은 어떻게 이용하나요?
                            </Accordion.Header>
                            <Accordion.Body>
                                ① 로그인 버튼을 클릭 합니다 → ② 아이디/비밀번호 찾기 버튼을 클릭합니다. → ③ 본인 인증으로 찾기에서 휴대폰 인증 버튼을 클릭 합니다. → ④본인인증 → 두루누비 계정으로 가입 되어 있을 경우 SMS / SNS 계정으로 가입 되어 있을 경우 안내 메시지를 통해 확인 하실 수 있습니다.

                                ※두루누비 자료실에서 두루누비 사용자 메뉴얼 다운 받으시면 좀 더 편리하고 정확하게 내용을 확인 하실 수 있습니다.

                                ※지속적인 오류가 발생 할 경우 오류신고 게시판을 이용하시면 빠른 시일 내 답변 드리겠습니다.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="5">
                            <Accordion.Header id="headerName">
                               게시판 |      여행메이트 구하기는 어떻게 이용하나요?
                            </Accordion.Header>
                            <Accordion.Body>
                                ① 로그인 버튼을 클릭 합니다 → ② 아이디/비밀번호 찾기 버튼을 클릭합니다. → ③ 본인 인증으로 찾기에서 휴대폰 인증 버튼을 클릭 합니다. → ④본인인증 → 두루누비 계정으로 가입 되어 있을 경우 SMS / SNS 계정으로 가입 되어 있을 경우 안내 메시지를 통해 확인 하실 수 있습니다.

                                ※두루누비 자료실에서 두루누비 사용자 메뉴얼 다운 받으시면 좀 더 편리하고 정확하게 내용을 확인 하실 수 있습니다.

                                ※지속적인 오류가 발생 할 경우 오류신고 게시판을 이용하시면 빠른 시일 내 답변 드리겠습니다.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="6">
                            <Accordion.Header id="headerName">
                               서비스 |      문의사항이나 건의사항이 있어요
                            </Accordion.Header>
                            <Accordion.Body>
                                ① 로그인 버튼을 클릭 합니다 → ② 아이디/비밀번호 찾기 버튼을 클릭합니다. → ③ 본인 인증으로 찾기에서 휴대폰 인증 버튼을 클릭 합니다. → ④본인인증 → 두루누비 계정으로 가입 되어 있을 경우 SMS / SNS 계정으로 가입 되어 있을 경우 안내 메시지를 통해 확인 하실 수 있습니다.

                                ※두루누비 자료실에서 두루누비 사용자 메뉴얼 다운 받으시면 좀 더 편리하고 정확하게 내용을 확인 하실 수 있습니다.

                                ※지속적인 오류가 발생 할 경우 오류신고 게시판을 이용하시면 빠른 시일 내 답변 드리겠습니다.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Card>
                </Accordion>
            </div>
        </>
    );
}

export default Notice;
