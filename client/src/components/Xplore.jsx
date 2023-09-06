/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import Event from "../widgets/Event";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineLogin } from "react-icons/ai";
import { CiCircleRemove } from "react-icons/ci";
import snake from "../assets/snake.svg";

function Xplore({ theme, user, token }) {
  const [file, setFile] = useState();
  const [selected, setSelected] = useState("");

  const [event, setEvent] = useState({
    userId: "",
    title: "",
    date: "",
    time: "",
    location: "",
    city: "",
    genre: "",
    price: "",
    description: "",
    lineUp: "",
  });
  const [allEvents, setAllEvents] = useState([]);

  const handleSelectChange = (e) => {
    setSelected(e.target.value);
  };

  const handleEventChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
      userId: user._id,
    });
  };

  const handleEventPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("picture", file);
    formData.append("title", event.title);
    formData.append("date", event.date);
    formData.append("time", event.time);
    formData.append("radioEvent", selected);
    formData.append("location", event.location);
    formData.append("city", event.city);
    formData.append("genre", event.genre);
    formData.append("price", event.price);
    formData.append("description", event.description);
    formData.append("lineUp", event.lineUp);
    formData.append("userId", event.userId);

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_XXR}/xplore`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok)
        throw new Error(`The fetch failed with a status of ${response.status}`);
      const responseData = await response.json();
      const data = responseData;
      setAllEvents(data);
    } catch (error) {
      console.log(error);
    }
    setFile();
    setEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      city: "",
      genre: "",
      price: "",
      description: "",
      lineUp: "",
    });
    setSelected("");
  };

  const navigate = useNavigate();

  return (
    <div className="calc-screen grid grid-cols-[1fr,4fr,1fr] max-w-screen-xl m-auto py-16">
      <div>
        <span className="uppercase unbound-title text-8xl">
          X<br />p<br />
          l<br />
          o<br />
          r<br />e
        </span>
      </div>
      <div>
        <div className="unbound-title text-3xl uppercase pb-4">
          Upcoming Events
        </div>
        <div className="flex flex-row content-baseline flex-wrap gap-4">
          <Event
            user={user}
            token={token}
            allEvents={allEvents}
            setAllEvents={setAllEvents}
          />
        </div>
      </div>
      <div className="flex flex-col item-center gap-4">
        <h2 className="unbound-title text-4xl text-right">Create your Event</h2>
        <img
          className={`w-1/2 mx-auto ${theme == "night" ? "invert-[1]" : ""}`}
          src={snake}
          alt=""
        />
        {token ? (
          <AiOutlinePlusCircle
            className="mx-auto w-12 h-12 cursor-pointer"
            onClick={() => window.my_event.showModal()}
          />
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
        <dialog id="my_event" className="modal">
          <form method="dialog" className="modal-box max-w-[35rem]">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <div className="py-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="What's the name of your Event?"
                  name="title"
                  className="input input-bordered"
                  value={event.title}
                  onChange={handleEventChange}
                />
              </div>
              <div className="form-control">
                <label htmlFor="" className="label">
                  <span className="label-text">Image</span>
                </label>{" "}
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                    setFile(acceptedFiles[0]);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      {!file ? (
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <div className=" p-4 w-full border-dotted border-2 cursor-pointer">
                            Drag &apos;n&apos; drop some files here, or click to
                            select files
                          </div>
                        </div>
                      ) : (
                        <div className="w-full p-4 border-dotted border-2 flex flex-row justify-between items-center">
                          <div>{file.path}</div>
                          <CiCircleRemove
                            className="cursor-pointer w-8 h-8"
                            onClick={() => {
                              setFile(false);
                            }}
                          />
                        </div>
                      )}
                    </section>
                  )}
                </Dropzone>
              </div>
              <div className="flex flex-row gap-4 items-end">
                <div className="form-control w-1/4">
                  <label className="label cursor-pointer gap-3">
                    <span className="label-text">Public</span>
                    <input
                      type="radio"
                      name="radioEvent"
                      className="radio checked:bg-red-500"
                      value="Public"
                      checked={selected === "Public"}
                      onChange={handleSelectChange}
                    />
                  </label>
                  <label className="label cursor-pointer gap-3 pb-0">
                    <span className="label-text">Private</span>
                    <input
                      type="radio"
                      name="radioEvent"
                      className="radio checked:bg-blue-500"
                      checked={selected === "Private"}
                      value="Private"
                      onChange={handleSelectChange}
                    />
                  </label>
                </div>
                <div className="form-control w-[48%]">
                  <label className="label">
                    <span className="label-text">Date</span>
                  </label>
                  <input
                    type="date"
                    min={Date.now()}
                    name="date"
                    className="input input-bordered cursor-pointer"
                    value={event.date}
                    onChange={handleEventChange}
                  />
                </div>
                <div className="form-control w-[25%]">
                  <label className="label">
                    <span className="label-text">Time</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    className="input input-bordered cursor-pointer"
                    value={event.time}
                    onChange={handleEventChange}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Location</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Where the party at?"
                    className="input input-bordered"
                    value={event.location}
                    onChange={handleEventChange}
                  />
                </div>
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">City</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Wich city?"
                    className="input input-bordered"
                    value={event.city}
                    onChange={handleEventChange}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Genre</span>
                  </label>
                  <input
                    type="text"
                    name="genre"
                    placeholder="Which genre?"
                    className="input input-bordered"
                    value={event.genre}
                    onChange={handleEventChange}
                  />
                </div>
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="price"
                    placeholder="Whta's the price?"
                    className="input input-bordered"
                    value={event.price}
                    onChange={handleEventChange}
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">LineUp</span>
                </label>
                <input
                  type="text"
                  placeholder="Who's playing?"
                  name="lineUp"
                  className="input input-bordered"
                  value={event.lineUp}
                  onChange={handleEventChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input
                  type="text"
                  placeholder="Tell me some..."
                  name="description"
                  className="input input-bordered input-lg"
                  value={event.description}
                  onChange={handleEventChange}
                />
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleEventPost}
                >
                  Post Event
                </button>
              </div>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
}

export default Xplore;
