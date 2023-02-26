import {Position} from "./type";

export const getNextDirection = (turnPosition: String, direction: string) => {
    const directions = ['N', 'E', 'S', 'W', 'N'];
    if (turnPosition === 'L') {
        const ind = directions.lastIndexOf(direction)
        direction = directions[ind - 1];
        return direction;
    } else {
        const ind = directions.indexOf(direction);
        direction = directions[ind + 1];
        return direction;
    }
}

export const getNextPosition = (direction: string, position: Position) => {
    switch (direction) {
        case 'N':
            return {X: position.X, Y: position.Y + 1};
        case 'E':
            return {X: position.X + 1, Y: position.Y};
        case 'S':
            return {X: position.X, Y: position.Y - 1};
        case 'W':
            return {X: position.X - 1, Y: position.Y};
        default:
            return position;
    }
}

export const validateRectangularWorld = (position: Position, upperRightCoordinate: Position) => {
    if (position.X > upperRightCoordinate.X || position.Y > upperRightCoordinate.Y) {
        return false;
    }
    return true;
}

export const calculateRobotPosition = (instructions: string[], robotPosition: Position, upperRightCoordinate: Position, direction: string, lostCordinates: Position[] | undefined, setLostCoordinates: Function) => {
    instructions.forEach((value: string) => {
        if (value === 'F') {
            const newPosition = getNextPosition(direction, robotPosition)
            if (validateRectangularWorld(newPosition, upperRightCoordinate)) {
                robotPosition.X = newPosition.X;
                robotPosition.Y = newPosition.Y;
            } else {
                const isExistedLostPoint = lostCordinates && !!lostCordinates.findIndex(coordinate => coordinate === newPosition);
                if (!isExistedLostPoint) {
                    robotPosition = {...newPosition, isLost: true};
                    const lost = lostCordinates ? [newPosition, ...lostCordinates] : [newPosition];
                    setLostCoordinates(lost);
                }

            }
        } else if (value === 'R' || value === 'L') {
            direction = getNextDirection(value, direction);
        }
    })
    return {robotPosition, direction};
}
