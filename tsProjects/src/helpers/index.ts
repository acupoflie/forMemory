
import crypto from 'crypto';

const SECRET = 'ljasdf8-lkasdf0-23nasdf'

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join(' / ')).update(SECRET).digest('base64');
}