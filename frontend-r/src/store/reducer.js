import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  team: {
    team_id: null,
    name: '',
    description: '',
    members: [], // Updated to contain objects with username and domain fields
    member_id: [], // New array to store member IDs
  },
  showModal: false,
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeam(state, action) {
      state.team = action.payload;
    },
    updateTeamMember(state, action) {
      const { memberId, updatedMember } = action.payload;
      const memberIndex = state.team.members.findIndex(
        (member) => member.member_id === memberId
      );
      if (memberIndex !== -1) {
        state.team.members[memberIndex] = updatedMember;
      }
    },
    addTeamMember(state, action) {
      const newMember = action.payload;
      state.team.members.push({
        name:newMember.name,
        domain:newMember.domain
      });
      state.team.member_id.push(newMember._id);
    },
    removeTeamMember(state, action) {
      const memberId = action.payload;
      const memberIndex = state.team.members.findIndex(
        (member) => member.member_id === memberId
      );
      if (memberIndex !== -1) {
        state.team.members.splice(memberIndex, 1);
        state.team.member_id.splice(memberIndex, 1);
      }
    },
    toggleModal(state) {
      state.showModal = !state.showModal;
    },
  },
});

export const {
  setTeam,
  updateTeamMember,
  addTeamMember,
  removeTeamMember,
  toggleModal,
} = teamSlice.actions;

export default teamSlice.reducer;
