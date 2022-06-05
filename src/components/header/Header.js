import { Chip, Stack } from "@mui/material";
import { useState } from "react";
import "./Header.css";
import CircleIcon from "@mui/icons-material/Circle";
import SignalWifi2BarRoundedIcon from "@mui/icons-material/SignalWifi2BarRounded";
import SearchBar from "../SearchBar";
import { Link } from "react-router-dom";

export default function Header({ hideSearch }) {
  const [search, setSearch] = useState("");

  return (
    <div className="headerContainer">
      <div className="header">
        <div className="leftSection">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div
              style={{
                overflowY: "hidden",
              }}
            >
              <h2 style={{ color: "black" }}>NEAR</h2>
              <h2 style={{ color: "#00ff00" }}>ZERO</h2>
            </div>
          </Link>
        </div>

        {!hideSearch && (
          <>
            <SearchBar
              value={search}
              setValue={setSearch}
              style={{ margin: "0px", maxWidth: 600, width: "100%" }}
            />
          </>
        )}
        <div className="rightSection">
          <Chip
            label="Testnet"
            icon={
              <CircleIcon
                style={{
                  color: "#00ff00",
                  fontSize: ".75rem",
                  marginLeft: 10,
                }}
              />
            }
            deleteIcon={
              <SignalWifi2BarRoundedIcon
                style={{
                  fontSize: "1.25rem",
                  marginRight: 10,
                }}
              />
            }
            onDelete={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
