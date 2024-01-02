# web-shop

```mermaid
graph TD;
    NonLoggedIn[Non-Logged-In User] -->|Register as a new user| NewUserAccount(CustomerCreation);
    NewUserAccount -->|User account is created| Customer;
    
    Customer -->|See products available| Inventory;
    Inventory -->|View product details| ProductDetails;
    Customer -->|Purchase products| Purchase;
    Customer -->|See their orders| Orders;
    
    Admin[Admin User] -->|Get list of Customer accounts| CustomerAccounts;
    Admin -->|Modify Customer accounts| ModifyCustomers;
    Admin -->|Remove Customer accounts| RemoveCustomers;
    Admin -->|Add other Admins| AddAdmins;
    Admin -->|Add products to inventory| AddProducts;
    Admin -->|Remove products from inventory| RemoveProducts;
    Admin -->|Modify all products| ModifyProducts;
    Admin -->|Get list of all orders| AllOrders;
    Admin -->|View order details| OrderDetails;
```