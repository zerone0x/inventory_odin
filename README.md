## DB

- route
- db
  - scheme
    - item
      - name
      - description
      - category
      - price
      - number in stock
      - url

# QA and conclusion

## preinstall

- express generator to create folder
- npm install nodemon, mongoose, dotenv, body-parser
-  "devStart": "nodemon server.js"
-  

## write route and pug for each one


- write create form

## connect to suitable db

- need to configure the db name with client
  - const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("inventory")


## write the scheme

写完 完全就是doc模式

## 调用schema来create new

