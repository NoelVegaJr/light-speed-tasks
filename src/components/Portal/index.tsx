import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({children}: {children: JSX.Element | JSX.Element[]}){
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, [])

    return mounted ? createPortal(<>{children}</>, document.getElementById('__next') as HTMLElement) : null;
  }
