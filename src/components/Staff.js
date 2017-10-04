import React from "react";
import EditInfo from "./EditInfo";
//import PropTypes from 'prop-types'
const coverterTime = str => {
  let monthNames = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
  ];
  let date = str.substring(0, 10).split("-");
  return date[2] + " " + monthNames[date[1] - 1] + " " + date[0];
};

const Staff = ({ workers, posts, actions, editElementId }) => {
  return (
    <ul className="staff">
      {workers.map((elem, i) => {
        if (elem.id === editElementId) {
          return (
            <EditInfo
              id={editElementId}
              worker={elem}
              posts={posts}
              actions={actions}
              key={editElementId}
            />
          );
        } else
          return (
            <li className="worker" key={elem.id}>
              <img src={elem.image} alt={elem.first_name} />
              <div className="wrapper">
                <p className="initials">
                  {elem.first_name + " " + elem.last_name}
                </p>
                <p className="birthDay">{coverterTime(elem.birth_date)}</p>
                <p className="rank">{posts[elem.post - 1].name}</p>
                <button
                  className="edit"
                  onClick={(id = elem.id) => {
                    actions.SetEditElementID(elem.id);
                  }}
                >
                  Редактировать
                </button>
              </div>
            </li>
          );
      })}
    </ul>
  );
};

export default Staff;
