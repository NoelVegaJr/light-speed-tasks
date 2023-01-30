import Backdrop from "../Backdrop";
import Portal from "../Portal";
import { animated, useTransition } from 'react-spring';

export interface IModalProps {
  isOpen: boolean;
  close: () => void;
  children: JSX.Element;
}

export default function Modal({ isOpen, close, children }: IModalProps) {
  const transitions = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  return (
    <>
      <Portal>
        {transitions(
          (style, isOpen) =>
            isOpen && (
              <animated.div style={style}>
                <Backdrop onClick={close} className="flex justify-center items-center">
                  {children}
                </Backdrop>
              </animated.div>
            )
        )}
      </Portal>
    </>
  )
}
