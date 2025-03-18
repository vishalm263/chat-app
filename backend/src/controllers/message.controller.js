import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";


export const getUsersForSidebar = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).schemaLevelProjections("-password");
        res.status(200).json(filteredUsers)
    }
    catch (error) {
        console.log("Error in getUsersForSiderbar: ",error.Message);
        res.status(500).json({ error: "Internal Server Error"});
    }
};

export const getMessages = async (req, res) => {
    try{
        const { id: userToChatId } = req.params
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId: userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        res.status(200).json(messages)
    }
    catch (error) {
        console.log("Error in getMessages controller ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const sendMessage = async (req, res) => {
    try{
        const {text , image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadedResponse = await cloudinary.uploader.upload(image, {
                folder: "chat_app_images"
            })
            imageUrl = uploadedResponse.secure_url;
        }

        const message = await Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        }) 
        await message.save();

        // todo for real time chat using socket.io


        const populatedMessage = await message.populate("senderId", "username profilePicture");
            res.status(201).json(populatedMessage);
    }
    catch (error) {
        console.log("Error in sendMessage controller ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}
