import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";
import "./reset.scss";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer.js";
import Main from "./components/common/Main";
import ScrollToTop from "./components/common/ScrolltoTop.js";
import {
  SearchForm,
  TourisSpot,
} from "./components/board/BoardDetail/TourisSpot"; // 수정된 부분

// 코드 분할을 적용할 컴포넌트들
const LocalMain = lazy(() => import("./components/local/LocalMain"));
const RegionfoodMain = lazy(() =>
  import("./components/regionfood/RegionfoodMain")
);
const PlaceMain = lazy(() => import("./components/place/PlaceMain"));
const PlcaeView = lazy(() => import("./components/place/PlaceView"));
const FestivalMain = lazy(() => import("./components/festival/FestivalMain"));
const FestivalView = lazy(() => import("./components/festival/FestivalView"));
const Company = lazy(() => import("./components/board/BoardDetail/Company"));

const Notice = lazy(() => import("./components/board/BoardDetail/Notice"));
const BoardWrite = lazy(() => import("./components/board/BoardWrite"));
const BoardView = lazy(() => import("./components/board/BoardView"));
const BoardEdit = lazy(() => import("./components/board/BoardEdit"));
const SearchDetail = lazy(() => import("./components/search/SearchDetail"));
const SearchLocal = lazy(() => import("./components/search/SearchLocal"));
const SearchFestival = lazy(() => import("./components/search/SearchFestival"));
const SearchRegionalItem = lazy(() =>
  import("./components/search/SearchRegionalItem")
);
const Login = lazy(() => import("./components/member/Login"));
const Signup = lazy(() => import("./components/member/Signup"));
const Mypage = lazy(() => import("./components/member/Mypage"));

function App() {
  return (
    <div className="App" id="App">
      <Header />
      {/* Suspense 컴포넌트 안에는 하나의 부모 컴포넌트로 감싸주어야 합니다. */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/local/:localNo" element={<LocalMain />} />
          <Route path="/localFoods/:localNo" element={<RegionfoodMain />} />
          <Route path="/place/:localNo" element={<PlaceMain />} />
          <Route path="/place/:localNo/:placeNo" element={<PlcaeView />} />
          <Route path="/festival/:localNo" element={<FestivalMain />} />
          <Route
            path="/festival/:localNo/:festivalNo"
            element={<FestivalView />}
          />
          <Route path="/board/company" element={<Company />} />
          <Route path="/board/tourisSpot" element={<TourisSpot />} />
          <Route path="/board/company" element={<Company />} />
          <Route path="/board/notice" element={<Notice />} />
          <Route path="/board/boardWrite" element={<BoardWrite />} />
          <Route path="/boardView/:bno" element={<BoardView />} />
          <Route path="/board/edit/:bno" element={<BoardEdit />} />
          <Route path="/search/whole" element={<SearchDetail />} />
          <Route path="/search/local" element={<SearchLocal />} />
          <Route path="/search/festival" element={<SearchFestival />} />
          <Route path="/search/specialties" element={<SearchRegionalItem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </Suspense>
      {/* 스크롤 탑 이동 */}
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default App;
