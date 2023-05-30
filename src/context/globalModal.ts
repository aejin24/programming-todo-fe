import { createContext } from "react";

type TGlobalModalContextProps = {
  show: (type: number, props?: {}) => void;
  hide: () => void;
  store: {
    type: number;
    props: {};
  };
};

export default createContext<TGlobalModalContextProps>({
  show: () => {},
  hide: () => {},
  store: {
    type: 0,
    props: {},
  },
});
