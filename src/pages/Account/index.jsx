import Form from "./Form";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import { useLayoutEffect, useState } from "react";

function Account() {
  const currentUser = useSelector((state) => state.account).user;
  const [isLogged, setIsLogged] = useState(false);

  useLayoutEffect(() => {
    if (currentUser.email) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [currentUser]);

  return <>{isLogged ? <Profile /> : <Form />}</>;
}

export default Account;
