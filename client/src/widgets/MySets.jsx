/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import {
  AiOutlineUserAdd,
  AiOutlineHeart,
  AiFillHeart,
  AiFillYoutube,
} from "react-icons/ai";
import { BsSpotify } from "react-icons/bs";
import { BiLogoSoundcloud } from "react-icons/bi";
import defaultUser from "../assets/default-user.svg";

function MySets({ user }) {
  const likeRef = useRef();
  const [mySet, seMySet] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/xperience/${user._id}/sets`
        );
        if (!response.ok)
          throw new Error(
            `The fetch failed with a status of ${response.status}`
          );
        const responseData = await response.json();
        const data = responseData; // wich data?;
        seMySet(data); //[use, setUse] = useState(wich start?)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [seMySet, user]);
  return (
    <>
      <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 my-8">
        <div className="card-body flex-row  unbound-title text-2xl">
          My Sets &#040;{mySet && Object.keys(mySet).length}&#041;
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 mt-8">
        {mySet &&
          mySet.toReversed().map((set, index) => {
            const spotifyURL = set.spotify
              ? new URL(set.spotify).pathname.replace("/intl-de/", "/")
              : "";
            return (
              <div
                key={index}
                className="card flex-shrink-0 shadow-2xl bg-base-100 calc-w-50"
              >
                <div className="card-body flex-row pb-6">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      {set.userPicturePath ? (
                        <img src={set.userPicturePath} />
                      ) : (
                        <img src={defaultUser} />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between w-full pl-4">
                    <div className="flex flex-col">
                      <span className="unbound-title tracking-widest">
                        {user.first_name}
                      </span>
                      <span className="unbound-title tracking-widest">
                        {user.last_name}
                      </span>
                    </div>
                    <button className="btn btn-ghost btn-circle">
                      <AiOutlineUserAdd className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <span className="card-body pb-2 pt-0">{set.title}</span>
                <img className="card-body py-0" src={set.picturePath} alt="" />
                <div className="card-body flex-row items-center justify-between">
                  {set.youtube ? (
                    <div>
                      <button className="btn btn-ghost btn-circle">
                        <AiFillYoutube
                          className="w-8 h-8"
                          onClick={() =>
                            window[index + set.youtube].showModal()
                          }
                        />
                      </button>
                      <dialog id={index + set.youtube} className="modal">
                        <form method="dialog" className="modal-box max-w-fit">
                          <ReactPlayer
                            width="560px"
                            height="352px"
                            url={set.youtube}
                          />
                        </form>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>
                    </div>
                  ) : (
                    <></>
                  )}
                  {set.spotify ? (
                    <div>
                      <button className="btn btn-ghost btn-circle">
                        <BsSpotify
                          className="w-6 h-6"
                          onClick={() =>
                            window[index + set.spotify].showModal()
                          }
                        />
                      </button>
                      <dialog id={index + set.spotify} className="modal">
                        <form method="dialog" className="modal-box max-w-fit">
                          <iframe
                            src={`https://open.spotify.com/embed${spotifyURL}?utm_source=generator`}
                            width="560"
                            height="352"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                          ></iframe>
                        </form>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>
                    </div>
                  ) : (
                    <></>
                  )}
                  {set.soundcloud ? (
                    <div>
                      <button className="btn btn-ghost btn-circle">
                        <BiLogoSoundcloud
                          className="w-8 h-8"
                          onClick={() =>
                            window[index + set.soundcloud].showModal()
                          }
                        />
                      </button>
                      <dialog id={index + set.soundcloud} className="modal">
                        <form method="dialog" className="modal-box max-w-fit">
                          <ReactPlayer
                            width="560px"
                            height="352px"
                            url={set.soundcloud}
                          />
                        </form>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="flex flex-row items-center">
                    <button ref={likeRef} className="pr-2 pt-1 cursor-default">
                      {set.likes.length > 0 ? (
                        <AiFillHeart className="w-6 h-6" />
                      ) : (
                        <AiOutlineHeart className="w-6 h-6" />
                      )}
                    </button>
                    <span className="text-2xl">
                      {Object.keys(set.likes).length}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default MySets;
