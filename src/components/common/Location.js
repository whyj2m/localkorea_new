import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getListLocation } from "../../api/locationApi";
import "../../styles/Location.css";

function Location() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getListLocation();
        const locationsData = response.data;

        setLocations(locationsData);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocations();
  }, []);

  //  카테고리 이동 할 때에 클릭이벤트 확인이요
  const handleLocationClick = (location) => {
    console.log(`해당 지역은 ${location.name}`);
  };

  return (
    <>
      <div className="container" style={{ paddingTop: "150px" }}>
        <nav className="local justify-content-center text-center">
          <ul className="local-area">
            {locations.map((location) => (
              <li key={location.localNo}>
                <Link
                  to={`/local/${location.localNo}`}
                  className={`localcategory ${location.name.toLowerCase()}`}
                  // 여기서 확인
                  onClick={() => handleLocationClick(location)}
                >
                  <span className="local-area-text">{location.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Location;
