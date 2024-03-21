import {confirmedPassword, checkUserExistence , hashPassword, verifyPassword, getUserById } from '../services/login.service'
import connectDB from '../config/db'

describe('login services ',  () => {
    describe('getUserById service', () => {
        connectDB()
        it('should return null if user not exist', async () => {
            const user_id = await getUserById('fake-user');
            expect(user_id).toBeNull();
        })

        it('should return id if user exist', async () => {
            const user_id = await getUserById('ss12');
            expect(user_id).toEqual(user_id)
        })
    })

   describe('confirmedPassword service', () => {
    it('should return true if password and confirmed password match', async () => {
        const result = await confirmedPassword('password', 'password');
        expect(result).toBe(true)
    })

    it('should return false if password and confirmed password do not match', async () => {
        const result = await confirmedPassword('password1', 'password2');
        expect(result).toBe(false)
    })
   })
   describe("checkUserExistence service", () => {
     connectDB();
     it('should return false if user not exist', async () => {
        const user = await checkUserExistence('fake-user');
        expect(user).toBe(false);
     })
     it('should return true if user exist', async () => {
        const user = await checkUserExistence('crespoX');
        expect(user).toEqual(user);
     })
    });
   
   describe("hashPassword service", () => {
    it('should return hash ', async() => {
        const hash = await hashPassword('123')
        expect(hash).toEqual(hash)
    })
   })

   describe("verify password service", () => {
    it('should return verify if user and password correct', async() => {
        const verify = await verifyPassword('ss12', '123')
        expect(verify).toEqual(verify)
    })
    it('should return false if user error', async () => {
        const verify = await verifyPassword('fake-user', '123')
        expect(verify).toBeFalse()
    })
    it('should return false if password error', async () => {
        const verify = await verifyPassword('ss12', 'fake-pass')
        expect(verify).toBeFalse()
    })
   })

})
