/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";

import fish from "../assets/fish.svg";
import defaultUser from "../assets/default-user.svg";
import { BsImage, BsSpotify } from "react-icons/bs";
import { BiLogoSoundcloud } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import { AiOutlineLogin } from "react-icons/ai";
import { CiCircleRemove } from "react-icons/ci";
import Sets from "../widgets/Sets";

function Xperience({ theme, user, token }) {
  const [isImage, setIsImage] = useState(false);
  const [isYoutube, setIsYoutube] = useState(false);
  const [isSpotify, setIsSpotify] = useState(false);
  const [isSound, setIsSound] = useState(false);
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const [setPost, setSetPost] = useState({
    title: "",
    youtube: "",
    spotify: "",
    soundcloud: "",
  });
  const [allSetPosts, setAllSetPosts] = useState([]);

  const handleSetChange = (e) => {
    setSetPost({
      ...setPost,
      [e.target.name]: e.target.value,
      userId: user._id,
    });
  };

  const handleSetPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("picture", file);
    formData.append("title", setPost.title);
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("userPicturePath", user.picturePath);
    formData.append("youtube", setPost.youtube);
    formData.append("spotify", setPost.spotify);
    formData.append("soundcloud", setPost.soundcloud);
    formData.append("userId", user._id);

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_XXR}/xperience`);
      if (!response.ok)
        throw new Error(`The fetch failed with a status of ${response.status}`);
      const responseData = await response.json();
      const data = responseData;
      setAllSetPosts(data);
    } catch (error) {
      console.log(error);
    }
    setIsImage(false);
    setIsYoutube(false);
    setIsSpotify(false);
    setIsSound(false);
    setFile();
    setPost({
      title: "",
      youtube: "",
      spotify: "",
      soundcloud: "",
    });
  };
  return (
    <div className="calc-screen grid grid-cols-[1fr,4fr,1fr] max-w-screen-xl m-auto py-16">
      <div>
        <span className="uppercase unbound-title text-8xl">
          X<br />
          p<br />
          e<br />
          r<br />
          i<br />
          e<br />
          n<br />
          c<br />
          e<br />
        </span>
      </div>
      <div>
        <div className="unbound-title text-3xl uppercase pb-4">
          Enjoy Community Sets
        </div>
        {token ? (
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
              <input
                type="text"
                placeholder="What's in your mind..."
                name="title"
                className="input input-bordered rounded-3xl w-full ml-4"
                value={setPost.title}
                onChange={handleSetChange}
              />
            </div>
            {isImage && (
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
                        <div className="mx-8 p-4 border-dotted border-2 cursor-pointer">
                          Drag &apos;n&apos; drop some files here, or click to
                          select files
                        </div>
                      </div>
                    ) : (
                      <div className="mx-8 p-4 border-dotted border-2 flex flex-row justify-between items-center">
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
            )}
            {isYoutube && (
              <input
                type="text"
                placeholder="Show me your youtube link"
                name="youtube"
                className="input input-bordered rounded-3xl mx-8 my-2"
                value={setPost.youtube}
                onChange={handleSetChange}
              />
            )}
            {isSpotify && (
              <input
                type="text"
                placeholder="Show me your spotify link"
                name="spotify"
                className="input input-bordered rounded-3xl mx-8 my-2"
                value={setPost.spotify}
                onChange={handleSetChange}
              />
            )}
            {isSound && (
              <input
                type="text"
                placeholder="Show me your sound link"
                name="soundcloud"
                className="input input-bordered rounded-3xl mx-8 my-2"
                value={setPost.soundcloud}
                onChange={handleSetChange}
              />
            )}
            <div className="divider px-8 mt-0"></div>
            <div className="flex px-8 pb-6 justify-between">
              <div
                className="flex flex-row items-center cursor-pointer"
                onClick={() => setIsImage(!isImage)}
              >
                <BsImage />
                <span className="pl-2">Image</span>
              </div>
              <div
                className="flex flex-row items-center cursor-pointer"
                onClick={() => setIsYoutube(!isYoutube)}
              >
                <AiFillYoutube className="w-6 h-6" />
                <span className="pl-2">YouTube</span>
              </div>
              <div
                className="flex flex-row items-center cursor-pointer"
                onClick={() => setIsSpotify(!isSpotify)}
              >
                <BsSpotify className="w-5 h-5" />
                <span className="pl-2">Spotify</span>
              </div>
              <div
                className="flex flex-row items-center cursor-pointer"
                onClick={() => setIsSound(!isSound)}
              >
                <BiLogoSoundcloud className="w-6 h-6" />
                <span className="pl-2">Soundcloud</span>
              </div>
              <button
                className="btn min-h-8"
                type="submit"
                onClick={handleSetPost}
              >
                Post
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-row flex-wrap gap-4 mt-8">
          <Sets
            defaultUser={defaultUser}
            user={user}
            token={token}
            allSetPosts={allSetPosts}
            setAllSetPosts={setAllSetPosts}
          />
        </div>
        <div className="flex flex-row content-baseline flex-wrap gap-4"></div>
      </div>
      <div className="flex flex-col item-center">
        <h2 className="unbound-title text-4xl text-right">
          Create <br />
          Your <br />
          Set
        </h2>
        <img
          className={`pt-20 pb-4 ${theme == "night" ? "invert-[1]" : ""}`}
          src={fish}
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

export default Xperience;
