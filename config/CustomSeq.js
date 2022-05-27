/*
    Author : Newen
    Contributors : 
    
    Connection informations.
    This file is for development only.
*/

const { Sequelize } = require('sequelize');

/**
 * This class should be used as a Singleton.
 * No really, I mean it, we can't specifiy private on our constructor, it's not TypeScript!
 */
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
    static getSequelize() {
        if (!this.instance) {
            this.instance = new this();
        }

        return this.instance.sequelize;
    }
}

module.exports = CustomSeq;