import { useLocation,Navigate,Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = ({allowedRoles}) =>{
    const {auth} = useAuth();
    const location = useLocation();

    return(

        auth?.role == allowedRoles
            ? <Outlet/>
            : auth?.token
                ? <Navigate to="/unauthorized" state={{from: location}} replace/>
                :<Navigate to="/login"  state={{from: location}} replace/>

    );

}

export default RequireAuth;