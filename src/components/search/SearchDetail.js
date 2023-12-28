import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/Search.scss';
import { FaAngleRight } from "react-icons/fa6";
import { BsEye } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import Search from './Search';

function SearchDetail() {
  return (
    <div className="search">
        <Search/>
        <Container>
            <div className="search_local">
                <div className="sub_title">
                    <h3 className='title'>관광지 (<span>100</span>건)</h3>
                    <Button className='btn' variant="light" href='/search/local'>검색결과 더 보기<FaAngleRight className='icon' /></Button>
                </div>
                <hr className='contour' />
                <Row className='search_result'>
                    <Col sm={12} md={4} className="img"><img src="../../assets/local/main-sample1.jpg" alt="" /></Col>
                    <Col sm={12} md={8}>
                        <Row>
                            <Col xs={10} className='text'>
                                <h3 className='title'>관광지 이름</h3>
                                <p className='address'>장소 mollitia quisquam perspiciatis alias sapiente modi commodi</p>
                                <p className='explanation'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur architecto, placeat ad natus neque nostrum cumque laborum ullam est quibusdam officiis iure, similique sapiente expedita et deleniti, praesentium eveniet incidunt? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, nisi. Reiciendis cupiditate dolores, expedita repellat illo fuga aliquam mollitia veritatis necessitatibus possimus similique corporis dicta iste quas commodi. Voluptas, reprehenderit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, asperiores velit alias exercitationem explicabo necessitatibus maxime hic, culpa, vitae autem earum perferendis officiis aut soluta similique fuga consectetur vel ipsam.</p>
                            </Col>
                            <Col xs={2}>
                                <div className="views"><BsEye className='icon' /> 123</div>
                                <div className="likes"><FaHeart className='icon' /> 10</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='search_result'>
                    <Col sm={12} md={4} className="img"><img src="../../assets/local/main-sample1.jpg" alt="" /></Col>
                    <Col sm={12} md={8}>
                        <Row>
                            <Col xs={10} className='text'>
                                <h3 className='title'>관광지 이름</h3>
                                <p className='address'>장소 mollitia quisquam perspiciatis alias sapiente modi commodi</p>
                                <p className='explanation'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur architecto, placeat ad natus neque nostrum cumque laborum ullam est quibusdam officiis iure, similique sapiente expedita et deleniti, praesentium eveniet incidunt? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, nisi. Reiciendis cupiditate dolores, expedita repellat illo fuga aliquam mollitia veritatis necessitatibus possimus similique corporis dicta iste quas commodi. Voluptas, reprehenderit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, asperiores velit alias exercitationem explicabo necessitatibus maxime hic, culpa, vitae autem earum perferendis officiis aut soluta similique fuga consectetur vel ipsam.</p>
                            </Col>
                            <Col xs={2}>
                                <div className="views"><BsEye className='icon' /> 123</div>
                                <div className="likes"><FaHeart className='icon' /> 10</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='search_result'>
                    <Col sm={12} md={4} className="img"><img src="../../assets/local/main-sample1.jpg" alt="" /></Col>
                    <Col sm={12} md={8}>
                        <Row>
                            <Col xs={10} className='text'>
                                <h3 className='title'>관광지 이름</h3>
                                <p className='address'>장소 mollitia quisquam perspiciatis alias sapiente modi commodi</p>
                                <p className='explanation'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur architecto, placeat ad natus neque nostrum cumque laborum ullam est quibusdam officiis iure, similique sapiente expedita et deleniti, praesentium eveniet incidunt? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, nisi. Reiciendis cupiditate dolores, expedita repellat illo fuga aliquam mollitia veritatis necessitatibus possimus similique corporis dicta iste quas commodi. Voluptas, reprehenderit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, asperiores velit alias exercitationem explicabo necessitatibus maxime hic, culpa, vitae autem earum perferendis officiis aut soluta similique fuga consectetur vel ipsam.</p>
                            </Col>
                            <Col xs={2}>
                                <div className="views"><BsEye className='icon' /> 123</div>
                                <div className="likes"><FaHeart className='icon' /> 10</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className="search_fest">
                <div className="sub_title">
                    <h3 className='title'>축제 (<span>100</span>건)</h3>
                    <Button className='btn' variant="light" href='/search/festival'>검색결과 더 보기<FaAngleRight className='icon' /></Button>
                </div>
                <hr className='contour'/>
                <Row className='search_result'>
                    <Col sm={12} md={4} className="img"><img src="../../assets/festival/festivalexam.png" alt="" /></Col>
                    <Col sm={12} md={8}>
                        <Row>
                            <Col xs={10} className='text'>
                                <h3 className='title'>축제 이름</h3>
                                <p className='address'>장소 mollitia quisquam perspiciatis alias sapiente modi commodi</p>
                                <p className='explanation'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur architecto, placeat ad natus neque nostrum cumque laborum ullam est quibusdam officiis iure, similique sapiente expedita et deleniti, praesentium eveniet incidunt? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, nisi. Reiciendis cupiditate dolores, expedita repellat illo fuga aliquam mollitia veritatis necessitatibus possimus similique corporis dicta iste quas commodi. Voluptas, reprehenderit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, asperiores velit alias exercitationem explicabo necessitatibus maxime hic, culpa, vitae autem earum perferendis officiis aut soluta similique fuga consectetur vel ipsam.</p>
                            </Col>
                            <Col xs={2}>
                                <div className="views"><BsEye className='icon'/> 123</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='search_result'>
                    <Col sm={12} md={4} className="img"><img src="../../assets/festival/festivalexam.png" alt="" /></Col>
                    <Col sm={12} md={8}>
                        <Row>
                            <Col xs={10} className='text'>
                                <h3 className='title'>축제 이름</h3>
                                <p className='address'>장소 mollitia quisquam perspiciatis alias sapiente modi commodi</p>
                                <p className='explanation'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur architecto, placeat ad natus neque nostrum cumque laborum ullam est quibusdam officiis iure, similique sapiente expedita et deleniti, praesentium eveniet incidunt? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, nisi. Reiciendis cupiditate dolores, expedita repellat illo fuga aliquam mollitia veritatis necessitatibus possimus similique corporis dicta iste quas commodi. Voluptas, reprehenderit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, asperiores velit alias exercitationem explicabo necessitatibus maxime hic, culpa, vitae autem earum perferendis officiis aut soluta similique fuga consectetur vel ipsam.</p>
                            </Col>
                            <Col xs={2}>
                                <div className="views"><BsEye className='icon'/> 123</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='search_result'>
                    <Col sm={12} md={4} className="img"><img src="../../assets/festival/festivalexam.png" alt="" /></Col>
                    <Col sm={12} md={8}>
                        <Row>
                            <Col xs={10} className='text'>
                                <h3 className='title'>축제 이름</h3>
                                <p className='address'>장소 mollitia quisquam perspiciatis alias sapiente modi commodi</p>
                                <p className='explanation'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur architecto, placeat ad natus neque nostrum cumque laborum ullam est quibusdam officiis iure, similique sapiente expedita et deleniti, praesentium eveniet incidunt? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, nisi. Reiciendis cupiditate dolores, expedita repellat illo fuga aliquam mollitia veritatis necessitatibus possimus similique corporis dicta iste quas commodi. Voluptas, reprehenderit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, asperiores velit alias exercitationem explicabo necessitatibus maxime hic, culpa, vitae autem earum perferendis officiis aut soluta similique fuga consectetur vel ipsam.</p>
                            </Col>
                            <Col xs={2}>
                                <div className="views"><BsEye className='icon'/> 123</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className="search_specialties">
                <div className="sub_title">
                    <h3 className='title'>특산물 (<span>100</span>건)</h3>
                    <Button className='btn' variant="light" href='/search/specialties'>검색결과 더 보기<FaAngleRight className='icon' /></Button>
                </div>
                <hr className='contour'/>
                <div className='specialties'>
                    <Row>
                        <Col sm={6} lg={3}>
                            <div className="img"><img src="../../assets/regionfood/apple.png" alt="" /></div>
                            <h3 className="title">사과</h3>
                            <p>Lorem ipsum dolor sit amet consectetur</p>
                        </Col>
                        <Col sm={6} lg={3}>
                            <div className="img"><img src="../../assets/regionfood/apple.png" alt="" /></div>
                            <h3 className="title">사과</h3>
                            <p>Lorem ipsum dolor sit amet consectetur</p>
                        </Col>
                        <Col sm={6} lg={3}>
                            <div className="img"><img src="../../assets/regionfood/apple.png" alt="" /></div>
                            <h3 className="title">사과</h3>
                            <p>Lorem ipsum dolor sit amet consectetur</p>
                        </Col>
                        <Col sm={6} lg={3}>
                            <div className="img"><img src="../../assets/regionfood/apple.png" alt="" /></div>
                            <h3 className="title">사과</h3>
                            <p>Lorem ipsum dolor sit amet consectetur</p>
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>
    </div>
  );
}

export default SearchDetail;