import React from "react";


interface IButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: JSX.Element
  btnClick: () => void;
}

export default function Button({ btnClick, children, ...props}: IButtonProps) {
  return (
    <button  
      {...props} 
      onClick={(e) => {
        e.stopPropagation();
        if(typeof btnClick !== 'undefined') {
          btnClick();
        }
      }}>
      {children}
    </button>
  )
}
