Welcome to my EComm API. It is set up as an online store for customers to
view a product catalog and make purchases. The backend folder holds the virtual 
environment and the server.py file, which is what makes the back end of the 
application work.  

The NavBar.jsx creates the navigation bar at the top of the page which helps
make navigating the website user friendly. Homepage.jsx simply takes the user 
to the home page. New customers are added via the NewCustomer.jsx file and 
Customers.jsx allows one to view all existing customers and their info. 
Customers can also be delete from the application on this page. 

NewProducts.jsx allows one to add a new product to the catalog which can then be
ordered by a user. The entire catalog with the name, product ID, and details of 
each individual product is found in Products.jsx. Products can be deleted from 
the catalog on this page. 

NewOrders.jsx allows a user to place a new order by entering their customerID, 
the product ID of what they wish to purchase, and the date they are ordering the
product. Finally, the Orders.jsx page is where one would go to view all existing
orders along with the order ID, customer ID, and product ID associated with each
order. One can cancel an order on this page by clicking the Cancel Order button 
to delete the order from the application.

Product ID's are used to place orders as 
many products can be similar in name and/or details. The product ID 
distinguishes each individual product in order to maximize order accuracy. The 
App.jsx puts everything together to create what is viewed on the web page.
