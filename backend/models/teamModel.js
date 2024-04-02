import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  team_id: { type: Number },
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [
    {
      name: { type: String, required: true },
      domain: { type: String, required: true }
    }
  ],
  member_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Team = mongoose.model('Team', teamSchema);

export default Team;