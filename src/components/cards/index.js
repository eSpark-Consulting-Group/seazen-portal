import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import "./style.css";
import deliveryIcon from "./delivery-icon.svg";
import pickupIcon from "./pickup-icon.svg";
import cateringIcon from "./catering-icon.svg";
import dineInIcon from "./dinein-icon.svg";
import { useNavigate } from "react-router";
import { paths } from "../../routes/paths";
import { useMediaQuery } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const images =[

{
  name:"first card image",
  image: "/assets/img/15.png"
},
{
  name:"second card image",
  image: "/assets/img/21.png"
},
{
  name:"third card image",
  image: "/assets/img/17.png"
},
{
  name:"fourth card image",
  image: "/assets/img/23.png"
},
{
  name:"fifth card image",
  image: "/assets/img/19.png"
},
{
  name:"sixth card image",
  image: "/assets/img/25.png"
},

];

const icons = [
  {
    id: 2,
    orderType: "delivery",
    image: deliveryIcon,
  },
  {
    id: 3,
    orderType: "pickUp",
    image: pickupIcon,
  },
  {
    id: 1,
    orderType: "catering",
    image: cateringIcon,
  },
  {
    id: 0,
    orderType: "dineIn",
    image: dineInIcon,
  },
];

export const restaurantThemeColor = {
  "Restaurant 1": {
    main: "#003964",
    light: "#095371",
  },
  "Restaurant 2": {
    main: "#424E1F",
    light: "#596732",
  },
  "Restaurant 3": {
    main: "#026754",
    light: "#308979",
    contrastText: "#fff",
  },
  "Restaurant 4": {
    main: "#172931",
    light: "#2E4A57",
  },
  "Restaurant 5": {
    main: "#2A3549",
    light: "#435067",
  },
  "Restaurant 6": {
    main: "#0E1220",
    light: "#293046",
  },
  // "Restaurant 7": {
  //   main: "#101F4A",
  //   light: "#101F4A",
  // },
  // "Restaurant 8": {
  //   main: "#9C0B2A",
  //   light: "#B51739",
  // },
};

const BasicCard = ({ clickedButtonIndex, orderTypeFilter }) => {
  const navigate = useNavigate();
  const captions = [
    icons,
    [icons[0], icons[1], icons[3]],
    icons,
    icons,
    [icons[0], icons[1], icons[3]],
    [icons[1], icons[3]],

  ];

  const isMediumScreen = useMediaQuery(
    "(max-width: 400px) and (min-width: 385px)"
  );
  const isSmallScreen = useMediaQuery(
    "(max-width: 500px) and (min-width: 385px)"
  );
  const isSmallerScreen = useMediaQuery("(max-width: 350px ) (min-width: 290px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 290px)");
  
  // Adjust cardWidth to apply 120px width to screens less than 350px
  const cardWidth = isSmallScreen
    ? isMediumScreen
      ? 180
      : isSmallerScreen
      ? 180
      : 190
    : isSmallerScreen
    ? 170
    : isVerySmallScreen
    ? 145
    : 161;
  
  const getCardClassName = () => {
    if (orderTypeFilter) {
      return orderTypeFilter === "delivery"
        ? "restaurantCard-border-delivery"
        : "restaurantCard-border-near";
    } else {
      return "restaurantCard-no-border";
    }
  };

  const getClassNameAccordingToFilter = (orderTypeId) => {
    if (
      orderTypeId === clickedButtonIndex &&
      orderTypeFilter &&
      orderTypeId !== 1
    ) {
      return orderTypeFilter === "delivery"
        ? "button-icons-styles-delivery"
        : "button-icons-styles-near";
    }
  };

  // Define the width and height for the SVG icons
  const iconWidth = "7px";
  const iconHeight = "9px";

  const goToRestaurantMenuPage = (restaurant) => {
    navigate(paths.menu + `/${restaurant}`);
  };

  return (
    <div className="restaurantCard-container container-fluid">
      {Object.keys(restaurantThemeColor).map((restaurant, index) => (
        <div
          key={index}
          className={`restaurantCards restaurantCard-${
            isSmallScreen ? "small" : "large"
          } ${getCardClassName()}`}
        >
          <Card
            sx={{
              width: cardWidth,
              borderRadius: 1,
            }}
            className="restaurantCards"
            onClick={() => {
              goToRestaurantMenuPage(restaurant);
            }}
          >
            <img
              className="restaurantCard-img"
              src={images[index].image}
              alt={`Card ${index + 1}`}
            />
            <div
              className={`svg-container ${
                clickedButtonIndex !== null ? "expanded" : "collapsed"
              }`}
            >
              <div className="inner-svg-container">
                {captions[index].map((icon, i) => {
                  return (
                    <div key={i} className="icon-row">
                      <img
                        className={getClassNameAccordingToFilter(icon.id)}
                        src={icon.image}
                        alt={`Icon ${i + 1}`}
                        style={{ width: iconWidth, height: iconHeight }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default BasicCard;
