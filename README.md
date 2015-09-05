## Demo
http://goliney.github.io/user-list-test-app/


##Technologies

1.	AngularJS
2.	Bootstrap

##Goal

Create SPA with grid contains list of the users.

##Description

1. Show table on the page with two kinds of pagination: infinity scroll and classic pagination with ability to configure.  
2. Create ability to sort and filter data.
3. Create ability to edit item in two way: in modal window and in place.
4. Create ability to delete items (single or multiple).
5. Use spinner for first page load.
6. Use two kinds of filters: filter by string fields on fly when typing in text box, filter by age range in select with whatever options (for example 10-20, 20-30, 30-40, 40+) 

Data should be hardcoded (don’t use backend and AJAX for this) or use json file as backend.

Don’t use any third-party components like ng-grid, except Angular Bootstrap UI 

There is list item format
```
User {
    Id: int
    FirstName: string
    LastName: string
    Email: string
    Age: int
}
```

##Installation
```
npm install
bower install
grunt
```

##Development
```
grunt watch
```

##Used sources
https://github.com/goliney/angular-boilerplate
