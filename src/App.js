import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./reset.scss";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer.js";
import Main from "./components/common/Main";
import { TourisSpot } from "./components/board/BoardDetail/TourisSpot.js";
import Company from "./components/board/BoardDetail/Company.js";
import RegionfoodMain from "./components/regionfood/RegionfoodMain.js";
import SearchLocal from "./components/search/SearchLocal.js";
import SearchFestival from "./components/search/SearchFestival.js";
import SearchRegionalItem from "./components/search/SearchRegionalItem.js";
import SearchDetail from "./components/search/SearchDetail.js";
import Notice from "./components/board/BoardDetail/Notice.js";
import FestivalMain from "./components/festival/FestivalMain.js";
import FestivalView from "./components/festival/FestivalView.js";
import PlaceMain from "./components/place/PlaceMain.js";
import LocalMain from "./components/local/LocalMain.js";

import Login from "./components/member/Login.js";
import Signup from "./components/member/Signup.js";
import PlcaeView from "./components/place/PlaceView.js";
import BoardWrite from "./components/board/BoardWrite.js";
import Mypage from "./components/member/Mypage.js";

function App() {
  return (
    <div className="App" id="App">
      <Header />
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

        <Route path="/search/whole" element={<SearchDetail />} />
        <Route path="/search/local" element={<SearchLocal />} />
        <Route path="/search/festival" element={<SearchFestival />} />
        <Route path="/search/specialties" element={<SearchRegionalItem />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
