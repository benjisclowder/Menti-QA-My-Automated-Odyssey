// Example basic JSON (object/collection of key-value pairs)
const basicJson = {
    "name": "Alice", // key-value pair (string)
    "age": 30, // key-value pair (number)
    "isMember": true, // key-value pair (boolean)
    "favorites": ["reading", "hiking", "coding"] // key-value pair (array with strings) //Nested structure (array inside object)
};

// Example nested JSON
// Use const to declare JSON objects and arrays that won't be reassigned to different values
const nestedJson = {
    "user": { // object
        "name": "Bob",
        "age": 25,
        "isMember": false
    }
};

// Example nested structure
const complexJson = {
    "user": { // object
      "id": 123,
      "profile": { // object
        "name": "Alice",
        "contacts": { // object
          "email": "alice@example.com",
          "phone": "1234567890"
        }
      }
    },
    "roles": ["admin", "editor"] // array
};

// Example array of JSON objects
const usersArray = [
    {
        "name": "Charlie",
        "age": 35,
        "isMember": true
    },
    {
        "name": "Diana",
        "age": 28,
        "isMember": false
    }
];

// Example JSON with nested arrays
const userWithFavorites = {
    "user": {
        "name": "Eve",
        "age": 32,
        "isMember": true,
        "favorites": ["reading", "hiking", "coding", "traveling"]
    }
};

// Example JSON with nested arrays and objects
const userWithAddresses = {
    "user": {
        "name": "Eve",
        "age": 32,
        "isMember": true,
        "favorites": ["reading", "hiking", "coding", "traveling"],
        "addresses": [
            {
                "street": "123 Main St",
                "city": "Anytown",
                "state": "CA",
                "zip": "12345"
            },
            {
                "street": "456 Elm St",
                "city": "Othertown",
                "state": "NY",
                "zip": "67890"
            }
        ]
    }
};

// Example of const usage
const fruits = ["apple", "banana", "cherry"]; // variable=fruits
console.log(fruits[0]); // Outputs: apple

//Example of let usage
let counter = 0;
counter = counter + 1; // This is allowed with let

for (let i = 0; i < 5; i++) { // Common use in loops
    console.log(i);
}

// Avoid using var, use let or const instead
var x = 10; // Avoid using var, use let or const instead
let y = 20; // Use let for variables that will be reassigned
const z = 30; // Use const for variables that won't be reassigned
