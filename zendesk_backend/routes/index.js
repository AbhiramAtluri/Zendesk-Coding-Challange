var express = require('express');
var router = express.Router();

//Importing axios to make API calls
const axios = require('axios');


// Fetching next and previous pages
router.get('/:action/:next',function (req,res,next)
{
  let size = "page[size]=25"
  var auth = Buffer.from(process.env.USERNAME1 + ':' + process.env.PASSWORD1).toString('base64');
  header={ headers:{
    Authorization: `Basic ${auth}`
  }}
  axios.get(process.env.URI+size+`&page[${req.params.action}]=${req.params.next}`,header)
  .then(resp=>
    {
      let ticketlist = [...(resp.data.tickets)].map((ele)=>{
        return{
          "id":ele.id,
          "subject":ele.subject,
          "description":ele.description,
          "status":ele.status,
          "requester_id":ele.requester_id,
          "submitter_id":ele.submitter_id,
          "assignee_id":ele.assignee_id,
          "organization_id":ele.organization_id
        }
      })


      res.status(200).json({
        ticketlist:ticketlist,
        next:resp.data.meta.after_cursor,
      prev:resp.data.meta.before_cursor,
      status:200
        })
    }).catch(err=>{
    
           res.status(500).json({error:err,status:500})
    })

  
})


/* GET home page. */
router.get('/', function (req, res, next) {
  /**
   * Setting authorization method in header
   */
 let size = "page[size]=25" 
  var auth = Buffer.from(process.env.USERNAME1 + ':' + process.env.PASSWORD1).toString('base64');

   header={ headers:{
      Authorization: `Basic ${auth}`
    }}
  axios.get(process.env.URI+size,header).then((resp) => {

    let ticketlist = [...(resp.data.tickets)].map((ele)=>{
      return{
        "id":ele.id,
        "subject":ele.subject,
        "description":ele.description,
        "status":ele.status,
        "requester_id":ele.requester_id,
        "submitter_id":ele.submitter_id,
        "assignee_id":ele.assignee_id,
        "organization_id":ele.organization_id,
        "Created_at":ele.created_at
      }
    })
    
    res.json({
         ticketlist:ticketlist,
         next:resp.data.meta.after_cursor,
         prev:resp.data.meta.before_cursor,
         status:200
    }).status(200)
    
  })
    .catch(
      err => {
        if(err.response.status == 401)
      {
        res.send({message:"Couldn't authenticate you",status:500})
      }else
      {
        res.send({message:"Something went wrong",status:500})
      }

       }
      )
});

module.exports = router;
