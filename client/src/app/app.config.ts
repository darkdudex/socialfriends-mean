const url = {
  localhost: 'http://localhost:3000/api',
  desktop: 'http://192.168.1.67:3000/api',
  laptop: 'http://192.168.1.59:3000/api',
  heroku: 'https://socialfriends-restapi.herokuapp.com/api',
  now: 'https://socialfriends.now.sh/api'
}

export var config = {
  url: url.laptop
}