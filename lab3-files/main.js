const url =
  "http://twitterfeedserverrails-env.eba-xmqy8ybh.us-east-1.elasticbeanstalk.com/feed/random?q=weather";

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

function loadJSON() {
  fetch(url)
    // returns json response
    // somehow already knows how to pull 10 tweets
    .then(function (response) {
      return response.json();
    })
    // returns data of the json
    .then(function (data) {
      let html = "";
      data.statuses.forEach(function (tweet) {
        html += `
            <div class="tweet">
          <img
            src=${tweet.user.profile_image_url_https}"
            alt="Profile Picture"
            class="profile-picture"
          />
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
