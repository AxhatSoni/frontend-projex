const express = require('express');
const Team = require('../models/Team');
const User = require('../models/User');
const router = express.Router();

router.post('/createOrJoin', async (req, res) => {
    const { teamName, username } = req.body;

    try {
        let team = await Team.findOne({ name: teamName });
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        let memberUsers = [];
        for(let member of members) {
            let memberUser = await User.findOne({username: member});
            if(!memberUser) {
                return res.status(400).json({msg: 'User ${member} does not exist'});
            }
            memberUsers.push(memberUser._id);
        }

        if (team) {
            if (team.members.includes(user._id)) {
                return res.status(400).json({ msg: 'You are already a member of this team' });
            }
            team.members.push(user._id);
        } else {
            team = new Team({ name: teamName, members: [user._id] });
        }

        await team.save();

        res.json({ msg: 'Successfully joined/created the team' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;