//auth routes
import verifyUserToken from "./auth/verifyUserToken";
import verifyAdminToken from "./auth/verifyAdminToken";
import verifyRoleToken from "./auth/verifyRoleToken";



const auth = {
    verifyUserToken,
    verifyAdminToken,
    verifyRoleToken
};

const middlewareHandler = {
    auth
}




export default middlewareHandler;