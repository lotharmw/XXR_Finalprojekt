/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { RiSoundModuleLine } from "react-icons/ri";
import { BsCalendarDate } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { BsCurrencyEuro } from "react-icons/bs";
import { GrLocationPin } from "react-icons/gr";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function MyEvent({ user, token }) {
  const likeRef = useRef();
  const [myEvents, setMyEvents] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/xplore/${user._id}/events`
        );
        if (!response.ok)
          throw new Error(
            `The fetch failed with a status of ${response.status}`
          );
        const responseData = await response.json();
        const data = responseData; // wich data?;
        setMyEvents(data); //[use, setUse] = useState(wich start?)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setMyEvents, user]);

  //   console.log(myEvents);

  return (
    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
      <div className="card-body flex-row pb-4 unbound-title text-2xl">
        My Events &#040;{myEvents && Object.keys(myEvents).length}&#041;
      </div>
      <div className="card-body flex-row flex-wrap gap-4">
        {myEvents &&
          myEvents.map((event, index) => {
            function getDayName(date = new Date(), locale = "de-DE") {
              return date.toLocaleDateString(locale, { weekday: "long" });
            }
            function getDayNumeric(date = new Date(), locale = "de-DE") {
              return date.toLocaleDateString(locale, { day: "numeric" });
            }
            function getMonthName(date = new Date(), locale = "de-DE") {
              return date.toLocaleDateString(locale, { month: "long" });
            }
            const day = getDayName(new Date(event.date), "de-DE");
            const dayNumb = getDayNumeric(new Date(event.date), "de-DE");
            const month = getMonthName(new Date(event.date), "de-DE");
            return (
              <div key={index} className="calc-w flex flex-col">
                <img
                  className="w-full min-h-4/5 cursor-pointer shadow-2xl"
                  src={event.picturePath}
                  alt="Shoes"
                  onClick={() => window[index + 2].showModal()}
                />
                <div className="h-1/5 pt-4">
                  <span className="teko-text">
                    {day}, {dayNumb} {month}
                  </span>
                  <h2 className="text-xl unbound-title">{event.title}</h2>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center">
                      <IoLocationOutline />
                      <span className="teko-text">{event.city}</span>
                    </div>
                    {token ? (
                      <div className="flex flex-row items-center">
                        <button
                          ref={likeRef}
                          name={user._id ? user._id : ""}
                          className="pr-1"
                        >
                          {user._id in event.likes ? (
                            <AiFillHeart />
                          ) : (
                            <AiOutlineHeart />
                          )}
                        </button>
                        <span>{Object.keys(event.likes).length}</span>
                      </div>
                    ) : (
                      <div className="flex flex-row items-center">
                        <button ref={likeRef} className="pr-1">
                          {Object.keys(event.likes).length > 0 ? (
                            <AiFillHeart />
                          ) : (
                            <AiOutlineHeart />
                          )}
                        </button>
                        <span>{Object.keys(event.likes).length}</span>
                      </div>
                    )}
                  </div>
                </div>
                <dialog id={index + 2} className="modal">
                  <form method="dialog" className="modal-box max-w-[75vw]">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                    <div className="flex flex-row">
                      <div className="max-h-[32rem]">
                        <img
                          className="h-full"
                          src={event.picturePath}
                          alt=""
                        />
                      </div>
                      <div className="w-full p-4 pr-16 flex flex-col">
                        <h2 className="text-4xl crisis-main_title">
                          {event.title}
                        </h2>
                        <div className="flex flex-row gap-x-4 gap-y-4 py-4 flex-wrap">
                          <div className="flex flex-row items-center">
                            <IoLocationOutline className="w-6 h-6 mr-2" />
                            <span className="teko-text text-2xl font-bold">
                              {event.city}
                            </span>
                          </div>
                          <div className="flex flex-row items-center">
                            <RiSoundModuleLine className="w-6 h-6 mr-2" />
                            <span className="teko-text text-2xl">
                              Genre: {event.genre}
                              <span className="font-bold">
                                Techno/Alternative
                              </span>
                            </span>
                          </div>
                          <div className="flex flex-row items-center">
                            <BiTimeFive className="w-6 h-6 mr-2" />
                            <span className="teko-text text-2xl">
                              Time:{" "}
                              <span className="font-bold">
                                {event.time} Uhr
                              </span>
                            </span>
                          </div>
                          <div className="flex flex-row items-center">
                            <BsCalendarDate className="w-6 h-6 mr-2" />
                            <span className="teko-text text-2xl">
                              Date:{" "}
                              <span className="font-bold">
                                {day}, {dayNumb} {month}
                              </span>
                            </span>
                          </div>
                          <div className="flex flex-row items-center">
                            <GrLocationPin className="w-6 h-6 mr-2" />
                            <span className="teko-text text-2xl">
                              Location:{" "}
                              <span className="font-bold">
                                {event.location}
                              </span>
                            </span>
                          </div>
                          <div className="flex flex-row items-center">
                            <span className="teko-text text-2xl">
                              Price:{" "}
                              <span className="font-bold">{event.price}</span>
                            </span>
                            <BsCurrencyEuro className="w-5 h-5" />
                          </div>
                        </div>
                        <span className="text-xl pb-4">
                          LineUp: <strong>{event.lineUp}</strong>
                        </span>
                        {event.description}
                        <p className="text-xl py-4"></p>
                        {token ? (
                          <div className="flex flex-row items-center mt-auto">
                            <button
                              ref={likeRef}
                              name={user._id}
                              className="pr-1"
                            >
                              {user._id in event.likes ? (
                                <AiFillHeart />
                              ) : (
                                <AiOutlineHeart />
                              )}
                            </button>
                            <span>{Object.keys(event.likes).length}</span>
                          </div>
                        ) : (
                          <div className="flex flex-row items-center mt-auto">
                            <button
                              ref={likeRef}
                              className="pr-2 pt-1 cursor-default"
                            >
                              {event.likes.length > 0 ? (
                                <AiFillHeart className="w-6 h-6" />
                              ) : (
                                <AiOutlineHeart className="w-6 h-6" />
                              )}
                            </button>
                            <span className="text-2xl">
                              {Object.keys(event.likes).length}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MyEvent;
