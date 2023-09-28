
const {Truncs,User}=require('../database/mongo')

const getAllTruncs = async (req, res) => {
    try {
        const truncs = await Truncs.find({}).lean();
        const users = await User.find({}).lean();
        console.log(users)
        console.log(truncs)
        return res.render('projectClient', { layout: false, truncs: truncs ,users:users});
    } catch (e) {
        res.json({ msg: e });
    }
}
const createTruncs = async (req, res) => {
    try {
        const { project, developer, client, status } = req.body;
        const newTruncs = new Truncs({project, developer, client, status });
        await newTruncs.save();
        console.log(newTruncs)
        return res.json(newTruncs);
    } catch (e) {
        return res.json({ msg: e });
    }
}

const getOneTruncs=async(req,res)=>{
    try{
        const TruncsId=req.params.id;
        const truncs= await Truncs.findById(TruncsId).lean()
        if(!truncs){
            return res.status(404).send("Truncstion not found")
        }
        return res.render('editProject',{truncs:truncs,layout:false})
    }
   catch(e){
    res.json({msg:e})}
}

const updatTruncs =async (req, res) => {
    const allowedUpdates = ['project', 'developer', 'client', 'status'];  
    const updates = Object.keys(req.body);  
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const truncs = await Truncs.findById(req.params.id); 

        if (!truncs) {
            return res.status(404).send({ error: 'Project not found' });
        }

        updates.forEach((update) => truncs[update] = req.body[update]);
        await truncs.save();

        res.json({ msg: 'Project updated successfully', data: truncs });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
}


const deleteTruncs=async(req,res)=>{
    try{
        const TrunscId=req.params.id;
        await Truncs.findByIdAndDelete(TrunscId)
        return res.json({msg:"task deleted successfuly"})
    
    }
    catch(e){ res.json({msg:e})}


}
module.exports={createTruncs,getAllTruncs,updatTruncs,deleteTruncs,getOneTruncs}