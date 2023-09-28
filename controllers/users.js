const {User}=require('../database/mongo')
 

const getAllUsers =  async (req, res) => {
    try {
        const users = await User.find({}).lean();
        return res.render('users', { 
            layout: false,
            users:users
        });
    } catch (e) {
        res.json({ msg: e });
    }
}

module.exports={getAllUsers}