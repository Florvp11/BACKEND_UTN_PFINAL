import mongoose from "mongoose";
import { AVAILABLE_ROLES_WORKSPACE_MEMBERS } from "../dictionarie/availableRoles.dictionary.js";

const workspaceMembersSchema = new mongoose.Schema({
    workspace_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Workspace",
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    role: {
        type: String,
        required: true,
        default: AVAILABLE_ROLES_WORKSPACE_MEMBERS.MEMBER,
        enum: Object.values(AVAILABLE_ROLES_WORKSPACE_MEMBERS),
    },
});

const WorkspaceMembers = mongoose.model(
    "WorkspaceMember",
    workspaceMembersSchema
);

export default WorkspaceMembers;
