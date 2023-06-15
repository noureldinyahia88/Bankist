# Bank Account Management System
This code provides a basic bank account management system implemented in JavaScript. It allows users to log in, view their account details,
perform transactions such as transfers and loan requests, and close their accounts. (https://noureldinyahia88.github.io/Bankist/)

##Features

User authentication: Users can log in using their account username and PIN.
Account overview: After logging in, users can view their account details, including their current balance and transaction history.
Sorting transactions: Users can sort their transaction history in ascending or descending order.
Transfer funds: Users can transfer funds to other accounts by specifying the recipient's username and the transfer amount.
Request a loan: Users can request a loan by entering the desired loan amount. The loan is granted if the user has sufficient transaction history with deposits greater than or equal to 10% of the loan amount.
Close account: Users can close their accounts by entering their username and PIN.


##Getting Started

To use the bank account management system, follow these steps:

Open the HTML file that contains the code in a web browser.
The system will display a login form.
Enter the username and PIN for one of the predefined accounts provided in the code. (username: js, password:1111) or (username:jd, pass:2222)
Upon successful login, the system will display the user's account details, including transaction history and balance.
Use the provided buttons and input fields to perform transactions, such as transfers and loan requests.
To log out, wait for the automatic logout timer to expire (2 minutes) or close the browser window.

## Code Structure

The code is divided into several sections:

Account objects: The predefined account objects are stored in variables account1 and account2. Each account object contains information such as the account owner's name, transaction history, PIN, currency, and locale.
DOM elements: The code uses variables to store references to various DOM elements used for displaying and interacting with the user interface.
Helper functions: The code includes helper functions for formatting dates, formatting currency, and updating various UI elements.
Event listeners: Event listeners are set up to handle user interactions such as login, transfers, loans, and closing the account.
Usernames generation: The code includes a function to generate usernames for the predefined account objects.
Initialization: The code sets up the initial state of the UI, including displaying the login form and configuring the logout timer.

##Technologies Used
HTML CSS JS
