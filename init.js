const mongoose=require("mongoose");
const Chat=require("./models/chat.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main().then(()=>{
    console.log("connection succesful")
}).catch((err)=>{
    console/log(err)
})

// Demo data to store in mongoDB when required

let allChats=([
    {
        from:"shivom",
        to:"NewGuy",
        msg:"Hello brooo",
        createdAt: new Date()
    },
    {
    from:"shivom",
    to:"NewGuy",
    msg:"Hello brooo whatsapppp",
    createdAt: new Date()
    },
    {
    from:"new",
    to:"cat",
    msg:"Hello ",
    createdAt: new Date()
    },{
    from:"shivom",
    to:"lalala",
    msg:"kkrh",
    createdAt: new Date()
    },{
    from:"noname",
    to:"abyss",
    msg:"nice",
    createdAt: new Date()
    }
]);

Chat.insertMany(allChats);