App consists of 4 services ->

1. eureka service
2. account service
3. customer service
4. api gateway service

NOTE: Api details can be found on attached POSTMAN collection.


1. Eureka Service
--------------------

An spring boot app which utilizes netflix eureka dependency in order to register different microservices. It handles all the instances of different services. 

It is also responsible for exposing details of all microservices
to each other.

It requires JAVA to be installed.

Steps to run
------------

a. Open project in eclipse and run it as java application.
b. Visit http://localhost:8761/ to see all the registered service.
   Don't forget to refresh the page after customer service and account service has started.




2. Account service
-------------------

An node js app build with express js and sequelize. It utilizes
sqlite as database. This service is mostly responsible for 
crud operations of accounts.

When the service starts, it automatically connect with eureka server.

It exposed 4 apis -

a. add money
b. deduct money
c. account details
d. delete account


Steps to run
------------
a. cd account-service

b. Install dependencies
   npm  i

c. Run migration
   npm run migrate   

d. Start Server
   npm run start 




3. Customer service
-------------------

An node js app build with express js and sequelize. It utilizes
sqlite as database. This service is mostly responsible for 
crud operations of customers.

When customer is created or deleted, it fetches the account service URL from eureka server and handles things accordingly.

When the service starts, it automatically connect with eureka server.

It exposed 5 apis -

a. create customer (it creates an account for customer, with initial balance 0.0)
b. update customer
c. customer details
d. customer list
e. delete customer (it also deletes associated account)


Steps to run
------------
a. cd customer-service

b. Install dependencies
   npm  i

c. Run migration
   npm run migrate   

d. Start Server
   npm run start 




4. Api gateway service
----------------------

An node js app which takes advantage of http-proxy-middleware and 
express to act as api gateway. It fetches the URL of account service and customer service from Eureka Service and redirects
the request accordingly.

It runs on PORT 3000.

It requires NODE JS to be installed.

Steps to run
------------
a. cd api-gateway

b. Install dependencies
   npm  i

c. Start Server
   npm run start   



