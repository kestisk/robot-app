export enum InputEnum {
    NumericOnly = "NumericOnly",
    Coordinate = "Coordinate",
    Instruction = "Instruction",
}

export type NumericInputProps = {
    value: string;
    onChange: (value: string) => void;
    style?: React.CSSProperties;
    type: InputEnum
}
