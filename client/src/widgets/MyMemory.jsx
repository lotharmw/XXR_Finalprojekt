/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import { AiOutlineUserAdd, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import defaultUser from "../assets/default-user.svg";

function MyMemory({ user }) {
  const likeRef = useRef();
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_XXR}/posts/${user._id}/posts`
        );
        if (!response.ok)
          throw new Error(
            `The fetch failed with a status of ${response.status}`
          );
        const responseData = await response.json();
        const data = responseData;
        setAllPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setAllPosts, user]);
  return (
    <>
      <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 my-8">
        <div className="card-body flex-row  unbound-title text-2xl">
          My Sets &#040;{allPosts && Object.keys(allPosts).length}&#041;
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 mt-8">
        {allPosts &&
          allPosts.toReversed().map((post, index) => {
            return (
              <div
                key={index}
                className="card flex-shrink-0 calc-w-50 shadow-2xl bg-base-100"
              >
                <div className="card-body flex-row">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      {post.userPicturePath ? (
                        <img src={post.userPicturePath} />
                      ) : (
                        <img src={defaultUser} />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between w-full pl-4">
                    <div className="flex flex-col">
                      <span>{post.first_name}</span>
                      <span>{post.last_name}</span>
                    </div>
                    <button className="btn btn-ghost btn-circle">
                      <AiOutlineUserAdd className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <span>{post.description}</span>
                  <img src={post.picturePath} alt="" />
                </div>
                <div className="card-body pt-0">
                  <div className="flex flex-row items-center gap-2">
                    <button ref={likeRef} name={user._id}>
                      {user._id in post.likes ? (
                        <AiFillHeart />
                      ) : (
                        <AiOutlineHeart />
                      )}
                    </button>
                    <span>{Object.keys(post.likes).length}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default MyMemory;
