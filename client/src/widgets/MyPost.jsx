/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import defaultUser from "../assets/default-user.svg";
import Dropzone from "react-dropzone";
import { BsImage } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";

function MyPost({ user, token }) {
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState([]);
  const [myPost, setMyPost] = useState({
    userId: user._id,
    description: "",
    picturePath: "",
  });
  const [isPost, setIsPost] = useState();

  const handleDescriptionChange = (e) => {
    setMyPost({
      ...myPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/posts", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(myPost),
        });
        if (!response.ok)
          throw new Error(
            `The fetch failed with a status of ${response.status}`
          );
        const responseData = await response.json();
        const data = responseData; // wich data?;
        setIsPost(data); //[use, setUse] = useState(wich start?)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setIsImage(false);
  };
  useEffect(() => {
    image ? (myPost.picturePath = image) : null;
    console.log(imageURL);
  }, [imageURL, myPost, image]);

  return (
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
          name="description"
          className="input input-bordered rounded-3xl w-full ml-4"
          value={myPost.description}
          onChange={handleDescriptionChange}
        />
      </div>
      {isImage && (
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => {
            setImage(acceptedFiles[0]);
            setImageURL(URL.createObjectURL(acceptedFiles[0]));
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              {!image ? (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="mx-8 p-4 border-dotted border-2 cursor-pointer">
                    Drag &apos;n&apos; drop some files here, or click to select
                    files
                  </div>
                </div>
              ) : (
                <div className="mx-8 p-4 border-dotted border-2 flex flex-row justify-between items-center">
                  <div>{image.path}</div>
                  <CiCircleRemove
                    className="cursor-pointer w-8 h-8"
                    onClick={() => {
                      setImage(false);
                      setImageURL([]);
                    }}
                  />
                </div>
              )}
            </section>
          )}
        </Dropzone>
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
        <button className="btn min-h-8" type="submit" onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
}

export default MyPost;
