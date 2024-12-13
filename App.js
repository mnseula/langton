import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';

const GRID_SIZE = 20;
const CELL_SIZE = Math.floor(Dimensions.get('window').width / GRID_SIZE);

// Directions: 0 = right, 1 = down, 2 = left, 3 = up
const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];

export default function App() {
  const [grid, setGrid] = useState(
    Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0))
  );
  const [antPosition, setAntPosition] = useState({
    x: Math.floor(GRID_SIZE / 2),
    y: Math.floor(GRID_SIZE / 2),
    direction: 0
  });
  const [isRunning, setIsRunning] = useState(false);

  const moveAnt = () => {
    setGrid(currentGrid => {
      const newGrid = currentGrid.map(row => [...row]);
      const { x, y, direction } = antPosition;
      
      // Get current cell color and flip it
      const currentColor = newGrid[y][x];
      newGrid[y][x] = currentColor === 0 ? 1 : 0;
      
      // Calculate new direction
      let newDirection = direction;
      if (currentColor === 0) { // White square
        newDirection = (direction + 1) % 4; // Turn right
      } else { // Black square
        newDirection = (direction + 3) % 4; // Turn left
      }
      
      // Calculate new position
      const newX = x + directions[newDirection][0];
      const newY = y + directions[newDirection][1];
      
      // Check boundaries
      if (newX >= 0 && newX < GRID_SIZE && newY >= 0 && newY < GRID_SIZE) {
        setAntPosition({
          x: newX,
          y: newY,
          direction: newDirection
        });
      }
      
      return newGrid;
    });
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(moveAnt, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning, antPosition]);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {grid.map((row, y) => (
          <View key={y} style={styles.row}>
            {row.map((cell, x) => (
              <View
                key={`${x}-${y}`}
                style={[
                  styles.cell,
                  { backgroundColor: cell === 1 ? 'black' : 'white' },
                  antPosition.x === x && antPosition.y === y && styles.ant
                ]}
              />
            ))}
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsRunning(!isRunning)}
      >
        <View style={[styles.buttonInner, isRunning && styles.buttonStop]}>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  ant: {
    backgroundColor: 'red',
  },
  button: {
    marginTop: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInner: {
    width: 20,
    height: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  buttonStop: {
    backgroundColor: '#f44336',
  },
});
