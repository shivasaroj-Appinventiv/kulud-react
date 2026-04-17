import { useAppSelector, type RootState } from "../../../redux/store";

const useMyProfileHelper=()=>{
        const userData=useAppSelector((state:RootState)=>state.auth.admin);
return {userData};
}

export default useMyProfileHelper;