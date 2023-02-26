import React from 'react';
import {
    calculateRobotPosition,
    getNextDirection,
    getNextPosition,
    validateRectangularWorld
} from "../modules/RectangularWorld/RobotHelpers";

test('rectangular world validation', () => {
    const rectangularWorld1 = {X: 5, Y: 3};
    const positionInWorld = {X: 4, Y: 3};
    const rectangularWorld2 = {X: 5, Y: 3};
    const positionOutWorld = {X: 7, Y: 3};
    const isValid = validateRectangularWorld(positionInWorld, rectangularWorld1);
    expect(isValid).toBe(true);
    const isValid2 = validateRectangularWorld(positionOutWorld, rectangularWorld2);
    expect(isValid2).toBe(false);
});

test('directionTest', () => {
    const turn = 'L';
    const direction = 'N';
    const newDirection = getNextDirection(turn, direction);
    expect(newDirection).toBe('W');
});

test('positionTest', () => {
    const position = {X: 5, Y: 4};
    const direction = 'N';
    const expectedPosition = {X: 5, Y: 5};
    const newPosition = getNextPosition(direction, position);
    expect(newPosition).toStrictEqual(expectedPosition);
});

test('singleRobotTest', () => {
    const upperRightCoordinate = {X: 5, Y: 3};
    const instruction = ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F'];
    const initialPosition = {X: 1, Y: 1, isLost: false};
    const direction = 'E';
    const expectedPosition = {robotPosition: {X: 1, Y: 1, isLost: false}, direction: 'E'};
    const newPosition = calculateRobotPosition(instruction, initialPosition, upperRightCoordinate, direction, [], () => {
    });
    expect(newPosition).toStrictEqual(expectedPosition);
});
