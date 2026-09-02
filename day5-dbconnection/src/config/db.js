//CONNECT KRENGE MONGOOSE S TAAKI NODEJS S DB TAK DATA TRAVEL HO SAKE!!!

const { default: mongoose } = require("mongoose");

//mongoose db k liye promise return krta h
const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://riyasingh7542com_db_user:riya7542@cluster0.z5tajbd.mongodb.net/",
    );
  } catch (error) {
    console.log("error while connecting db", error);
  }

  console.log("mongoDB connected");
};

module.exports = connectDb;
