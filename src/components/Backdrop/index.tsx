import { useEffect, useState } from "react";
import Portal from "../Portal";

interface IBackdropProps {
  children: JSX.Element;
  onClick: () => void;
  className?: string;
}

export default function Backdrop({children, onClick, className}: IBackdropProps) {
  return <div onClick={onClick} className={`fixed top-0 left-0 h-screen w-full bg-black/10 ${className}`}>{children}</div> 
}
