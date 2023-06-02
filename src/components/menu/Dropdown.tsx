import React, { createContext, HTMLAttributes, PropsWithChildren, useContext, useMemo } from "react";

type TDropdownContextProps = {
  onChange: (selected: string) => void;
  isOpen: boolean;
};

const DropdownContext = createContext<TDropdownContextProps>({
  onChange: () => {},
  isOpen: false,
});

export default function Dropdown({ onChange, isOpen, children }: PropsWithChildren<TDropdownContextProps>) {
  const value = useMemo(() => {
    return { onChange, isOpen };
  }, [onChange, isOpen]);

  return <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>;
}

function DropdownButton({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLButtonElement>>) {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
}

function DropdownItems({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  const { isOpen } = useContext(DropdownContext);

  return isOpen ? <div {...props}>{children}</div> : null;
}

function DropdownItem({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLButtonElement>>) {
  const { onChange } = useContext(DropdownContext);

  return (
    <button
      type="button"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        onChange(e.currentTarget.innerText);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

Dropdown.DropdownButton = DropdownButton;
Dropdown.DropdownItems = DropdownItems;
Dropdown.DropdownItem = DropdownItem;
