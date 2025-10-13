import type { Address } from "./Contact"

export default interface FieldUpdate
{
    add: () => void
    edit: (index: number, value: string | Address) => void
    remove: (index: number) => void
}