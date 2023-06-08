import { ComponentProps, createContext, InputHTMLAttributes, useMemo } from "react";

type TRadioContextProps = {
  label: string;
  handleChange?: ({ value }: { value: any }) => void;
};

const RadioContext = createContext<TRadioContextProps>({
  label: "",
  handleChange: () => {},
});

export default function Radio({
  handleChange,
  label,
  ...props
}: TRadioContextProps & InputHTMLAttributes<HTMLInputElement>) {
  const contextValue = useMemo(() => {
    return { handleChange, label };
  }, [handleChange, label]);

  const handleRadioChange: ComponentProps<"input">["onChange"] = (e) => {
    if (handleChange) {
      handleChange({ value: e.currentTarget.value });
    }
  };

  return (
    <RadioContext.Provider value={contextValue}>
      <>
        <input type="radio" onChange={handleRadioChange} {...props} />
        <label htmlFor={props.id}>{label}</label>
      </>
    </RadioContext.Provider>
  );
}
