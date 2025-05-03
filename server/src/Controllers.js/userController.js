import { User } from "../Models/userSchema.js";

export const generateAccessAndRefreshToken = async (userId) => {
  if (!userId) {
    throw new Error({ message: "required Userid" });
  }

  try {
    const user = await User.findById(userId);
    console.log("user in generateToken", user);
    if (!user) {
      throw new Error({ message: "user doesn't exists " });
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(error);
  }
};
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "email and password is required fields" });
    }

    const existing = await User.findOne({
      email,
    });
    if (existing) {
      return res.status(400).json({ message: "user already exists" });
    }

    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });

    return res.status(202).json({
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
export const option = {
  httpOnly: true,
  secure: true,
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("in sigin ", email, password);
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "email and password is required fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user doesn't exist" });
    }
    console.log("in sigin user ", user);
    if (!(await user.isPasswordCorrect(password))) {
      return res.status(400).json({ message: "wrong password" });
    }
    console.log("password checked and is correct");
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    console.log(
      "in sigin just got the tokens",
      accessToken,
      "\n",
      refreshToken
    );

    if (!accessToken || !refreshToken) {
      return res
        .status(500)
        .json({ message: "internal server erro token not generate" });
    }

    return res
      .status(200)
      .cookie("accessToken", accessToken, option)
      .cookie("refreshToken", refreshToken, option)
      .json({
        user,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const signOut = async () => {};
