import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/user/actionCreators";

import { GlobalStateInt } from "./GlobalStateInterface";
import Main from "./Components/Main/Main";
import Auth from "./Components/Auth/Auth";
import Spinner from "./Components/Spinner/Spinner";
import checkUser from "./helpers/requests/chekUser";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: GlobalStateInt) => state.user);

  useEffect(() => {
    (async function () {
      const response = await checkUser();
      response ? dispatch(getUser(response)) : navigate("/auth");
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!Object.keys(user).length && window.location.pathname !== "/auth") return <Spinner />;

  return (
    <>
      <Routes>
        <Route path="/" element={<Main user={user} />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
