const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const {ApolloServer,gql}=require('apollo-server-express')
const typeDefs=require('./schema')
const resolvers=require('./resolvers')
const userApiFromRouter=require('./routes/userRoutes');
const port=3001
const app=express()
app.use(express.json())
app.use(cors())
//const userApiFromRouter=require('./routes/userRoutes');
const mongoURI = 'mongodb+srv://yeluriharshavardhini:1tNglC1nDyZExwLF@cluster0.i2agfrz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
mongoose.connect(mongoURI,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log('Mongodb connected')).catch(err=>console.log(err));
const server=new ApolloServer({typeDefs,resolvers});

async function StartServer(){
    await server.start();
    server.applyMiddleware({app});
    app.use('/users',userApiFromRouter)
    app.listen(port,()=>{console.log("server is live")})

}
function TESTING(){
    return 0;
}
TESTING()
StartServer();