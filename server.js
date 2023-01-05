const dotenv = require("dotenv");
dotenv.config();

const app = require("./index");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening in PORT ${PORT}`);
});
