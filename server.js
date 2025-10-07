var express = require("express");
var app = express();
var session = require("express-session");
app.use(session({ secret: "Evvariki cheppaku...SHH!!!!" }));
app.get("/", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  console.log(req.sessionID);
  res.send("Count::::" + req.session.count);
});

app.listen(3500, () => {
  console.log("server running on 3500");
});
// s%3Ack5uN79dwS8egP8qVBsVAIJEngbTt3xb.2hkcgW%2BY8F1YMXpnwsY7pI15PCeZYLkdg%2BqsfGtNauA
// s:GxYwkhot5-1R8yldj7zCJUk3fgAhqPkn.Gu2N4w37pkjhyd47p8M7Ekms6vxJaEaQdSaYrt8bhHU
// s:GxYwkhot5-1R8yldj7zCJUk3fgAhqPkn.Gu2N4w37pkjhyd47p8M7Ekms6vxJaEaQdSaYrt8bhHU
// s:k8-NGy89LpDSFE_mcbTHjogaCuclhyCc.QdgN4nqzIWPufgjOCQxp1lWYOVE9PWm7R/0PYp37uqw
// s:k8-NGy89LpDSFE_mcbTHjogaCuclhyCc.QdgN4nqzIWPufgjOCQxp1lWYOVE9PWm7R/0PYp37uqw
// s:k8-NGy89LpDSFE_mcbTHjogaCuclhyCc.QdgN4nqzIWPufgjOCQxp1lWYOVE9PWm7R/0PYp37uqw
// s:0U5as0WRnHLXyeVB1rXXdhCE3nfPVaPA.Pv2uDYl+iP0Bayg3SeNHw/pE5kCW7o6yigMNmOFtYRg
