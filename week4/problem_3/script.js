fetch("https://api.github.com/users")
  .then((response) => response.json())
  .then((data) => {
    let image = data.map((img) => img.avatar_url);
    console.log(image);
  });

function find_user() {
  let input = document.querySelector("input").value;
  console.log(input);
  fetch("https://api.github.com/users/" + input)
    .then((response) => response.json())
    .then((data) => {
      var a = data.avatar_url;
      console.log(a);
      // Setting the image to be the fetched data avatar
      document.getElementById("pfp").src = data.avatar_url;
      // Set the name div to be the fetched users name
      document.getElementById("name").innerHTML = "Name : " + data.name;
      // Set the username div to be the fetched username
      document.getElementById("uname").innerHTML = "Username : " + data.login;
      // Set the rest of the content...
      document.getElementById("email").innerHTML = "Email : " + data.email;
      document.getElementById("location").innerHTML = data.html_url;
      document.getElementById("location").href = data.html_url;
      document.getElementById("No-gist").innerHTML =
        "No. of Gists : " + data.public_gists;
    });

  fetch("https://api.github.com/users/" + input + "/repos")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // console.log(data.name);
      let name_desc = data.map((repo) => {
        return {
          name: repo.name,
          description: repo.description,
        };
      });

      // console.log(name_desc);
      // document.getElementById("repo-name").innerHTML = name_desc[0].name;
      //  document.getElementById("repo-desc").innerHTML = name_desc[0].description;
      // Get the rep-container element
      let repContainer = document.querySelector(".repo-content");

      // Clear the content for a new search
      repContainer.innerHTML = "";

      for (let index = 0; index < name_desc.length; index++) {
        let holder = document.createElement("div");
        holder.classList.add("rep-container");
        let repoName = document.createElement("div");
        let repoDesc = document.createElement("div");

        repoName.innerHTML = "Name: " + name_desc[index].name;
        repoDesc.innerHTML = "Description: " + name_desc[index].description;

        // Append the name and description elements to the repository container
        holder.appendChild(repoName);
        holder.appendChild(repoDesc);
        repContainer.appendChild(holder);

        if (name_desc.length >= 5) {
          repContainer.style.overflowY = "auto";
        } else {
          repContainer.style.overflowY = "hidden";
        }
      }
    });
}
