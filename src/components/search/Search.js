import "../../styles/Search.scss";
import Nav from "react-bootstrap/Nav";
import { IoSearch } from "react-icons/io5";
import { Container } from "react-bootstrap";
import { useState } from "react";

function Search({
  onSearch,
  onSearchSubmit,
  displayedTotalLength,
  placelength,
  festivallength,
  foodlength,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const results = await onSearch(searchTerm);

    if (results !== undefined) {
      setSearchResults(results);
      onSearchSubmit(searchTerm);
    }

    // Remove the setDisplayedTotalLength line
    console.log(displayedTotalLength);
  };

  return (
    <div className="search">
      <div className="headline"></div>
      <Container>
        <div className="seach_top">
          <h1 className="title">통합검색</h1>
          <div className="wrap">
            <form onSubmit={handleSearchSubmit} className="form">
              <input
                type="text"
                name="search"
                placeholder="검색어를 입력하세요."
                className="inp"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="sIcon">
                <IoSearch />
              </div>
            </form>
          </div>
          <div className="result_comment">
            <h3>
              "{searchTerm}"에 관한 <span>{displayedTotalLength}</span>건의
              검색결과가 있습니다.
            </h3>
          </div>
        </div>
        <div className="result_gnb">
          <Nav
            variant="underline"
            className="justify-content-center"
            defaultActiveKey="/search/whole"
          >
            <Nav.Item>
              <Nav.Link href="/search/whole" className="mx-3">
                전체 ({displayedTotalLength}건)
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/search/local" className="mx-3">
                관광지 ({placelength}건)
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/search/festival" className="mx-3">
                축제 ({festivallength}건)
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/search/specialties" className="mx-3">
                특산물 ({foodlength}건)
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className="sort">
          <Nav className="justify-content-end" activeKey="/home">
            <Nav.Item>
              <Nav.Link href="#!">관련도순</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#!">최신순</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#!">인기순</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </Container>
    </div>
  );
}

export default Search;
