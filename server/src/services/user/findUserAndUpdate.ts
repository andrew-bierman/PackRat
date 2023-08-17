import User from '../../models/userModel';

export async function findUserAndUpdate(email: string, data: string,datatype): Promise<any> {
    try {
        let val = await User.findOneAndUpdate(
            { email: email.toLowerCase() },
            { datatype: data },
            {
                returnOriginal: false,
            }
        );
        if (val.id) {
            return true
        } else {
            return "Unable to send"
        }
    } catch (error) {
        return "Server Error"
    }
}
