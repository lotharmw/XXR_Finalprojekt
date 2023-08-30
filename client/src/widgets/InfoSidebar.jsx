/* eslint-disable react/prop-types */

function InfoSidebar({ user }) {
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

export default InfoSidebar;
