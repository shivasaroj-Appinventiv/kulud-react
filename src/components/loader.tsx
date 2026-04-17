import { useAppSelector, type RootState } from "../redux/store";
import { Backdrop, CircularProgress } from "@mui/material";


const Loader = () => {
    const isLoading = useAppSelector((state: RootState) => state.global.loading);
    return (
        <Backdrop 
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={isLoading}
          >
             <CircularProgress color="inherit" />

        </Backdrop>
    );
};

export default Loader;
