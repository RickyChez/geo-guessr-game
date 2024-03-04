# GeoGuessr Game

A simple Node.js module to play a GeoGuessr-type game where you have to guess the location of a random image.

## Installation

Install the package via npm:

```bash
npm install geo-guessr-game
```

## Usage

```javascript
const geoGuessrGame = require('geo-guessr-game');

// Start the game
geoGuessrGame();
```

When you run the script, it will prompt you to enter the path to an image. After providing the image path, it will calculate the distance between the location extracted from the image and a randomly generated location. Finally, it will display the distance and indicate whether your guess is close to the actual location.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
