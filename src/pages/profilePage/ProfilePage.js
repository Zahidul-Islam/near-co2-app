import "./ProfilePage.css";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, ButtonBase, Rating, styled } from "@mui/material";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import ElectricBoltRoundedIcon from "@mui/icons-material/ElectricBoltRounded";

import Header from "../../components/header/Header";
import { ThemeContext } from "../../context/ThemeContext";
import axios from "axios";
import LoadingPage from "../../components/LoadingPage";
import SearchBar from "../../components/SearchBar";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    // color: "#ff6d75",
    color: "#78f400",
  },
  "& .MuiRating-iconHover": {
    // color: "#ff3d47",
    color: "#00f700",
  },
});

export default function ProfilePage() {
  const { theme } = useContext(ThemeContext);
  const { userId } = useParams();

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://vbwcol33s0.execute-api.us-east-1.amazonaws.com/staging/${userId}`
      )
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [userId]);

  return loading ? (
    <LoadingPage fullSize />
  ) : profile?.count === 0 ? (
    <div className="ProfilePageContainer">
      <div
        className="ProfilePage"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: theme.textColor }}>No result found!</h1>
        <p style={{ color: theme.textColor2 }}>Please try again</p>
        <SearchBar
          value={search}
          setValue={setSearch}
          style={{ margin: "0px", maxWidth: 600, width: "100%", marginTop: 20 }}
        />
      </div>
    </div>
  ) : (
    <>
      <Header hideSearch={false} />

      <div className="ProfilePageContainer">
        <div className="ProfilePage">
          <h1>Account: @{userId}</h1>

          <div className="table">
            <div className="tableItem">
              <h4>TRANSACTIONS</h4>
              <div
                className="responce"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ArrowUpwardRoundedIcon
                  sx={{
                    fontSize: "3rem",
                    paddingTop: "7.5px",
                  }}
                />
                <h2>{profile?.count}</h2>
              </div>
            </div>

            <div className="tableItem" style={{ borderLeftWidth: 0 }}>
              <h4>CO2 Perk Wh</h4>
              <div
                className="responce"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ElectricBoltRoundedIcon
                  sx={{
                    fontSize: "3rem",
                    paddingTop: "7.5px",
                  }}
                />
                <h2>{parseFloat(profile?.totalCO2PerkWh).toFixed(3)}</h2>
              </div>
            </div>

            <div className="tableItem" style={{ borderTopWidth: 0 }}>
              <h4>Offset Cost</h4>
              <div className="responce">
                <h2>$ {parseFloat(profile?.offsetCost).toFixed(3)}</h2>
              </div>
            </div>

            <div
              className="tableItem"
              style={{ borderTopWidth: 0, borderLeftWidth: 0 }}
            >
              <h4>Ratings</h4>
              <div
                className="responce"
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  paddingBottom: 20,
                }}
              >
                {/* <h2>{profile?.ratings}</h2> */}

                <StyledRating
                  readOnly
                  name="customized-color"
                  defaultValue={profile?.ratings}
                  getLabelText={(value) =>
                    `${value} Heart${value !== 1 ? "s" : ""}`
                  }
                  // precision={0.5}
                  icon={
                    <EnergySavingsLeafIcon
                      fontSize="inherit"
                      style={{ fontSize: "2.5rem" }}
                    />
                  }
                  emptyIcon={
                    <EnergySavingsLeafIcon
                      fontSize="inherit"
                      style={{ fontSize: "2.5rem" }}
                    />
                  }
                />
              </div>
            </div>
          </div>

          <div className="otherTable">
            {profile?.transactions?.map((transaction) => (
              <div
                style={{
                  marginBottom: 20,
                  display: "flex",
                }}
              >
                <TagRoundedIcon sx={{ color: "#00f700" }} />

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ fontWeight: 700, color: theme.textColor }}>
                    {transaction?.action_kind}
                    <Box
                      sx={{
                        transition: "all .2s ease-in-out",
                        fontWeight: 500,
                        color: theme.textColor2,
                        padding: "10px 0",
                        // marginTop: 5,
                        borderRadius: 5,
                        overflow: "hidden",
                        "&: hover": {
                          color: "#2E5BFF",
                          cursor: "pointer",
                          // backgroundColor: "#f0f0f0",
                        },
                      }}
                    >
                      {transaction?.transaction_hash}
                    </Box>
                  </p>

                  <p style={{ fontWeight: 700, color: theme.textColor }}>
                    <span style={{ fontWeight: 500, color: theme.textColor }}>
                      Receipt Conversion Gas Burnt:{" "}
                    </span>
                    {transaction?.receipt_conversion_gas_burnt}
                  </p>

                  <p style={{ fontWeight: 700, color: theme.textColor }}>
                    <span style={{ fontWeight: 500, color: theme.textColor }}>
                      Receipt Conversion Tokens Burnt:{" "}
                    </span>
                    {transaction?.receipt_conversion_tokens_burnt}
                  </p>

                  <p style={{ fontWeight: 700, color: theme.textColor }}>
                    <span style={{ fontWeight: 500, color: theme.textColor }}>
                      CO2 Per kWh:
                    </span>{" "}
                    {transaction?.co2PerkWh?.toFixed(3)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
