export interface Card {
    id: string
    nombre: string
    url: string
}

export interface User {
    id: string
    userName: string
    collection: Card[]
}

export type Users = User[]
