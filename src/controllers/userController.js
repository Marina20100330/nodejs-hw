import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const updateUserAvatar = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const file = req.file;

    if (!file) {
      throw createHttpError(400, 'No file');
    }

    const result = await saveFileToCloudinary(file.buffer);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: result.secure_url },
      { new: true }
    );

    res.status(200).json({
      url: updatedUser.avatar,
    });
  } catch (error) {
    next(error);
  }
};