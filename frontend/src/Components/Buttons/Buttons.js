import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./Buttons.css";

//Button returns a button with three possible types: flat, raised or round
export default function Button({
  btnVariant,
  text,
  link,
  type,
  icon,
  onClick,
  tooltip,
  extraContainerStyles = {},
}) {
  //link, text, type, icon, onClick and tooltip are passed through props to this component
  if (!type || type === "") {
    if (typeof link === "string" && typeof btnVariant === "string") {
      //Makes sure link passed is a valid string
      if (icon && typeof icon === "string") {
        //Checks if an icon was passed and is a valid string
        if (btnVariant === "flat-icon") {
          if (link.startsWith("/")) {
            //For local or empty links, a react-router link as a button is returned with its provided icon
            return (
              <button
                style={extraContainerStyles}
                className="button"
                onClick={onClick}
              >
                <Link className="button-flat icon" to={link !== "" ? link : ""}>
                  {text ? <span>{text}</span> : null}
                  <Icon icon={icon} />
                </Link>
              </button>
            );
          } else if (link.startsWith("http", 0)) {
            //For remote links, an a element is returned with the icon provided
            return (
              <a
                className="button-flat icon"
                href={link}
                target="_blank"
                rel="noreferrer"
              >
                {text ? <span>{text}</span> : null}
                <Icon icon={icon} />
              </a>
            );
          } else if (link === "") {
            return (
              <button
                style={extraContainerStyles}
                className="button button-flat icon"
                onClick={onClick}
                type={"button"}
              >
                {text ? <span>{text}</span> : null}
                <Icon icon={icon} />
              </button>
            );
          }
          //Same checking for the raised with icon type button
        } else if (btnVariant === "raised-icon") {
          if (link.startsWith("/")) {
            return (
              <button
                style={extraContainerStyles}
                className="button"
                onClick={onClick}
              >
                <Link className="button-raised icon" to={link !== "" && link}>
                  {text ? <span>{text}</span> : null}
                  <Icon icon={icon} />
                </Link>
              </button>
            );
          } else if (link.startsWith("http", 0)) {
            return (
              <a
                className="button-raised icon"
                href={link}
                target="_blank"
                rel="noreferrer"
              >
                {text ? <span>{text}</span> : null}
                <Icon icon={icon} />
              </a>
            );
          } else if (link === "") {
            return (
              <button
                style={extraContainerStyles}
                className="button button-raised icon"
                onClick={onClick}
                type={"button"}
              >
                {text ? <span>{text}</span> : null}
                <Icon icon={icon} />
              </button>
            );
          }
        } else if (btnVariant === "round") {
          //For a round icon, only a react-router link with an icon is returned. No text included.
          if (link === "") {
            return (
              <button
                style={extraContainerStyles}
                className="button button-round tooltip"
                onClick={onClick}
                type={"button"}
              >
                <Icon icon={icon} />
                {tooltip && tooltip !== "" ? (
                  <span className="tooltip_text">{tooltip}</span>
                ) : null}
              </button>
            );
          } else {
            return (
              <button
                style={extraContainerStyles}
                className="button"
                onClick={onClick}
              >
                <Link className="button-round tooltip" to={link}>
                  <Icon icon={icon} />
                  {tooltip && tooltip !== "" ? (
                    <span className="tooltip_text">{tooltip}</span>
                  ) : null}
                </Link>
              </button>
            );
          }
          //An icon was passed as prop but button name is not correct type
        } else {
          console.error(
            "Button variant does not exist. Name might be wrong or misspelled"
          );
          return null;
        }
        //Same functionality and ckeckings as with icon-included buttons but for only text buttons
      } else {
        if (btnVariant === "flat") {
          if (link.startsWith("#") || link === "") {
            return (
              <button
                style={extraContainerStyles}
                className="button"
                onClick={onClick}
              >
                <a className="button-flat" href={link !== "" && link}>
                  <span>{text}</span>
                </a>
              </button>
            );
          } else {
            return (
              <button
                style={extraContainerStyles}
                className="button"
                onClick={onClick}
              >
                <Link className="button-flat" to={link}>
                  <span>{text}</span>
                </Link>
              </button>
            );
          }
        } else if (btnVariant === "raised") {
          if (link.startsWith("#") || link === "") {
            return (
              <button
                style={extraContainerStyles}
                className="button"
                onClick={onClick}
              >
                <a className="button-raised" href={link !== "" && link}>
                  <span>{text}</span>
                </a>
              </button>
            );
          } else if (link === "other") {
            return (
              <button
                style={extraContainerStyles}
                className="button"
                onClick={onClick}
              >
                <div className="button-raised">
                  <span>{text}</span>
                </div>
              </button>
            );
          } else {
            return (
              <button
                style={extraContainerStyles}
                className="button"
                onClick={onClick}
              >
                <Link className="button-raised" to={link}>
                  <span>{text}</span>
                </Link>
              </button>
            );
          }
          //Returns null for no rendering of the button
        } else {
          console.error("Unknown button type!");
          return null;
        }
      }
      //Returns null for no rendering of the button
    } else {
      console.error(
        `Link and Variant attributes must be strings only for Button component`
      );
      return null;
    }
    //In case Button was not given a link or is empty, return just a button element
  } else {
    return (
      <button
        style={extraContainerStyles}
        className="button button-raised"
        onClick={onClick}
        type={type}
      >
        <span>{text}</span>
      </button>
    );
  }
}
