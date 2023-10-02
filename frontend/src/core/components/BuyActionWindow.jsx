import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import GeneralContext from "../../store/general-context";

import classes from "../css/BuyActionWindow.module.css";

const messageByName ={
  "PENNY-STOCK" : "This is a risky penny stock. Stock tips for this stock are being pushed through suspicious SMSes.",
  "SPLIT-STOCK": "This stock has undergone a split. A stock split just increases the number of shares and doesnt mean a stock has become cheaper. It has no impact on the value of your investment or the fundamentals of the company.",
 "IRP-STOCK": "This stock is undergoing Insolvency Resolution Process. This can have negative impact. Please understand the risks before investing further.",
 "ILLIQUID-STOCK": "This is a risky penny stock with low liquidity as well as market cap less than 100k. Investments in penny stocks carry higher risk. If you decide to invest, consider investing a smaller amount.",
 "SUSPENDED-STOCK":"This stock will be suspended from trading on the exchange from 10/2/2023 due to non-compliance with the Regulations of SEC."
}
const BuyActionWindow = ({ uid }) => {
  const [isDragging, setIsDragging] = useState(false);

  const generalContext = useContext(GeneralContext);

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  const handleDragStart = (event) => {
    const style = window.getComputedStyle(event.target, null);
    const offset =
      parseInt(style.getPropertyValue("left"), 10) -
      event.clientX +
      "," +
      (parseInt(style.getPropertyValue("top"), 10) - event.clientY);

    event.dataTransfer.setData("text/plain", offset);
    setTimeout(() => {
      setIsDragging(true);
    }, 0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const containerClass = isDragging
    ? `${classes.container} ${classes.dragging}`
    : `${classes.container}`;
  
  return (
    <div
      className={containerClass}
      id="buy-window"
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {messageByName[uid] && <div className={classes.messageContainer}>
        <div className={classes.messageBox}>{messageByName[uid]}</div>
      </div> }
      <div className={classes.header}>
      <div>
        <h3>
          Buy {uid} <span>NYSE</span> x 1 Qty{" "}
        </h3>
      </div>
      {/* <div className={classes.hexagon}>
          <p>N</p>
      </div> */}
      </div>

      <div className={classes.tab}>
        <button>Regular</button>
        <button>Cover</button>
        <button>AMO</button>
      </div>

      <div className={classes["regular-order"]}>
        <div className={classes["order-validity"]}>
          <label>
            <input type="radio" name="order_validity" id="bse" value="bse" />
            Intraday <span>MIS</span>
          </label>

          <label>
            <input
              type="radio"
              name="order_validity"
              id="nse"
              value="nse"
              checked
            />{" "}
            Longterm <span>CNC</span>
          </label>
        </div>

        <div className={classes["inputs"]}>
          <fieldset>
            <legend>Qty.</legend>
            <input type="number" name="qty" id="qty" defaultValue="1" />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              defaultValue="137.60"
            />
          </fieldset>
          <fieldset disabled>
            <legend>Trigger price</legend>
            <input type="number" name="trigger" id="trigger" disabled />
          </fieldset>
        </div>

        <div className={classes["options"]}>
          <span>More</span>

          <div className={classes["sub-order-type"]}>
            <label>
              <input type="radio" name="sub_order_type" />
              Market
            </label>

            <label>
              <input type="radio" name="sub_order_type" checked /> Limit
            </label>
          </div>

          <div className={classes["stop-loss-type"]}>
            <label>
              <input type="radio" name="stop_loss_type" id="bse" value="bse" />
              SL
            </label>

            <label>
              <input type="radio" name="stop_loss_type" id="nse" value="nse" />{" "}
              SL-M
            </label>
          </div>
        </div>
      </div>

      <div className={classes.buttons}>
        <span>Margin required $140.65</span>
        <div>
          <Link to="/" className={`${classes["btn"]} ${classes["btn-blue"]}`}>
            Buy
          </Link>
          <Link
            to=""
            className={`${classes["btn"]} ${classes["btn-grey"]}`}
            onClick={handleCancelClick}
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
