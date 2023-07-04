import { Registration } from "../Registration/Registration";
import { Login } from "../Login/Login";
import { useState } from "react";

export default function Auth() {
  const [showComponent, setShowComponent] = useState<boolean>(true);
  const changeComponent = (): void => {
    setShowComponent((prev: boolean) => !prev);
  };

  return <>{showComponent ? <Registration changeComponent={changeComponent} /> : <Login changeComponent={changeComponent} />}</>;
}
