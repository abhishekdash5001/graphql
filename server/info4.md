defining custom scalar type like DAte but not all gql implementaion can be applied

so ig you want ur api to be used by any client best to stick with defualt scalar type


So now in db we have createdAT but in schema we have date it will show error
we can change our query to have created AT or we can  wrtie  a resolver function for that field

if data has [{
    titile:"SSE"
}]

in rsolver i have 

  job:{
    title:(job)=>"System"
  }

  repsonse me hamesha {
    title :"system"
  }


  gql supports recursive query 