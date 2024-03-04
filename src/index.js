// geoGuessrGame.js

const fs = require('fs');
const readline = require('readline');
const getImageGeolocation = require('image-geolocation');

// Function to generate a random location
function generateRandomLocation() {
    const latitude = Math.random() * 180 - 90;
    const longitude = Math.random() * 360 - 180;
    return { latitude, longitude };
}

// Function to calculate the distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

// Function to play the game
async function playGame() {
    const randomLocation = generateRandomLocation();
    console.log('Guess the location of the image!');
    console.log('Enter the path to the image:');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('', async (imagePath) => {
        try {
            const imageLocation = await getImageLocation(imagePath);
            const distance = calculateDistance(
                randomLocation.latitude, randomLocation.longitude,
                imageLocation.latitude, imageLocation.longitude
            );

            console.log(`The distance to the correct location is: ${distance.toFixed(2)} km`);

            // You can define your own logic for determining how close the guess is to the actual location
            // For example, you could provide a threshold and consider the guess as correct if the distance is within that threshold
            // For simplicity, let's consider it correct if the distance is less than 100 km
            if (distance < 100) {
                console.log('Congratulations! Your guess is close to the actual location.');
            } else {
                console.log('Sorry, your guess is far from the actual location.');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }

        rl.close();
    });
}

// Function to get location from the image
function getImageLocation(imagePath) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(imagePath)) {
            reject(new Error('File does not exist.'));
        }

        getImageGeolocation(imagePath)
            .then(({ latitude, longitude }) => {
                resolve({ latitude, longitude });
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports = playGame;
