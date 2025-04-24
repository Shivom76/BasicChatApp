const express=require("express");
const path=require("path");
const methodOverride=require("method-override");
const mongoose=require("mongoose");
const Chat=require("./models/chat.js");

const app=express();

const port=9090;

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main().then(()=>{
    console.log("connection succesful")
}).catch((err)=>{
    console/log(err)
})


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.listen(port,()=>{
    console.log("9090 is listening")
})

//HOME route
app.get("/",(req,res)=>{
    res.send("<h2>This is the roooot page of the server!!</h2>")
})

//Chats route
app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();
    //console.log(chats);
    res.render("index.ejs",{chats});
})

//NEW route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

//CREATE route
app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        createdAt:new Date()
    })
    
    newChat.save().then(()=>{
        console.log("chat was saved");
    }).catch((err)=>{
        console.log(err);
    })

    res.redirect("/chats");
})

// EDIT get route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
    console.log(id);
})

// UPDATE route
app.patch("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg:newMsg}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true, new:true})
    console.log(newMsg);
    res.redirect("/chats");
})

//DELETE route
app.get("/chats/:id/delete",async (req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("delete.ejs",{chat});
})

// Delete route
app.delete("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let deletedChat=await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats")
})