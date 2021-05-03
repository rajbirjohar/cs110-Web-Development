// TODO:
// Fix profile picture not displaying correctly
// Search bar
// Remove duplicates

// global vars
let togAutoF = true;
var uniqueTweets = new Set();
var sortedTweets = {};

const url =
  "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather";

// fetch template
fetch(url)
  .then((res) => res.json())
  // do something with data
  .catch((err) => {
    // error catching
    console.log(err);
  });

// button to fetch data
document.getElementById("button1").addEventListener("click", loadJSON);
// button to pause fetching
document.getElementById("button2").addEventListener("click", toggleFetch);


// Start loading JSON data
function loadJSON() {
  
    const interval = setInterval(function () {
      if(togAutoF){
        fetch(url)
        // returns json response
        // somehow already knows how to pull 10 tweets
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

// pause/play loading JSON data

function toggleFetch() {

  togAutoF = !togAutoF;
  console.log(togAutoF);
}