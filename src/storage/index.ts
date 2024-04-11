import AsyncStorage from "@react-native-async-storage/async-storage";

async function saveData(key: string, data: any) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data))
    } catch (error: any) {
        console.log(error.message);
    }
}

async function loadData(key: string) {
    try {
        const localData = await AsyncStorage.getItem(key)
        return localData !== null ? JSON.parse(localData) : null
    } catch (error: any) {
        console.log(error.message);

    }
}

const containsKey = async (key: string): Promise<boolean> => {
    let containKey: boolean = false;
    try {
        let allKeys = await AsyncStorage.getAllKeys();
        containKey = allKeys.includes(key);

    } catch (e: any) {
        console.error(e.message);
    }

    return containKey;
}

const deleteStorage = async (key: string) => {
    await AsyncStorage.removeItem(key);
}

const deleteAllStorage = async () => {
    await AsyncStorage.clear();
}

export { saveData, loadData, containsKey, deleteAllStorage, deleteStorage }