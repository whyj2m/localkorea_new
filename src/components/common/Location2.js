import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getListLocation } from "../../api/locationApi";
import "../../styles/Location2.css";

function Location2({ onCategoryClick, basePath }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // 전체 지역 정보 가져오기
        const response = await getListLocation();
        const locations = response.data || []; // null 또는 undefined 방지

        // "전체" 옵션 제거
        const filteredCategories = locations.filter(
          (category) => category.localNo !== "all"
        );

        setCategories(filteredCategories);
      } catch (error) {
        console.error("데이터 에러:", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="location2">
      {categories.map((category) => (
        <Link
          key={category.localNo}
          to={`${basePath}/${category.localNo}`}
          onClick={() => onCategoryClick(category.localNo)}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}

export default Location2;
