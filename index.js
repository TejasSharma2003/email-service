const express = require("express");
const sendMail = require("./utils/sendMail");
const AppError = require("./utils/AppError");
const globalErrorController = require("./controllers/errorController");
const isEmailValid = require("./utils/isEmailValid");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: "Too many request from this IP. Please try again later in an hour.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(apiLimiter);

app.post("/sendmail", async (req, res, next) => {
  const { name, email, message } = req.body;

  try {
    if (!name || !email || !message) {
      return next(new AppError("Please give your credientials.", 400));
    }

    if (!(await isEmailValid(email))) {
      return next(new AppError("Please use a Valid Email Address", 400));
    }

    try {
      await sendMail(email, message);
      res.status(200).json({
        status: "success",
        message: "Your message is successfully sent to TEJAS",
      });
    } catch (err) {
      return next(
        new AppError(`${"Trouble sending the mail. Try again later."},500`)
      );
    }
  } catch (err) {
    return next(new AppError(err.message), 502);
  }
});

app.use("*", (req, res, next) => {
  return next(new AppError(`${req.originalUrl} not found`), 404);
});

app.use(compression());
app.use(globalErrorController);

module.exports = app;
