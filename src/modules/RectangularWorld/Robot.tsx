import React, {useEffect, useState} from 'react';
import CustomInput from "../../components/Base/Inputs/CustomInput";
import {Button} from "antd";
import {
    calculateRobotPosition, InputFormatter,
    validateInputs
} from "./RobotHelpers";
import {InputEnum} from "../../components/Base/Inputs/types";
import {Position} from "./types";

function Robot() {
    const [rectangularWorldInput, setRectangularWorldInput] = useState<string>('');
    const [initialPositionInput, setInitialPositionInput] = useState<string>('');
    const [instructionInput, setInstructionInput] = useState<string>('');
    const [lostCordinates, setLostCoordinates] = useState<Position[]>();
    const [isValid, setIsValid] = useState<boolean>(false);
    const [robotPosition, setRobotPosition] = useState<Position>()

    useEffect(() => {
        const formattedInput = InputFormatter(instructionInput, initialPositionInput, rectangularWorldInput)
        if (validateInputs(formattedInput.rectangularWorld, formattedInput.initialPosition, formattedInput.instruction)) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }, [rectangularWorldInput, initialPositionInput, instructionInput])

    useEffect(() => {
        setLostCoordinates([])
    }, [rectangularWorldInput])

    const calculate = () => {
        const formattedInput = InputFormatter(instructionInput, initialPositionInput, rectangularWorldInput);
        const instruction = formattedInput.instruction;
        const initialPosition = formattedInput.initialPosition;
        const rectangularWorld = formattedInput.rectangularWorld;
        const upperRightCoordinate = {X: parseInt(rectangularWorld[0]), Y: parseInt(rectangularWorld[1])}
        let initialCoordinate = {X: parseInt(initialPosition[0]), Y: parseInt(initialPosition[1]), isLost: false};
        let initialDirection = initialPosition[2];
        const {
            robotPosition,
            direction
        } = calculateRobotPosition(instruction, initialCoordinate, upperRightCoordinate, initialDirection, lostCordinates, setLostCoordinates);
        setRobotPosition({...robotPosition, direction})
    }
    return (
        <div style={{margin: 20}}>
            <span style={{color: 'red'}}>please enter values below then calculate button will be enabled.
            </span>
            <div>
                Upper-Right coordinates of the rectangular world such as (5 3)
                <div>
                    <CustomInput type={InputEnum.NumericOnly} style={{width: 150}} value={rectangularWorldInput}
                                 onChange={setRectangularWorldInput}/>
                </div>
                <div>
                    Robot positions such as (1 1 E)
                    <CustomInput type={InputEnum.Coordinate} style={{width: 150}} value={initialPositionInput}
                                 onChange={setInitialPositionInput}/>
                </div>
                <div>
                    Instruction such as (RFRFRFRF)
                    <CustomInput type={InputEnum.Instruction} style={{width: 150}} value={instructionInput}
                                 onChange={setInstructionInput}/>
                </div>
                <Button type='primary' disabled={!isValid} onClick={calculate}>Calculate</Button>
            </div>
            <span>Your Robot Last Position and orientation: {robotPosition && robotPosition.direction && robotPosition.X + "," + robotPosition.Y + " " + robotPosition.direction + " " + (robotPosition.isLost ? "LOST" : "")}</span>
        </div>
    );
}

export default Robot;
