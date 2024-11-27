# tarot-project

This project was originally meant to be a tarot-themed API for boot.dev, but spiraled into a full-fledged CRUD app organized around tarot drawings (pun intended). The backend of this app is written in Golang (my first project built using it), and the database uses PostgreSQL, with the frontend written in React and JavaScript. It was deployed on an AWS instance running Debian, with the frontend served by Nginx. Art generation and responses by the fortuneteller are both done by OpenAI (DALL-E and ChatGPT), and images which are created are stored in an S3 instance on AWS.

This is the first project I've built which supports authentication (log-in and log-out ability). Logged-in users can create journal entries and get a limited number of calls to DALL-E (to generate free images of tarot cards in a variety of art styles) per day; they can also save those images or save "readings" done by ChatGPT. (Users who are not logged in cannot create new images, and are instead merely shown already generated art, and cannot save their conversations with the fortuneteller/ChatGPT).

## Contributing

You can contribute to this project by using it yourself! Send me the coolest cards the AI draws for you and let me know if the fortuneteller's predictions come true.
