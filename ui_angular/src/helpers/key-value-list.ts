type keyValue<T> = {key: string, value: T};

export class KeyValueList<T>
{
    private static nextKey = 1;
    private items: keyValue<T>[] = [];

    push(value: T)
    {
        this.items.push({ key: KeyValueList.nextKey.toString(), value })
        KeyValueList.nextKey++;
    }

    remove(key: string)
    {
        var index = this.items.findIndex(v => v.key == key);
        if (index > -1)
            this.items.splice(index, 1);
    }

    clear()
    {
        this.items.splice(0);
    }

    public *[Symbol.iterator](): Iterator<keyValue<T>> {
        for (let value of this.items)
            yield value;
    }

    get length()
    {
        return this.items.length;
    }

    get values()
    {
        return this.items.map(v => v.value);
    }

    getValue(key: string) 
    {
        return this.items.find(v => v.key == key)?.value;
    }
    
    setValue(key: string, value: T)
    {
        var v = this.items.find(v => v.key == key);
        if (v)
            v.value = value;
    }
 }