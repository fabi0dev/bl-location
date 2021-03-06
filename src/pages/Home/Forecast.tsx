import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import React from "react";
import { Image, Text, View } from "react-native";

interface ForecastProps {
  wheatherCurrent: any;
}

export const Forecast = ({
  wheatherCurrent,
  loading,
}: ForecastProps): JSX.Element => {
  const { list } = wheatherCurrent;
  let dateForecast = [];

  const getDate = (d) => {
    return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
  };

  const getDayWeek = (dt) => {
    let d = new Date(dt * 1000);
    let dCur = new Date();
    let days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

    if (dCur.getDate() == d.getDate()) {
      return "Hoje";
    }

    return days[d.getDay()];
  };

  const getImgMain = (main, hour = false) => {
    switch (main) {
      case "Clear":
        if (hour !== false && (hour > 18 || hour < 6)) {
          return require("@assets/images/night.png");
        } else {
          return require("@assets/images/daylight.png");
        }
      case "Thunderstorm":
        return require("@assets/images/ranny_thunderstorm.png");
      case "Drizzle":
        return require("@assets/images/couldy_rainy.png");
      case "Rain":
        return require("@assets/images/cloudy_havyrain.png");
      case "Clouds":
        return require("@assets/images/cloudy.png");
    }
  };

  const ItemDay = ({ hour, temp, main }) => {
    return (
      <Box
        borderRadius={8}
        width={"32%"}
        pt={"cake"}
        pb={"cake"}
        bg={"rgba(0,0,0, .1)"}
      >
        <Box mb={"prim"}>
          <Box alignItems={"center"} mb={"prim"}>
            <Typography color={"base"} fontSize={18}>
              {hour}h
            </Typography>
          </Box>

          <Box alignItems={"center"} mb={"cake"}>
            <Image
              style={{ width: 50, height: 50 }}
              source={getImgMain(main, hour)}
            />
          </Box>

          <Box alignItems={"center"}>
            <Typography color={"base"} fontSize={22}>
              {parseInt(temp)}??
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  const Item = ({ dayDesc, min, max, main }) => {
    return (
      <Box
        width={"100%"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        pt={"qm"}
        pb={"qm"}
      >
        <Box mb={"prim"} width={"20%"} flexDirection={"row"}>
          <Box width={"80%"}>
            <Typography color={"base"} fontSize={18}>
              {dayDesc}
            </Typography>
          </Box>

          <Image style={{ width: 20, height: 20 }} source={getImgMain(main)} />
        </Box>

        <Box width={"60%"} alignSelf={"flex-end"}>
          <Box alignSelf={"flex-end"}>
            <Typography color={"base"} fontSize={18}>
              {parseInt(min)}?? ~ {parseInt(max)}??
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <Box mt={"xx"} mb={"nano"}>
        <Typography
          fontSize={13}
          fontWeight={"bold"}
          variant={"medium"}
          color={"blueLight"}
        >
          PREVIS??O DAS PR??XIMAS HORAS
        </Typography>
      </Box>

      <Box borderRadius={"nano"}>
        <Box flexDirection={"row"} justifyContent={"space-between"}>
          {list.map((itemWeather, key) => {
            if (key >= 3) {
              return;
            }

            let { dt, main, weather } = itemWeather;
            let hourWeather = new Date(dt * 1000).getHours();

            return (
              <ItemDay
                hour={hourWeather}
                key={key}
                temp={main.temp}
                main={weather[0].main}
              />
            );
          })}
        </Box>
      </Box>

      <Box mt={"xs"} mb={"nano"}>
        <Typography
          fontSize={13}
          fontWeight={"bold"}
          variant={"medium"}
          color={"blueLight"}
        >
          PREVIS??O DOS PR??XIMOS DIAS
        </Typography>
      </Box>

      <Box
        p={"nano"}
        borderRadius={"nano"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        bg={"rgba(0,0,0, .1)"}
      >
        {list.map((itemWeather, key) => {
          let { dt, main, weather } = itemWeather;
          let dateWeather = getDate(new Date(dt * 1000));

          if (dateForecast.indexOf(dateWeather) != -1) {
            return;
          }

          dateForecast.push(dateWeather);

          return (
            <Item
              key={key}
              dayDesc={getDayWeek(itemWeather.dt)}
              min={main.temp_min}
              max={main.temp_max}
              main={weather[0].main}
            />
          );
        })}
      </Box>
    </Box>
  );
};
