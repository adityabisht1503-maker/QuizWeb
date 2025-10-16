import { useEffect } from "react";



const Tabswitch = (onCheat)=>{

useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        onCheat("Tab change detected");
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onCheat]);
}
export default Tabswitch


