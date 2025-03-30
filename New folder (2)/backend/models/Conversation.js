import { Schema, model } from "mongoose"

const conversationSchema = new Schema(
    {
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: "message",
                default: []
            }
        ],
        itemId: {
            type: Schema.Types.ObjectId,
            ref: 'item',
            // required:true
        }
    },
    {
        timestamps: true
    }
)
export const Conversation = model("conversation", conversationSchema)