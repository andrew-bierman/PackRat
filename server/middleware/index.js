//auth routes
import verifyUserToken from "./auth/verifyUserToken.js";
import verifyAdminToken from "./auth/verifyAdminToken.js";
import verifyRoleToken from "./auth/verifyRoleToken.js";



const auth = {
    verifyUserToken,
    verifyAdminToken,
    verifyRoleToken
};

const middlewareHandler = {
    auth
}




export default middlewareHandler;