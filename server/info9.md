graphql-request is very light weght but it doesnot provide caching if we go  back to home page apiwill be fired again
caching is the main benift of apppllo client

Appolo client stores cahcing value appollo client devtool
caccehd data has refernce of other data if requested by the clinet this prevents duplicaiton of data

so if go to home page and select some new job root_query will be the same but a new reefece of new job will added that refer to some other job in the cache

in cache keys are generated based on typename :ID 
in root qwuey we have properties with query name

const results =  await  apolloClient.query({query})

what this means
const results =  await  apolloClient.query({
    query,
    fetch-policy:"cahce-first"// if not in cache then call the server
    //network-only   fresh fresh data
    })

//fragments
so now if create job api is writing cache for getJob and setting the value in cache and stopping the call for this we have to copy paste query of getjob in create job better way fragments