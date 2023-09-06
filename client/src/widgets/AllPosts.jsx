/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import {
  AiOutlineUserAdd,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineUserDelete,
} from "react-icons/ai";
import defaultUser from "../assets/default-user.svg";

function AllPosts({ token, user, allPosts, setAllPosts }) {
  const likeRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/posts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
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
  }, [setAllPosts, token]);

  const handleLike = async (e, post) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/posts/like/${post._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: likeRef.current.name }),
        }
      );
      if (!response.ok)
        throw new Error(`The fetch failed with a status of ${response.status}`);
      const responseData = await response.json();
      const data = responseData; // wich data?;
      setAllPosts(data); //[use, setUse] = useState(wich start?)
    } catch (error) {
      console.log(error);
    }
  };
  const [added, setAdded] = useState();
  const handleAddFriend = async (e, post) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/users/${user._id}/${post.userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: likeRef.current.name }),
        }
      );
      if (!response.ok)
        throw new Error(`The fetch failed with a status of ${response.status}`);
      const responseData = await response.json();
      const data = responseData; // wich data?;
      setAdded(data); //[use, setUse] = useState(wich start?)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {allPosts?.toReversed().map((post, index) => {
        return (
          <div
            key={index}
            className="card flex-shrink-0 w-full shadow-2xl bg-base-100 my-8"
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
                  {added?.some((user) => {
                    return user._id === post.userId;
                  }) ? (
                    <AiOutlineUserDelete
                      onClick={(e) => handleAddFriend(e, post)}
                      className="w-6 h-6"
                    />
                  ) : (
                    <AiOutlineUserAdd
                      onClick={(e) => handleAddFriend(e, post)}
                      className="w-6 h-6"
                    />
                  )}
                </button>
              </div>
            </div>
            <div className="card-body pt-0">
              <span>{post.description}</span>
              <img src={post.picturePath} alt="" />
            </div>
            <div className="card-body pt-0">
              <div className="flex flex-row items-center gap-2">
                {token ? (
                  <button ref={likeRef} name={user._id}>
                    {user._id in post.likes ? (
                      <AiFillHeart onClick={(e) => handleLike(e, post)} />
                    ) : (
                      <AiOutlineHeart onClick={(e) => handleLike(e, post)} />
                    )}
                  </button>
                ) : (
                  <button>
                    <AiFillHeart />
                  </button>
                )}
                <span>{Object.keys(post.likes).length}</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default AllPosts;
