export default class LocalStorage
{
    setItem(key: string, value: any)
    {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem<T>(key: string)
    {
        var value = localStorage.getItem(key);
        if (!value)
            return undefined;

        return JSON.parse(value) as T;
    }

    removeItem(key: string)
    {
        localStorage.removeItem(key);
    }
}