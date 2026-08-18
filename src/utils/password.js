import bcrypt from 'bcrypt'
const SALT_ROUND = 10;

const hashPassword = async(password) => {
    return await bcrypt.hash(password,SALT_ROUND);
}

const ComparingPassword = async(password,db_password) => {
    return await bcrypt.compare(password,db_password);
}

export {
    hashPassword,
    ComparingPassword
}