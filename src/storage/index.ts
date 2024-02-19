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

export { saveData, loadData }