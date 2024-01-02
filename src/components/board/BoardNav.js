import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import '../../styles/board/boardNav.scss'

function BoardNav() {
    return (
        <>
            <Navbar style={{ paddingTop: '200px' }}>
                <Container className="justify-content-center text-center">
                    <Nav>
                        <Nav.Link as={Link} to="/board/tourisSpot" className='category'>관광지 추천</Nav.Link>
                        <Nav.Link as={Link} to="/board/company" className='category'>여행 메이트</Nav.Link>
                        <Nav.Link as={Link} to="/board/notice" className='category'>FAQ</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default BoardNav; 