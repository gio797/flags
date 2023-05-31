import React, { useEffect, useState } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";

function CountryDetail() {
  const params = useParams();
  const [CountryDetail, setCountryDetail] = useState(null);
  const { darkMode } = useOutletContext();

  // useEffect(() => {
  //   darkMode
  //     ? (document.body.style.backgroundColor = "hsl(209, 23%, 22%)")
  //     : (document.body.style.backgroundColor = "");
  // }, [darkMode]);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${params.country}`)
      .then((res) => res.json())
      .then((data) => setCountryDetail(data[0]));
  }, [params.country]);

  return (
    <div
      className={
        darkMode ? "country-detail-wrapper dark" : "country-detail-wrapper"
      }
    >
      <Link to={"/"} className={darkMode ? "back-link dark" : "back-link"}>
        <i className="fa-solid fa-arrow-left"></i> Back
      </Link>
      {CountryDetail ? (
        <div className="country-detail">
          <img src={CountryDetail.flags.png} alt="flag" />
          <div className="country-detail-text">
            <h2>{CountryDetail.name.common}</h2>
            <p>
              Population: <span>{CountryDetail.population}</span>
            </p>
            <p>
              Region: <span>{CountryDetail.region}</span>
            </p>
            <p>
              Subregion: <span>{CountryDetail.subregion}</span>
            </p>
            <p>
              Capital: <span>{CountryDetail.capital}</span>
            </p>

            <h3>Border countries: </h3>
            <div className="border-countries">
              {CountryDetail.borders ? (
                CountryDetail.borders.map((item) => {
                  return (
                    <span className={darkMode ? "dark" : ""} key={item}>
                      {item}
                    </span>
                  );
                })
              ) : (
                <h4>No border countries</h4>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default CountryDetail;
