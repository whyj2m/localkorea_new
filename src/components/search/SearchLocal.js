import { Container, Row, Col, Pagination } from 'react-bootstrap';
import '../../styles/Search.scss';
import { BsEye } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import Search from './Search';

function SearchLocal() {
    return (
        <>
        <Search/>
        <Container>
            <div className="search_local">
                <div className="sub_title">
                    <h3 className='title'>관광지 (<span>100</span>건)</h3>
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
        </Container>
        <Pagination className='pagination justify-content-center'>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Item >{4}</Pagination.Item>
        <Pagination.Item>{5}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
    </Pagination>
        </>
    );
}

export default SearchLocal;