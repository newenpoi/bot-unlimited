/*
    Connection informations.
    This file is for development only.
*/

const { Sequelize } = require('sequelize');

class CustomSeq {
    constructor() {
        this.sequelize = new Sequelize('hatada', 'root', '', {
            host: 'localhost',
            dialect: 'mysql',
            logging: false,
        });
    }

    /**
     * 
     * @returns Sequelize Object
     */
    getSequelize() {
        return this.sequelize;
    }
}

module.exports = CustomSeq;