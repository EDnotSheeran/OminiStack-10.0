const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs);
    },
    async store(request, response){
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev){
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        const { name = github_username, avatar_url, bio} = apiResponse.data;
        
        const techsArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        dev = await Dev.create({
            name,
            github_username,
            bio,
            avatar_url,
            techs: techsArray,
            location,
        });
    }
    
        return response.json(dev);
    },
    async update(request, response){
        // console.log(request.body);
        const { github_username } = request.query;
        const {name, bio, avatar_url, techs, latitude, longitude } = request.body;
        
        const devBefore = await Dev.findOne({ github_username });

        const location = {
            type: "Point",
            coordinates: [longitude, latitude],
        };
        
        await Dev.update(
            {"github_username":github_username},
            {
                $set:{
                    "name": name,
                    "bio": bio,
                    "avatar_url": avatar_url,
                    "techs": techs,
                    "location": location
                }
            },
        );
        const devAfter = await Dev.findOne({ github_username });
        
        return response.json({ before: devBefore, after: devAfter });
    },
    async destroy(request, response){
        const { github_username } = request.query;
        await Dev.deleteOne({ github_username });
        return response.json({ status:1});
    }
}