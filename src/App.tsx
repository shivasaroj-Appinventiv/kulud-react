import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/RouteProvider";
import { ToastContainer } from "react-toastify";
import Loader from "./components/loader";
import { useAppSelector, type AppDispatch } from "./redux/store";
import ConfirmationDialog from "./components/ConfirmationDialog";
import { useDispatch } from "react-redux";
import { closeDialog } from "./redux/slices/global.slice";

function App() {
  const { open, message, onConfirm } = useAppSelector(
    (state) => state.global.openConfirmationDialog,
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <Loader /> {/* ✅ always rendered, reads state independently */}
      {open && (
        <ConfirmationDialog
          message={message}
          onConfirm={() => (onConfirm?.(), dispatch(closeDialog()))}
          onCancel={() => dispatch(closeDialog())}
        />
      )}
      <BrowserRouter>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        {/* ✅ only route rendering waits for rehydration */}
        <AppRouter />
        {/* </PersistGate> */}
      </BrowserRouter>
      <ToastContainer hideProgressBar />
    </>
  );
}

export default App;
