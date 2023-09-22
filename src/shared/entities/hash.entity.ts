export interface HashComparer {
    compare(password: string, hash: string): Promise<boolean>
}

export interface Hasher {
    hash(password: string): Promise<string>
}
