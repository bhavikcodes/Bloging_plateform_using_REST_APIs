const express = require("express");
const app = express();                
const port = 3000;
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
const { v4: uuidv4 } = require('uuid');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

let array = [
    {
        id : uuidv4(),
        username : "Rahul_Kumar0202",
        content : " The Avengers are a team of superheroes appearing in American comic books published by Marvel Comics, created by writer-editor Stan Lee and artist/co-plotter Jack Kirby. The team made its debut in The Avengers #1 (cover-dated September 1963). Labeled Earth's Mightiest Heroes, the original Avengers consisted of Iron Man, Ant-Man, Hulk, Thor, and Wasp. Captain America was discovered trapped in ice in issue #4, and joined the group after they revived him. . "
    },
    {
        id : uuidv4(),
        username : "Harsh_Sharma3352",
        content : "The Avengers are an all-star ensemble cast of established superhero characters from the Marvel Comics portfolio. Diegetically, these superheroes usually operate independently but occasionally assemble as a team to tackle especially formidable villains. This in contrast to certain other superhero teams such as the X-Men, whose characters were created specifically to be part of their team, with the team being central to their identity.  "
    },
    {
        id : uuidv4(),
        username : "Saksham_Jain_0110",
        content : "The Avengers were created to create a new line of books to sell and to cross-promote Marvel Comics characters. An Iron Man fan might buy an Avengers book because Iron Man appears in them, and perhaps in turn take an interest in Thor, who appears in the same book as Iron Man's friend and comrade."
    }
]

app.get("/blogs",(req,res)=>{
    res.render("blogMain.ejs",{array});
})
app.get("/blogs/new",(req,res)=>{
    res.render("newForm.ejs");
})
app.post("/blogs",(req,res)=>{
    let id = uuidv4();
    let {username,content} = req.body;
    array.push({id,username,content});
    res.redirect("/blogs");
})
app.get("/blogs/:id",(req,res)=>{
    let {id} = req.params;
    let post = array.find((p)=>id===p.id);
    res.render("more.ejs",{post});
})
app.get("/blogs/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = array.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})
app.patch("/blogs/:id",(req,res)=>{
    let {id} = req.params;
    let newC = req.body.content;
    let post = array.find((p)=>id===p.id);
    post.content = newC;
    res.redirect("/blogs");
})
app.delete("/blogs/:id",(req,res)=>{
    let {id} = req.params;
    array = array.filter((p)=>id!==p.id);
})

app.listen(port,()=>{
    console.log("request listened at port",port);
})