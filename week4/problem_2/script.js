function list_post_6_word_plus() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      const filteredPosts = data.filter(
        (post) => post.title.split(" ").length > 6
      );
      console.log(filteredPosts);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Call the function to fetch and filter the data
list_post_6_word_plus();

function wordFrequencyMap() {
  return fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      // Concatenate all body texts into one string and convert to lowercase
      const bodyText = data.map((post) => post.body).join(" ").toLowerCase();

      // Split the text into an array of words
      const words = bodyText.match(/\b\w+\b/g);

      // Create a word frequency map using reduce
      // Reduce the words array to hold a word and its count
      const wordFrequency = words.reduce((wordCount, word) => {
        // Use an object spread to create a new object with updated word counts
        // ...wordCount creates a copy of wordCount so we dont modify the original
        // if wordCount[word] check if there is a property in wordCount with the
        // specified name variable word if it is it returns it or else it returns
        // undefined. 
        // We do a check if wordcount[word] is undefined we set it to 0
        // Then if the word is present we increment by 1 to count each word
        return { ...wordCount, [word]: (wordCount[word] || 0) + 1 };
      }, {});
      return wordFrequency;
    });
}

// Call the function and log the result
wordFrequencyMap()
  .then((frequencyMap) => {
    console.log(frequencyMap);
  })
  .catch((error) => {
    console.error("Error:", error);
  });