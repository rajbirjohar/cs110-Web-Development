// TODO:
// Date ordering

// global vars
let togAutoF = true;
var uniqueTweets = new Set();
var sortedTweets = {};
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const searchBar = document.getElementById("search-bar");
const loading = document.getElementById("intro-text");

const url =
  "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather";

// pause/play loading JSON data

function toggleFetch() {
  togAutoF = !togAutoF;
  console.log(togAutoF);
  if (!togAutoF) {
    button2.innerHTML = "Resume Tweets";
  } else {
    button2.innerHTML = "Pause Tweets";
  }
}

// Start loading JSON data

function loadJSON() {
  loading.innerHTML = "Loading...";
  button1.classList.add("disabled");
  const interval = setInterval(function () {
    if (togAutoF) {
      fetch(url)
        // returns json response
        .then(function (response) {
          return response.json();
        })
        // returns data of the json
        .then(function (data) {
          let html = "";
          // remove dupes
          data.statuses.forEach(function (tweet) {
            uniqueTweets.add(tweet);
          });
          // sorting tweets by date
          // uniqueTweets.statuses.forEach(function (tweet) {
          //   tempEntry = {tweet : tweet.created_at}
          // });
          // adding tweets
          uniqueTweets.forEach(function (tweet) {
            html += `
            <div class="tweet">
              <object data="${tweet.user.profile_image_url}" type="image/png" class="profile-picture">
                <img
                  src="images/ratatouille.jpg"
                  alt="Profile Picture"
                  class="profile-picture"
                />
              </object>
              <div>
                <p><strong>${tweet.user.screen_name} </strong><span>${tweet.created_at}</span></p>
                <caption>
                ${tweet.text}
                </caption>
              </div>
            </div>
            `;
          });

          document.getElementById("tweets").innerHTML = html;
        });
    }
  }, 5000);
}

// Search bar functionality. Case insensitive.

function searchTweets() {
  let input = searchBar.value;
  input = input.toLowerCase();
  let result = document.getElementsByClassName("tweet");
  for (i = 0; i < result.length; i++) {
    if (!result[i].innerHTML.toLowerCase().includes(input)) {
      result[i].style.display = "none";
    } else {
      result[i].style.display = "flex";
    }
  }
}

// fetch template
fetch(url)
  .then((res) => res.json())
  // do something with data
  .catch((err) => {
    // error catching
    console.log(err);
  });
