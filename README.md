
# JS Asteroids
Basic asteroids game for the browser.

# Build
1. Open up a terminal (or cd into) the project's root folder
2. Install all npm dependencies with `npm install`
3. Build and run the project using the `npm run start` command

# Project Structure
The project is divided into separate modules that are compiled as separate TypeScript projects. This is to avoid unnecessary recompilation steps when modifying the code. Here is the list of modules (which can be found under ./src):
- `game-engine`: contains the generic game engine code responsible for running games
- `game-modules`: modules specific to Asteroid that handle simulating and rendering it
- `server-modules`: serves files, in the future it will also host games on a network
- `client-scripts`: contains client-side code responsible for running Asteroids and, in the future, connecting to the network
