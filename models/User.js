/*
	Author : Newen

    @Table [User]
*/

const { Sequelize } = require('sequelize');
const CustomSeq = require('../config/CustomSeq.js');

const user = CustomSeq.getSequelize().define('user', {
	ID: {
		type: Sequelize.BIGINT.UNSIGNED,
		primaryKey: true,
	},
	Name: {
		type: Sequelize.STRING(32),
		unique: true,
		allowNull: false,
	},
	Gold: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 500,
	},
	Tick: {
		type: 'TIMESTAMP',
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
		allowNull: false,
	},
}, {timestamps: false});

module.exports = user;
