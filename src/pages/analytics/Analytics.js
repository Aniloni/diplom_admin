import "./Analytics.scss";
import React from "react";
import MiniBar from "../../components/miniBar/miniBar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Bar from "../../components/bar/bar.js";
import Option from "../../components/option/option.js";
import CommentRound from "../../components/analytics-info/analytics-info.js";
import Comment from "../../components/analytics-info-year/analytics-info-year.js";
import AverageCards from "../../components/AverageCards/AverageCards.js";

const monthData = [
  { value: 516, height: "70px", color: "var(--beigeOpacity80)" },
  { value: "60%", height: "200px", color: "var(--redOpacity80)" },
  { value: "27мин. 19сек.", height: "223px", color: "var(--brownOpacity80)" },
];

const yearData = [
  {
    month: "Янв.",
    bars: [
      { height: "60px", color: "var(--brownOpacity80)" },
      { height: "70px", color: "var(--beigeOpacity80)" },
      { height: "50px", color: "var(--redOpacity80)" },
    ],
  },
  {
    month: "Фев.",
    bars: [
      { height: "50px", color: "var(--brownOpacity80)" },
      { height: "80px", color: "var(--beigeOpacity80)" },
      { height: "60px", color: "var(--redOpacity80)" },
    ],
  },
  {
    month: "Мар.",
    bars: [
      { height: "60px", color: "var(--brownOpacity80)" },
      { height: "70px", color: "var(--beigeOpacity80)" },
      { height: "50px", color: "var(--redOpacity80)" },
    ],
  },
  {
    month: "Апр.",
    bars: [
      { height: "50px", color: "var(--brownOpacity80)" },
      { height: "80px", color: "var(--beigeOpacity80)" },
      { height: "60px", color: "var(--redOpacity80)" },
    ],
  },
  {
    month: "Май",
    bars: [
      { height: "60px", color: "var(--brownOpacity80)" },
      { height: "70px", color: "var(--beigeOpacity80)" },
      { height: "50px", color: "var(--redOpacity80)" },
    ],
  },
  {
    month: "Июн.",
    bars: [
      { height: "50px", color: "var(--brownOpacity80)" },
      { height: "80px", color: "var(--beigeOpacity80)" },
      { height: "60px", color: "var(--redOpacity80)" },
    ],
  },
  {
    month: "Июл.",
    bars: [
      { height: "60px", color: "var(--brownOpacity80)" },
      { height: "70px", color: "var(--beigeOpacity80)" },
      { height: "50px", color: "var(--redOpacity80)" },
    ],
  },
  {
    month: "Авг.",
    bars: [
      { height: "50px", color: "var(--brownOpacity80)" },
      { height: "80px", color: "var(--beigeOpacity80)" },
      { height: "60px", color: "var(--redOpacity80)" },
    ],
  },
  {
    month: "Сен.",
    bars: [
      { height: "60px", color: "var(--brownOpacity80)" },
      { height: "70px", color: "var(--beigeOpacity80)" },
      { height: "50px", color: "var(--redOpacity80)" },
    ],
  },
  {
    month: "Окт.",
    bars: [
      { height: "50px", color: "var(--brownOpacity80)" },
      { height: "80px", color: "var(--beigeOpacity80)" },
      { height: "60px", color: "var(--redOpacity80)" },
    ],
  },
  {
    month: "Ноя.",
    bars: [
      { height: "60px", color: "var(--brownOpacity80)" },
      { height: "70px", color: "var(--beigeOpacity80)" },
      { height: "50px", color: "var(--redOpacity80)" },
    ],
  },
  {
    month: "Дек.",
    bars: [
      { height: "50px", color: "var(--brownOpacity80)" },
      { height: "80px", color: "var(--beigeOpacity80)" },
      { height: "60px", color: "var(--redOpacity80)" },
    ],
  },
];
const StyledSelect = styled(Select)(({ theme }) => ({
  fontFamily: "PT Sans",
  color: "black",
  fontSize: "32px",
  padding: "0",
  height: "37.5",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSelect-select": {
    padding: 0,
  },
  "& .MuiOutlinedInput-input": {
    padding: 0,
  },
}));

const Analytics = () => {
  const [period, setPeriod] = React.useState(10);

  const handleChange = (event) => {
    setPeriod(event.target.value);
  };
  var data;
  var place;
  var bar;
  if (period == 10) {
    place = "по Удмуртской Республике";
    bar = "max";
    data = yearData;
  } else {
    place = "по Ижевску";
    bar = "mini";
    data = monthData;
  }
  return (
    <>
    <AverageCards />
        <div className="analytics">
          <div className="header-analytics">
            <p className="analytics-p">Аналитика за</p>
            <FormControl sx={{ m: 0, paddingLeft: "17px" }}>
              <StyledSelect value={period} onChange={handleChange} displayEmpty>
                <MenuItem value={10}>год</MenuItem>
                <MenuItem value={20}>месяц</MenuItem>
              </StyledSelect>
            </FormControl>
          </div>
          <div className="analytics-cont">
            <p className="analytics-place">{place}</p>
            {bar == "mini" ? (
              <div className="analytics-bar">
                <Option
                  label="Месяц"
                  data={[
                    "Январь",
                    "Февраль",
                    "Март",
                    "Апрель",
                    "Май",
                    "Июнь",
                    "Июль",
                    "Август",
                    "Сентябрь",
                    "Октябрь",
                    "Ноябрь",
                    "Декабрь",
                  ]}
                ></Option>
                <MiniBar data={data}></MiniBar>
                <CommentRound></CommentRound>
              </div>
            ) : (
              <div className="analytics-bar">
                <Option label="Год" data={["2024", "2025", "2026"]}></Option>
                <Bar data={data}></Bar>
                <div className="comments">
                  <Comment
                    count={"516"}
                    percent={"60%"}
                    time={"27мин. 19сек."}
                  ></Comment>
                  <CommentRound></CommentRound>
                </div>
              </div>
            )}
          </div>
        </div>
        </>
  );
};

export default Analytics;
