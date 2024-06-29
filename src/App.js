import Router from "./Route";
import { useEffect } from "react";
import { updateUserState } from "./redux/slices/userSlice/userThunk";
import store from "./redux/store/store";

function App() {

  useEffect(()=>{
    store.dispatch(updateUserState())
  },[])

  return (
    <Router />
  );
}

export default App;
