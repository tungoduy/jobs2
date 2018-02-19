export const getAsyncData = async (asyncStorage, key) => {
    let result = await asyncStorage.getItem(key);
    return result;
}

export const setAsyncData = async (asyncStorage, { key, value }) => {
    try {
        await asyncStorage.setItem(key, value);
        return true;
    } catch (err) {
        return err;
    }
}