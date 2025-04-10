type TextInputProps = {
    name: string;
    value: string;
    onValueChange: (value:string) => void;
    extraStyles?: string;
    typePassword?: boolean;
  };
  
export const TextInput: React.FC<TextInputProps> = ({
    name,
    value,
    onValueChange,
    extraStyles = "",
    typePassword = false
  }) => {
    return (
        <div className={`${extraStyles} block`}>
            <label className="font-semibold">{name}:</label><br />
            <input className="border-2 w-full focus:outline-0 rounded-lg px-1" type={typePassword ? 'password' : 'text'} value={value} onChange={(e) => onValueChange(e.target.value)} />
        </div>
    )
}
