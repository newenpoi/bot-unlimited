/*
	Author : Newen

    @Table [Role]
*/

const { Sequelize } = require('sequelize');
const CustomSeq = require('../config/CustomSeq.js');

const role = CustomSeq.getSequelize().define('role', {
	ID_Role: {
		type: Sequelize.BIGINT.UNSIGNED,
		primaryKey: true,
	},
	ID_Server: {
		type: Sequelize.BIGINT.UNSIGNED,
		allowNull: false,
	},
	ID_Channel: {
		type: Sequelize.BIGINT.UNSIGNED,
		allowNull: false,
	},
	ID_Message: {
		type: Sequelize.BIGINT.UNSIGNED,
		allowNull: false,
	},
	Emoji: {
		type: Sequelize.STRING(32),
		allowNull: false,
	},
}, {timestamps: false});

module.exports = role;
