const express = require('express')
const router = express.Router()
const typeDefs = require('../schema');
const resolvers = require('../resolvers');
const User=require('../routes/userRoutes')
const { ApolloServer,gql } = require('apollo-server-express');
//:3001/users/register
const server = new ApolloServer({typeDefs,resolvers});
router.post('/register',async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        const {data,error}= await server.executeOperation({
            query:gql`mutation{
                createUser(input:{name:"${name}",email:"${email}",password:"${password}"}){
                  id
                  email 
                  name
                  password
                }
              }`
        });
        if(error){return res.status(500).send({message:error}) }
        res.status(201).send({message:data});
    }catch(err){
        res.status(500).send({message:err});
    }
})
router.post('/login', async (req, res) => { 
    const { email, password } = req.body; 
    try { 
    const { data, errors } = await server.executeOperation({ 
                query: 
    gql`query { getUser(email: "${email}"){ id name password } }` 
}); 
    // Handle GraphQL query errors 
    if (errors) { 
    console.error(errors); 
    return res.status(500).send(errors); 
            } 
    const user = data.getUser; 
    if (!user || user.password!=password) { 
    return res.status(401).send({ message: 'Invalid credentials' }); 
            } 
    res.status(200).json({ message: 'Login successful', user }); 
} 
catch (err) { 
console.error('Error in login:', err); 
res.status(500).json({ message: 'Internal server error' }); 
    } 
}); 
    
module.exports = router