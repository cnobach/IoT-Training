# IoT-Training
  - IoT Training repository
  - Link to current Sprint board : https://tree.taiga.io/project/clnobs-iot-training/taskboard/sprint-1-66

## Feature List
  - Sign up for account
    - Account holds information such as billing, shipping, personal info, etc.

  - Login/Logout functionality

  - Able to view Cart
     - Can add/remove items from cart
     - Price auto updates

  - Checkout screen reviews items and displays price

  - User can pay and see estimated delivery date

  - Item search
    - Search based on name
    - Category
    - Order based on Price

  - Home page
    - Shows rotating images w/ descriptions of items
    - shows recently added items
    - visible & easily accessable links to search, cart, etc

  - Profile
    - Allows user to view & change their profile information
    - Can deactivate/delete their account along w/ all information
    - Can change and update password

## User Stories
  - **US1**: As a User, I want to Sign up for an account so that I can easily store my information and view my cart/past purchases.
    - **Subtask:** Create DB to store user info
    - **Subtask:** Add an endpoint for user to fill out signup form
    - **Subtask:** Create form for user to fill with all required data
    - **Subtask:** Create form validation so that all fields are filled
    - **Subtask:** Store all protected info securely (hashed, salt, etc)
    - **Subtask:** Store all user data and allow user to login using this data


  - **US2**: As a User, I want to be able to sign into my account securely.  
    - **Subtask:** Add endpoint for a form to allow user to input data for login
    - **Subtask:** Add form for user to input info
    - **Subtask:** Call DB to check username/password combo
    - **Subtask:** Route users to home if valid & set a JWT 
      - **Subtask:** Check JWT with each action, Log user out if not valid at any point. 10 minute timeout


  - **US3**: As a user, I want to be able to log out of my account.
    - **Subtask:** Add Logout link
    - **Subtask:** Add confirmation message
    - **Subtask:** Sign user out, and reset all cookies/JWT's to default/null values. 
    - **Subtask:** Redirect to home


  - **US4**: As a User, I want to be able to view and edit my cart of items that I've selected.
    - **Subtask:** Add Cart Endpoint
    - **Subtask:** Add cart link to page
    - **Subtask:** Allows user to review all items w/ name, base description, and price
    - **Subtask:** Clicking on item brings to item page
    - **Subtask:** Can remove items from cart
    - **Subtask:** Can edit quanitity of items placed in cart
    - **Subtask:** Has a link to checkout, or return


  - **US5**: As a User, I want to be able to submit my payment and order, and have an estimated delivery date so that I can know when my items will arrive. 
    - **Subtask:** Upon pressing checkout from cart, route user to payment page
    - **Subtask:** Upon completing payment form, 'submit' order
    - **Subtask:** Estimate delivery date based on user address
    - **Subtask:** Display confirmation page w/ receipt


  - **US6**: As a User, I want to be able to search for items based on multiple things so that I can find what I'm looking for.
    - **Subtask:** Item page route 
    - **Subtask:** Add to home/link to seperate catalogue page
    - **Subtask:** User can search based on name, category, field, etc.
    - **Subtask:** List can dynamically update or statically update - TBD based on structure
    - **Subtask:** Paginate items based on how many appear
    - **Subtask:** Clicking on an item brings to item page 


  - **US7**: As a User, I want to sort items based on price so that I can find the best deal. 
     - **Subtask:** User can sort based on price range
     - **Subtask:** User can sort from high to low or low to high


  - **US8**: As a User, I want to be able to quickly and easily find all of the newer items added to the website so that I can easily see all new things to the store.
    - **Subtask:** Home page can have rotating carousel in order to find newest items
    - **Subtask:** Add DB attribute to store date created/update (item) to sort based on
    - **Subtask:** Auto scroll & arrow navigation 


  - **US9**: As a User, I want to be able to view and update my personal information in case I need to change my information.
    - **Subtask:** Add Profile endpoint
    - **Subtask:** Display profile icon/link on navbar
    - **Subtask:** Allows user to see information
    - **Subtask:** Upon clicking edit button, they can change any info
    - **Subtask:** Can cancel or submit changes, to which its sent to DB


  - **US10**: As a User, I want to be able to change my password in case I'm worried about my account being compromised. 
    - **Subtask:** On profile page, button visible to change password
    - **Subtask:** User has to get past password correct, then type new password and confirm it
    - **Subtask:** On submission, logs user out and routes to login w/ new pass


  - **US11**: As a User, I want to be able to delete my account if I no longer find I need to user the service any longer. 
    - **Subtask:** On profile page, display button for user to delete account if they wish
    - **Subtask:** Display confirmation on click
    - **Subtask:** If accepted, removes all their info from the DB and displays confirmation message
    - **Subtask:** Then routes user to Home page
    
