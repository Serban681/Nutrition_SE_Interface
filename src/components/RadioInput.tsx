type SelectInputProps = {
    name: string;
    value: string;
    onValueChange: (value:string) => void;
    possibleValues: string[],
    extraStyles?: string;
  };

export const RadioInput: React.FC<SelectInputProps> = ({
    name,
    value,
    onValueChange,
    possibleValues,
    extraStyles = ""
  }) => {
    return (
        <div className={`${extraStyles} block`}>
            <label className="font-semibold">{name}:</label><br />
            {possibleValues.map((valueName, index) => (
                <>
                  <input
                      key={index}
                      type="radio"
                      value={valueName}
                      checked={value === valueName}
                      onChange={(e) => onValueChange(e.target.value)}
                  />{valueName}<br/>
                </>
            ))}
        </div>
    )
}
