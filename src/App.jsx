import { useEffect, useState } from "react";
import { Link, useSearchParams, useOutletContext } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const { darkMode } = useOutletContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const regionFilter = searchParams.get("region");
  const searchcountryFilter = searchParams.get("name");

  const displaydCountries = regionFilter
    ? data.filter((item) => item.region.toLowerCase() === regionFilter)
    : data;

  const displaySearchCountry = searchcountryFilter
    ? data.filter(
        (item) => item.name.common.toLowerCase() === searchcountryFilter
      )
    : [];

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams(`name=${search}`);
  }

  const searchCountryElement = displaySearchCountry.map((item) => {
    return (
      <div className="country-card" key={item.name.common}>
        <Link to={`/${item.name.common}`}>
          <img src={item.flags.png} alt="flag" />
          <div className="country-data">
            <h2>{item.name.common}</h2>
            <p>
              Population: <span>{item.population}</span>
            </p>
            <p>
              Region: <span>{item.region}</span>
            </p>
            <p>
              Capital: <span>{item.capital}</span>
            </p>
          </div>
        </Link>
      </div>
    );
  });

  const countryElements = displaydCountries.map((item) => {
    return (
      <div
        className={darkMode ? "country-card dark" : "country-card"}
        key={item.name.common}
      >
        <Link to={`/${item.name.common}`}>
          <img src={item.flags.png} alt="flag" />
          <div className="country-data">
            <h2>{item.name.common}</h2>
            <p>
              Population: <span>{item.population}</span>
            </p>
            <p>
              Region: <span>{item.region}</span>
            </p>
            <p>
              Capital: <span>{item.capital}</span>
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div className={darkMode ? "App dark" : "App"}>
      {/* <div className="filter-buttons">
        <Link to="?region=africa">Africa</Link>
        <Link to="?region=americas">America</Link>
        <Link to="?region=asia">Asia</Link>
        <Link to="?region=europe">Europe</Link>
        <Link to="?region=oceania">Oceania</Link>
        <Link to=".">Clear Filter</Link>
      </div> */}
      <div className="form-items">
        <form action="" onSubmit={handleSubmit}>
          <input
            className={darkMode ? "dark" : ""}
            type="text"
            name="searchinput"
            value={search}
            placeholder="search country"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={darkMode ? "dark" : ""}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        <select
          className={darkMode ? "dark" : ""}
          name="selectedRegion"
          value={searchParams}
          onChange={(e) => setSearchParams(e.target.value)}
        >
          <option value=".">Choose Region</option>
          <option value="?region=africa">Africa</option>
          <option value="?region=americas">America</option>
          <option value="?region=asia">Asia</option>
          <option value="?region=europe">Europe</option>
          <option value="?region=oceania">Oceania</option>
        </select>
      </div>

      <div className="card-wrapper">
        {searchCountryElement.length > 0
          ? searchCountryElement
          : countryElements}
      </div>
    </div>
  );
}

export default App;
