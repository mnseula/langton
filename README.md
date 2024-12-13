# Langton's Ant Simulation

A React Native Web implementation of Langton's Ant cellular automaton, containerized with Docker.

## Rules of Langton's Ant

1. At a white square, turn 90° clockwise, flip the color of the square, move forward one unit
2. At a black square, turn 90° counter-clockwise, flip the color of the square, move forward one unit

## Running with Docker

1. Build and start the container:
```bash
docker-compose up --build
```

2. Access the application at:
```
http://localhost:19006
```

The application will run in development mode inside the container, allowing for a full-featured experience.

## Controls

- Click the button at the bottom of the screen to start/stop the simulation
- The red square represents the ant
- White squares are unvisited cells
- Black squares are visited cells

## Project Structure

- `App.js` - Main application component
- `Dockerfile` - Docker configuration for development environment
- `docker-compose.yml` - Docker Compose configuration
- `package.json` - Project dependencies and scripts
