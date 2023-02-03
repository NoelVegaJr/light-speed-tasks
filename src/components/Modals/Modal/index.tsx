import Backdrop from "@/components/UI/Backdrop";
import Portal from "@/components/UI/Portal";
import { animated, useTransition } from 'react-spring';

export interface IModalProps {
  isOpen: boolean;
  close: () => void;
  children: JSX.Element;
  backdropStyles?: string
}

export default function Modal({ isOpen, close, children, backdropStyles }: IModalProps) {
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
                <Backdrop onClick={close} className={`flex justify-center items-center ${backdropStyles}`}>
                  {children}
                </Backdrop>
              </animated.div>
            )
        )}
      </Portal>
    </>
  )
}
