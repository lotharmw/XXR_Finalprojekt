/* eslint-disable react/prop-types */
import defaultUser from "../assets/default-user.svg";
import { AiOutlineHome, AiOutlineEye, AiFillHeart } from "react-icons/ai";
import { MdWorkOutline } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import MyEvent from "../widgets/MyEvent";
import MySets from "../widgets/MySets";
import MyMemory from "../widgets/MyMemory";
function ProfilePage({ user, token }) {
  if (user == null) {
    user = localStorage.getItem("user");
  }

  console.log(user);
  return (
    <div className="grid grid-cols-[1fr,3fr] gap-4 max-w-screen-xl m-auto px-8 pt-4 calc-screen">
      <div className="pt-4">
        <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
          <div className="card-body flex-row pb-4">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {user.picturePath ? (
                  <img src={user.picturePath} />
                ) : (
                  <img src={defaultUser} />
                )}
              </div>
            </div>
            <div className="flex flex-col w-full pl-4 ">
              <span className="unbound-title tracking-widest">
                {user.first_name}
              </span>
              <span className="unbound-title tracking-widest">
                {user.last_name}
              </span>
            </div>
          </div>
          <div className="divider px-8 mt-0"></div>
          <div className="card-body flex-row py-4 items-center teko-text text-xl">
            <AiOutlineHome />
            <span>{user.location}</span>
          </div>
          <div className="card-body flex-row py-0 pb-4 items-center teko-text text-xl">
            <MdWorkOutline />
            <span>{user.occupation}</span>
          </div>
          <div className="card-body flex-row py-0 pb-4 items-center teko-text text-xl">
            <MdAlternateEmail />
            <span>{user.email}</span>
          </div>
          <div className="card-body flex-row py-0 pb-4 items-center teko-text text-xl">
            <AiOutlineEye />
            <span>Views: {user.viewedProfile}</span>
          </div>
          <div className="card-body flex-row py-0 pb-4 items-center teko-text text-xl">
            <AiFillHeart />
            <span>{user.impressions}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <MyEvent user={user} token={token} />
        <MySets user={user} token={token} />
        <MyMemory user={user} token={token} />
      </div>
    </div>
  );
}

export default ProfilePage;
