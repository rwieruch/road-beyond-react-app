# The Road beyond React (Application)

[![Build Status](https://travis-ci.org/rwieruch/road-beyond-react-app.svg?branch=master)](https://travis-ci.org/rwieruch/road-beyond-react-app)

A Hacker News / Pocket clone which let's you save front page stories for later.

* Found in [the Road beyond React](https://www.roadtolearnreact.com/)

<img width="1275" alt="screen shot 2017-11-21 at 14 27 47" src="https://user-images.githubusercontent.com/2479967/33057954-366aa5b6-cec8-11e7-8b32-2658928ee5b8.png">

## Features

* uses:
  * only React (create-react-app)
  * firebase
  * react-router 4
  * semantic-ui
  * styled-components
  * no Redux/MobX
* features:
  * Sign In
  * Sign Up
  * Sign Out
  * Password Forget
  * Password Change
  * Protected Routes with Authorization
  * Database: Users, Stories

## Installation

* `git clone git@github.com:rwieruch/road-beyond-react-app.git`
* `cd road-beyond-react-app`
* `npm install`
* `npm start`
* visit http://localhost:3000/
* use your own Firebase Credentials

### Use your own Firebase Credentials

* visit https://firebase.google.com/ and create a Firebase App
* copy and paste your Credentials from your Firebase App into src/firebase/firebase.js
* activate Email/Password Sign-In Method in your Firebase App
