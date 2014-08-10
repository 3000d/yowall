yowall
======

A wall for yo's

Run it with doker
=================
$ docker run --name="yowall" -e YO_API_KEY=_youryoapikey_ -e YO_SECRET=_yoursecret_ -p _IP_:_PORT_:3000 3kdio/yowall

  _youryoapikey_ => your yo api key, you'll get it at http://yoapi.justyo.co/
  _IP_ => (optional) public ip you want your server to listen from ( for any you should write 0.0.0.0 or leave it blank and remove the semicolon after the _IP_ )  
  _PORT_ => port you want your server to listen from ( probably should be 80 )
  _yoursecret_ => secret key to be sure yo's comming from yo official server

Add the callback url at the yo api website, the url is http://_yourbaseurl_/receiveyo?secret=_yoursecret_

Build it yourself with docker
=============================
git clone this repository, enter it and
$ docker build -t _yourname_/yowall .

then run it

Run it _cowboy_ style
=====================
  Clone this repo
  Enter the repo
  Install node & npm
  Install grunt-cli & bower globaly with # npm install --silent -g grunt-cli bower
  Install backend dependencies with $ npm install
  Install frontend dependencies with $ bower install
  Compile frontend files with $ grunt
  Set environment variables :
    - YO_API_KEY with your api key
    - YO_SECRET with a secret key
  run $node main.js

the app default port is 3000
