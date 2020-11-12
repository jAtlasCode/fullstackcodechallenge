import React from "react";
import "./modal.css";

export default function Modal(props) {
  const { show, closeModal } = props;
  const { data } = props;
  console.log(data);
  return (
    <>
      <div className={show ? "overlay" : "hide"} onClick={closeModal} />
      <div className={show ? "modal" : "hide"}>
        <button onClick={closeModal}>X</button>
        <div className="ModalContent">
          <p className="Name">{data.name}</p>
          <hr />
          <p>
            <strong>Address: </strong>
            {data.address1}, {data.city}
          </p>
          <p>
            <strong>Hours: </strong>
            {data.hours}
          </p>
          <p>
            <strong>Phone: </strong>
            {data.telephone}
          </p>
          <p>
            <strong>Tags: </strong>
            {data.tags}
          </p>
          <p>
            <strong>Attire: </strong>
            {data.attire}
          </p>
        </div>
      </div>
    </>
  );
}
