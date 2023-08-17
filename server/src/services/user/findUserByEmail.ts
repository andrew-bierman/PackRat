import User from '../../models/userModel';

export async function findUserByEmail(email: string): Promise<any> {
    try {
        let val = await User.find({ email: email.toLowerCase() });
        if (val.length) {
            return true
        } else {
            return "User not found"
        }
    } catch (error) {
        return "Server Error"
    }
}