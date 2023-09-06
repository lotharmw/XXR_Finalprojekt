import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json(user);
  if (!user)
    throw new ErrorResponse(`Cab not find User with the id ${id}`, 404);
  next();
});

export const getUserFriends = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  const friends = await Promise.all(
    user.friends.map((id) => User.findById(id))
  );
  const formattedFriends = friends.map(
    ({ _id, first_name, last_name, occupation, location, picturePath }) => {
      return { _id, first_name, last_name, occupation, location, picturePath };
    }
  );
  res.status(200).json(formattedFriends);
  if (!formattedFriends)
    throw new ErrorResponse(
      `Can not find Friends of User with the id ${id}`,
      404
    );
  next();
});

export const addRemoveFriends = asyncHandler(async (req, res, next) => {
  const { id, friendId } = req.params;
  const user = await User.findById(id);
  const friend = await User.findById(friendId);

  if (user.friends.includes(friendId)) {
    user.friends = user.friends.filter((id) => id !== friendId);
    friend.friends = user.friends.filter((id) => id !== id);
  } else {
    user.friends.push(friendId);
    friend.friends.push(id);
  }

  await user.save();
  await friend.save();
  const friends = await Promise.all(
    user.friends.map((id) => User.findById(id))
  );
  const formattedFriends = friends.map(
    ({ _id, first_name, last_name, occupation, location, picturePath }) => {
      return { _id, first_name, last_name, occupation, location, picturePath };
    }
  );
  res.status(200).json(formattedFriends);
  if (!formattedFriends)
    throw new ErrorResponse(
      `Cab not find Friends of User with the id ${id}`,
      404
    );
  next();
});
