import { InputBase, ButtonBase } from "@mui/material";
import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";

export default function SearchBar({ value, setValue, style }) {
  const navigate = useNavigate();

  return (
    <div
      component="form"
      style={{
        margin: "0 20px 20px 20px",
        padding: 0,
        display: "flex",
        alignItems: "center",
        height: 50,
        boxShadow: "none",
        outline: "3px rgba(0,0,0,0.15) solid",
        borderRadius: 10,
        backgroundColor: "#FFF",
        overflow: "hidden",

        ...style,
      }}
    >
      <InputBase
        sx={{ marginLeft: 20, flex: 1 }}
        placeholder="Search for Account ID"
        inputProps={{
          "aria-label": "Search for Account ID",
        }}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            navigate(`/${value}`);
          }
        }}
      />
      <ButtonBase
        sx={{ height: 50, width: 75, backgroundColor: "#0F0" }}
        aria-label="search"
        component={Link}
        to={`/${value}`}
      >
        <SearchIcon sx={{ color: "#FFF" }} />
      </ButtonBase>
    </div>
  );
}
