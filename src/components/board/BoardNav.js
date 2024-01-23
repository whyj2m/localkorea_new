// // css
// import { Form, Button, Card, Col, Row, Pagination } from 'react-bootstrap';

// function BoardNav() {
//     return (
//         <Row className='align-items-center'>
//             {/* 총건수 확인 */}
//             <Col md={8} className="place-total d-flex align-items-center">
//                 <div className="total">
//                     총<span>{filteredItems.length}</span>건
//                 </div>
//             </Col>
//             <Col xs={6} md={2} className="d-flex justify-content-end">
//                 {isLoggedIn && (
//                     <Button className='write-btn' as="input" type="submit" variant="outline-primary" value="글작성" onClick={handleButtonClick} />
//                 )}
//             </Col>
//             {/* 필터링 */}
//             <Col xs={6} md={2}>
//                 <Form.Select aria-label="지역을 선택하세요" onChange={handleLocationChange}>
//                     <option value="all">전체 지역</option>
//                     <option value="서울">서울</option>
//                     <option value="인천">인천</option>
//                     <option value="대전">대전</option>
//                     <option value="부산">부산</option>
//                     <option value="경기">경기</option>
//                     <option value="충청">충청</option>
//                     <option value="강원">강원</option>
//                     <option value="전라">전라</option>
//                     <option value="경상">경상</option>
//                 </Form.Select>
//             </Col>
//         </Row>
//     );
// }

// export default BoardNav;