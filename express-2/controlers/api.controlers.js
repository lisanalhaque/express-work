const bcrypt = require('bcrypt');
const testMessage = (req, res) => {
    return res.status(200).send({ message: "API is working!" });
};

const hashPassword = async (req, res) => {
    try {
        const body = req?.body;
        if (!body) {
            return res.status(400).send({ ok: false, message: "Request body is required" });

        }
        const { email, password } = body;
        if (!email) {
            return res.status(400).send({ ok: false, message: "Email or Password is required" });
        }
        if (!password) {
            return res.status(400).send({ ok: false, message: "password is required" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return res.status(200).send({ ok: true, message: "password hashed successfully", hash: hashedPassword });


    } catch (error) {
        console.log(error.message);
        
        return res.status(500).send({ ok: false, message: "inter server error" });
        
    }

}


const comparePassword =async (req,res) => {
    try {
        const body = req?.body;
        if(!body){
            return res.status(400).send ({ ok: false, message: "Request body is required" });
        }
        const { password, hash } = body;
        if(!password){
            return res.status(400).send ({ ok: false, message: "Password is required" });
        }
        if(!hash){
            return res.status(400).send ({ ok: false, message: "Hash is required" });
        }
        const isMatch = await bcrypt.compare(password, hash);
        if(!isMatch){
            return res.status(200).send ({ ok: false, message: "Password does not match" });
        }
        return res.status(200).send({ ok: true, message: "Password matched successfully" });
    } catch (error) {
        return res.status(500).send({ ok: false, message: "Internal server error" });
    }
}

module.exports = {
    testMessage,
    hashPassword,
    comparePassword
};