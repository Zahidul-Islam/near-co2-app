import React, { useState } from "react";
import "./HomePage.css";
import SearchBar from "../../components/SearchBar";
import Header from "../../components/header/Header";

export default function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Header hideSearch={true} />
      <div className="homePageContainer">
        <div className="homePage">
          <h1>
            <span style={{ color: "#2E5BFF" }}>CO2 </span>Explorer.
          </h1>

          <SearchBar value={search} setValue={setSearch} />
        </div>
      </div>
    </>
  );
}
