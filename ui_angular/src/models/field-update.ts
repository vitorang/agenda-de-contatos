import type { Address } from "./contact"

export default interface FieldUpdate
{
    add: () => void
    edit: (index: number, value: string | Address) => void
    remove: (index: number) => void
}