export default interface Contact
{
    id: string
    name: string
    emails: string[]
    phoneNumbers: string[]
    addresses: Address[]
}

export interface Address
{
    state: string
    city: string
    neighborhood: string
    street: string
    number: number
    complement: string
}


export function newAddress() {
    return {
        postalCode: '',
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        number: 1,
        complement: ''
    }
}