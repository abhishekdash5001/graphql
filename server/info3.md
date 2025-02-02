gql provide scaler types as a simple value /single value
int
float
String
Boolean
ID  --- non readeable
in gql null means not available

in gql all feilds are nullable by default it means if resolver not retruing any thing then gql client we see null values {id:null}

to make a filed mandaory use !
this ! doesnot work if i use readFileSync to read scehama.gql but works if use readFile asyncronus ly

NOTE
just bcz a field is non nullable doesnot mean client must request it only means resolver should have it


NOtE
but still in resolver we can pass null it will prevent this we have to add ! on mainQuerytype