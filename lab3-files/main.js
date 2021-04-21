const url =
  "http://twitterfeedserverrails-env.eba-xmqy8ybh.us-east-1.elasticbeanstalk.com/feed/random?q=weather";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    // do something with data
  })
  .catch((err) => {
    // error catching
    console.log(err);
  });
