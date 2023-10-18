import React, { useEffect } from "react";

const ExpandedButton = (props) => {
  const {
    iconSrc,
    text,
    hideOther,
    otherText,
    buttonOneText,
    buttonTwoText,
    clicked,
    handleClick,
    id,
    handleOrderTypeFilter,
    filterClassDelivery,
    filterClassNear,
    filterSelectedNow,
    isButtonExpanded,
    selectedId,
    customButtonExpandedClass,
    handleFilterClick,
    notIncludes,
    selectedText,
  } = props;

  useEffect(() => {
    handleOrderTypeFilter(
      filterClassDelivery,
      filterClassNear,
      filterSelectedNow
    );
  }, [filterClassDelivery, filterClassNear]);

  return (
    <div
      className={`custom-button ${
        isButtonExpanded && selectedId === id ? "expanded" : ""
      } ${
        clicked ? "clicked" : ""
      } ${customButtonExpandedClass} ${notIncludes}`}
    >
      <img
        src={iconSrc}
        alt="Icon"
        className="orderTypebutton-icon"
        onClick={() => handleClick(text === "" ? otherText : text, id)}
      />
      {(hideOther || !hideOther) && (
        <span
          onClick={() =>
            handleClick(
              hideOther && selectedText !== "Catering" ? otherText : text,
              id
            )
          }
          className={`orderTypebutton-text`}
        >
          {hideOther && selectedText !== "Catering" ? otherText : text}
        </span>
      )}
      <span className="orderTypebutton-content">
        {isButtonExpanded && selectedId === id && (
          <div className="options">
            <button
              className={`orderTypebutton-style-one ${
                filterClassDelivery && "orderTypebutton-style-one-active"
              }`}
              onClick={() => handleFilterClick(buttonOneText)}
            >
              {buttonOneText}
            </button>
            <button
              className={`orderTypebutton-style-two ${
                filterClassNear && "orderTypebutton-style-two-active"
              }`}
              onClick={() => handleFilterClick(buttonTwoText)}
            >
              {buttonTwoText}
            </button>
          </div>
        )}
      </span>
    </div>
  );
};

export default ExpandedButton;
