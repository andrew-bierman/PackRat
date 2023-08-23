export function responseHandler(res) {
    const data = res.locals?.data ?? { message: "Success" };
    return res.status(200).json(data);
}
