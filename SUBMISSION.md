# TODO

- [x] Create a component for each vehicle in the list
- [x] Add new filters to the search page
- [x] Add reset button to clear filters

### Vehicle details component

I've created a component to display the details of each vehicle in the list. This component is used in the search page to display the vehicle thumbnail, make and model, hourly price, maximum passenger capacity, and a call-to-action button. I've also added a placeholder image for vehicles that don't have a thumbnail. Took care of responsiveness and reusability of that component.

### Additional filters

I've added the following filters to the search page:

- Hourly price range
- Minimum passenger count
- Vehicle class
- Vehicle make

As I could see in the API, the `vehicles.search` procedure had no filter for a max passenger count. Having in mind other applications I've seen and/or I've worked for, that's not quise usual to have a filter for a max passenger count. So I've decided to keep just the minimum passenger count filter instead implementing a new one, which would take more time and effort given the current data structure.

I kept the actual filters behaviour, which is kinda dynamic filter with no "apply filters" button.

I've also added a reset button to clear all filters.
