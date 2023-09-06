/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import MyPost from "../widgets/MyPost";
import dragon from "../../public/img/dragon.svg";
import vogelRe from "../../public/img/vogelRe.svg";

function Remember({ user, token, theme }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-[1fr,2fr,1fr] gap-4 max-w-screen-xl m-auto px-8 pt-4 calc-screen">
      <div className="flex flex-row items-start">
        <span className="uppercase unbound-title text-8xl">
          R<br />
          e<br />
          m<br />
          e<br />
          m<br />
          b<br />
          e<br />r
        </span>
        <img
          className={`pt-[16rem] w-[65%] ${
            theme == "night" ? "invert-[1]" : ""
          }`}
          src={vogelRe}
          alt=""
        />
      </div>
      <div>
        <MyPost user={user} token={token} />
      </div>
      <div className="flex flex-col">
        <h2 className="unbound-title text-4xl text-right">
          Create <br />
          Your <br />
          Memory
        </h2>
        <img
          className={`w-4/5 pt-20 ml-auto ${
            theme == "night" ? "invert-[1]" : ""
          }`}
          src={dragon}
          alt=""
        />
        {token ? (
          <></>
        ) : (
          <>
            <AiOutlineLogin
              className="mx-auto w-12 h-12 cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            />
            <span className="mx-auto unbound-title text-center">
              Login
              <br /> to
              <br /> create
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default Remember;
