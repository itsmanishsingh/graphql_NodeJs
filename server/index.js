const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4')
const bodyParser = require('body-parser')
const cors = require('cors')
const { default : axios } = require('axios');

async function startServer(){
    const app  = express();
    const server = new ApolloServer({
        typeDefs:`
            type User {
                id:Id!
                name: String!
                username:String!
                email:String!
                phone : String!
                website:String
            }
            type Todo {
                id : ID!
                title : String!
                conpleted : Boolean
                userId : ID
            }
            type Query {
                getTodos : [Todo]
                getAllUser : [User]
                getUser(id:ID!):User
            }
        `,
        resolvers : {
            Query : {
                getTodos :async () => 
                (await axios.get('https://jsonplaceholder.typicode.com/todos/')).data,
                getAllUser:async () =>
                (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
                getUser:async (parent , { id }) =>
                (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,

            },
        }
    });

    app.use(bodyParser.json());
    app.use(cors())
    await server.start()

    app.use("/graphql",expressMiddleware(server));
    
    app.listen(8000, () => console.log(`Server started at PORT 8000`))
}

startServer();