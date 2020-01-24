const validateKey = function(req,res,next){
  if(req.header("auth-client")==="CLIENT_KEY_HERE"){next()}
  else{res.status(401).send({message:"invalid auth key"})}
}

module.exports={validateKey}
