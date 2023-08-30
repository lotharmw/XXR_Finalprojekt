/* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";

function ProfileInfo({ user }) {
  return (
    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
      <div className="card-body">
        <div>{user.first_name}</div>
        <div>{user.first_name}</div>
        <div>{user.first_name}</div>
      </div>
    </div>
  );
}

export default ProfileInfo;
