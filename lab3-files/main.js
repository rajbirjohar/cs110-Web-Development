// global vars
let togAutoF = true;
var uniqueTweets = new Set();
var sortedTweets = {};
var date;
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const searchBar = document.getElementById("search-bar");
const loading = document.getElementById("intro-text");

const url =
  "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather";


/**
 * Returns value of togAutoF
 * @param {boolean} togAutoF
 * @param {innerHTML} button2
 * @returns {boolean} toggles play/pause of getting JSON data
 */
function toggleFetch() {
  // pause/play loading JSON data
  togAutoF = !togAutoF;
  console.log(togAutoF);
  if (!togAutoF) {
    button2.innerHTML = "Resume Tweets";
  } else {
    button2.innerHTML = "Pause Tweets";
  }
}

/**
 * Returns html string 
 * @param {innerHTML} Loading
 * @param {classList} button1
 * @param {boolean} togAutoF
 * @param {JSON} data
 * @param {set} uniqueTweets
 * @param {dictionary} sortedTweets
 * @returns {string} returns html string to be displayed
 */
function loadJSON() {
  loading.innerHTML = "Loading...";
  button1.classList.add("disabled");
  // Start loading JSON data
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
            if (!uniqueTweets.has(tweet)) {
              uniqueTweets.add(tweet);
            }
          });
          // sorting tweets by date
          sortedTweets = Array.from(uniqueTweets).sort(function(a, b) {
              return (a.created_at < b.created_at) ? 1 : ((a.created_at > b.created_at) ? -1 : 0);
          });
          console.log(sortedTweets);
          // adding tweets
          sortedTweets.forEach(function (tweet) {
            date = new Date(tweet.created_at).toString().slice(0, 24);
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
                <p><strong>${tweet.user.screen_name} </strong><span>${date}</span></p>
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


/**
 * Returns array of tweets named result
 * @param {string} searchBar.value
 * @param {innerHTML} document.getElementsByClassName("tweet")
 * @return {array} displays tweets that match case insensitively with input values
 */
function searchTweets() {
  let input = searchBar.value;
  input = input.toLowerCase();
  let result = document.getElementsByClassName("tweet");
  // Search bar functionality. 
  for (i = 0; i < result.length; i++) {
    if (!result[i].innerHTML.toLowerCase().includes(input)) {
      result[i].style.display = "none";
    } else {
      result[i].style.display = "flex";
    }
  }
}

// provided fetch template
fetch(url)
  .then((res) => res.json())
  // do something with data
  .catch((err) => {
    // error catching
    console.log(err);
  });
