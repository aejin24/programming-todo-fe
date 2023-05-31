import { PropsWithChildren, useState } from "react";

import GlobalModalContext from "context/globalModal";
import { modalList } from "utils/modal";
import { sleep } from "utils/common";

export default function GlobalModal({ children }: PropsWithChildren) {
  const [store, setStore] = useState({
    type: 0,
    props: {},
  });

  const show = async (type: number, props?: {}) => {
    setStore({
      ...store,
      type,
      props: props || {},
    });

    if (type === 2) {
      await sleep(5000);

      setStore({
        ...store,
        type: 0,
        props: {},
      });
    }
  };

  const hide = () => {
    setStore({
      ...store,
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
