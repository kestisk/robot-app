import React from 'react';
import {Input} from 'antd';
import {InputEnum, NumericInputProps} from "./types";
import {regCoordinate, regInstruction, regNumeric} from "./constants";

const CustomInput = (props: NumericInputProps) => {
    const {onChange, type} = props;


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value: inputValue} = e.target;
        let reg: RegExp = /$/;
        if (type === InputEnum.NumericOnly) {
            reg = regNumeric;
        } else if (type === InputEnum.Coordinate) {
            reg = regCoordinate;
        } else if (type === InputEnum.Instruction) {
            reg = regInstruction
        }
        if (reg.test(inputValue) || inputValue === '') {
            onChange(inputValue);
        }
    };

    return (
        <div>
            <Input
                {...props}
                onChange={handleChange}
                maxLength={100}
            />
        </div>
    );
};
export default CustomInput;
