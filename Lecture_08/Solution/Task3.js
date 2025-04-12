let user = {
  username: "skywalker",
  hobbies: ["coding", "gaming", "reading"]
};

// Add "traveling" to hobbies
user.hobbies.push("traveling");

// Convert hobbies to uppercase
user.hobbies[0] = user.hobbies[0].toUpperCase(); 
user.hobbies[1] = user.hobbies[1].toUpperCase(); 
user.hobbies[2] = user.hobbies[2].toUpperCase(); 
user.hobbies[3] = user.hobbies[3].toUpperCase(); 

// Create the summary
let summary = `${user.username.toUpperCase()} enjoys ${user.hobbies.join(", ")}.`;
console.log(summary);