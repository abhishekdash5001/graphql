its good to add auth to all oour request we do it by passing second args in
const client = new GraphQLClient('http://localhost:9000/graphql',{
    headers:()=>{

    }
});

this can be object but set it function so that it will be call on every request other it will set on the first time when our server start