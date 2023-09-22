import bcrypt from 'bcrypt'
import { HashComparer, Hasher } from '../entities/hash.entity'

export class BcryptAdapter implements Hasher, HashComparer {
    constructor(private readonly salt: number) {}

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.salt)
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }
}
