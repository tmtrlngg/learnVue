const profile = require('../config/db.profile');

module.exports = {
    url: `mongodb+srv://${profile.name}:${profile.password}@cluster1.nwldfvp.mongodb.net/vuestore?retryWrites=true&w=majority&appName=Cluster1`
}