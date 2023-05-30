import { PropsWithChildren, useState } from "react";

import { modalList } from "utils/modal";
import GlobalModalContext from "context/globalModal";

export default function GlobalModal({ children }: PropsWithChildren) {
  const [store, setStore] = useState({
    type: 0,
    props: {},
  });

  const show = (type: number, props?: {}) => {
    setStore({
      type,
      props: props || {},
    });
  };

  const hide = () => {
    setStore({
      type: 0,
      props: {},
    });
  };

  const renderComponent = () => {
    const ModalComponent = modalList[store.type];

    if (!ModalComponent) {
      return null;
    }

    return <ModalComponent {...store.props} />;
  };

  return (
    <GlobalModalContext.Provider value={{ store, show, hide }}>
      {renderComponent()}
      {children}
    </GlobalModalContext.Provider>
  );
}
