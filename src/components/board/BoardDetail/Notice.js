import { Pagination } from 'react-bootstrap';
import BoardNav from '../BoardNav';
import { HiMiniSpeakerWave } from "react-icons/hi2";

import '../../../styles/board/notice.scss'

function Notice() {
    return (
        <>
            <BoardNav />

            {/* 관광지 카드 */}
            <div className="container">
                <div className='total'>
                    총 <strong>500</strong>개의 게시물이 있습니다.
                </div>
                <table class="table table-hover">
                    <colgroup>
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '50%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '15%' }} />
                    </colgroup>
                    <thead>
                        <tr className='board_cate'>
                            <th scope="col">번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">작성자</th>
                            <th scope="col">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 고정공지 */}
                        <tr>
                            <th scope="row"><HiMiniSpeakerWave /></th>
                            <td>고정공지</td>
                            <td>관리자</td>
                            <td>2023.12.25</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>공지사항 제목</td>
                            <td>관리자</td>
                            <td>2023.12.21</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>관리자</td>
                            <td>2023.12.03</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>2023.10.18</td>
                        </tr>
                    </tbody>
                </table>


            </div>

            {/* 페이징 */}
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

export default Notice;