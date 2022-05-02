const app = require("./app");
const { connectToDatabase } = require("./database");
const link =
  "mongodb+srv://Nishant09:User@123@cluster0.nr02t.mongodb.net/books?retryWrites=true&w=majority";
const port = 8080;
let dbUrl = link.dbUrl;
connectToDatabase(link).then(() => {
  app.listen(port, (err) => {
    if (err) {
      console.log("server is not started");
    } else {
      console.log("server is started");
    }
  });
});
