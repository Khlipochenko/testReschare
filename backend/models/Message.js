import { Schema, model } from "mongoose"
import validator from "validator"

const messageSchema = new Schema(
    {
        message: {
            type: String,
            required: true
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        conversationId: {
            type: Schema.Types.ObjectId,
            ref: "conversation"

        }
    },
    {
        timestamps: true
    }
)
messageSchema.pre("save", function () {
    // description wurde angepasst, ehe das Objekt gespeichert wurde
    this.message = validator.escape(this.message);
});
export const Message = model("message", messageSchema)