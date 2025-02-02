so now we qierying company with id parameters if i pass right id i will the company
 but if i pass wrong id i will get

type Query{
    jobs:[Job!]
    job(id:ID!):Job
    company(id:ID!):Company
}
 but it will be success but we want to show error we can use !

 type Query{
    jobs:[Job!]
    job(id:ID!):Job
    company(id:ID!):Company!
}

by doing this it will return error but it will be internal server error not that company not found  and if job query is passing correct id and comapny is passing wrong id  by this approach api will fail but gql says it should pass
