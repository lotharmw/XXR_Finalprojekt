/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import defaultUser from "../assets/default-user.svg";
import Dropzone from "react-dropzone";
import { BsImage } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";
import AllPosts from "./AllPosts";

function MyPost({ user, token }) {
  const [isImage, setIsImage] = useState(false);
  const [file, setFile] = useState();
  const [post, setPost] = useState({
    userId: user._id,
    description: "",
    picturePath: "",
  });
  // const [isPost, setIsPost] = useState();
  const [allPosts, setAllPosts] = useState([]);

  const handleDescriptionChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handlePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("picture", file);
    formData.append("picturePath", post.picturePath);
    formData.append("description", post.description);
    formData.append("userId", post.userId);

    try {
      const response = await fetch("http://localhost:8000/posts", {
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
      setAllPosts(data);
    } catch (error) {
      console.log(error);
    }
    setIsImage(false);
    setFile();
    setPost({
      userId: user._id,
      description: "",
      picturePath: "",
    });
  };

  useEffect(() => {
    allPosts ? (post.picturePath = allPosts.secure_url) : null;
  }, [post, allPosts]);

  return (
    <>
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
            value={post.description}
            onChange={handleDescriptionChange}
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
        <div className="divider px-8 mt-0"></div>
        <div className="flex px-8 pb-6 justify-between">
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() => setIsImage(!isImage)}
          >
            <BsImage />
            <span className="pl-2">Image</span>
          </div>
          <button className="btn min-h-8" type="submit" onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
      <AllPosts
        token={token}
        user={user}
        allPosts={allPosts}
        setAllPosts={setAllPosts}
      />
    </>
  );
}

export default MyPost;
