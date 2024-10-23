const mongoose = require("mongoose");
const ConnectDB = async() => {
try{
    const conn = await mongoose.connect(process.env.Mongo_URI, {});
    console.log(`MongoDB Connected : ${conn.connection.host}`)
}catch(error) {
    console.log("Connection Error", error);
    process.exit();
}
}
module.exports = {ConnectDB}

// const mongoose = require("mongoose");
// const ConnectDB = async() => {
//     try{
//         const conn = mongoose.connect(process.env.MONGO_URI,{});
//     console.log(`MongoDB Connected : ${conn.connection.host}`)
//     }catch(error) {
//         console.log(error);
//         process.exit();
//     }
// }
// module.exports = {ConnectDB};