yarn init-y
yarn add express
yarn add @apollo/server graphql         // This is the framework for the graphql

# 
- Query for fetching the data 
- Mutation for pushing

# Two must fields
-   Here the typeDefs is like schema 
-   Resolver helps in getting the query 




        typeDefs:`
            type Todo {
                id : ID!
                title : String!
                conpleted : Boolean
            }
            type Query {
                getTodos : [Todo]
            }
        `,
        resolvers : {
            Query : {
                getTodos :async () => (await axios.get('https://jsonplaceholder.typicode.com/todos/')).data,
            },
        }

# For json API
    - https://jsonplaceholder.typicode.com/todos/
