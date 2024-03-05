# Project Name: Meyer Distributing Challenge

## Overview
This project is a 24 take home challenge. Essentially, it is a web application that displays beauty products from the "Maybelline" brand using the Makeup API. This app allows users to filter and sort products based on various criteria, such as price range, product type, rating, color, and sorting options.
## Challenge Instructions
### Level 1 
- Using the JSON object data, display the list of products in a grid-type pattern similar to Amazon's or BestBuy's product listing pages.
  - Include for each product:
    - Name of the product
    - Price
    - Star rating
    - Image
  - Implement a "View More" button for each product that opens a modal.
- The modal should include:
  - Image
  - Name of the Product
  - Description
  - Star rating
  - Price
  - Buttons to product pages
  - Listing of product colors (if available)

### Level 2 
- Add checkboxes for filtering. When clicked, the list of products will filter based on the checkbox value.
  - Filter options include (all required):
    - Price (give range options)
    - Product type
    - Rating
    - Product colors
  - Show links that display what filters have been selected, and when clicked, will remove the filter.
- Add sorting – a drop-down with different options for sorting. Feel free to choose any sorting options you would like.

### Level 3 
- Add pagination.
  - Make sure pagination works along with the filters.
  - Provide a drop-down that changes the number of items to show per page.
## Getting Started
1. Clone the repository to your local machine:
   ```bash
   git clone [repository_url]
2. Navigate to the project directory:
   ```bash
    cd [project_directory]

3. Open `index.html` in your preferred web browswer to launch the app


## Usage
- Use the filters on the left side of the page to refine the product list based on your preferences.
- Adjust the "Items per page" dropdown to control the number of products displayed on each page.
- Click the "Apply Filters" button to update the product list according to the selected filters.
- Click the "View More" button on each product card to see detailed information in a modal.



