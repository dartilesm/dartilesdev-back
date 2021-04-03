import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { from, Observable, of } from 'rxjs';
import { User } from 'src/app/users/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    login(user: User): Promise<any> {
        const { password, ...userData } = user
        const result = {
            access_token: this.jwtService.sign(userData),
        }
        return Promise.resolve(result);
    }

    hashPaswword(password: string): Observable<string> {
        return from(bcrypt.hash(password, 12))
    }

    async comparePassword(newPassword: string, passwordHash: string): Promise<any | boolean> {
        return bcrypt.compare(newPassword, passwordHash)
            .then(isPasswordValid => {
                if (isPasswordValid) {
                    return isPasswordValid
                } else {
                    throw new Error('Invalid credentials')
                }
            })
            .catch(() => { throw new Error('Invalid credentials') })
    }
}
