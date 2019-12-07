class Welcome {
    constructor(agent) {
        this.agent = agent;
    } 

    async sendResponse() {
        console.log(this.agent)
    }
}

module.exports = Welcome;
