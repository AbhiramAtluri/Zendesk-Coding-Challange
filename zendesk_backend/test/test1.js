const assert = require("chai").assert
const app = require("../app")
const chai = require("chai")
chai.use(require("chai-http"))
const expect = require("chai").expect;
const agent = require("chai").request.agent(app)
let constants = require('../routes/Consts')
const server =constants.Consts.host

describe("Initial tickets test",function()
{
    it("Succesfully pulled initial Tickets",(done)=>
    {
        chai.request(server)
        .get("/")
        .end(function(err,res)
        {   
            console.log(res.body)
            assert.exists(res.body.status)
            expect(res.body.status).equals(200)
            done()
        })
    }
    )
})

describe("Pagination Test 1",()=>
{
      it("Getting null when requesting prev on first 25 tickets",function(done)
      {
          chai.request(server)
          .get("/")
          .end(function(err,res)
          {     
                chai.request(`${server}`)
                .get(`/before/${res.body.prev}`)
                .end(function(err,resp)
                {
                    expect(resp.body.prev).to.equal(null)
                    done()
                })

          })
         
      })
}
)


describe("Pagination Test 2",()=>
{
      it("Successfully pulled next 25 tickets",function(done)
      {
          chai.request(server)
          .get("/")
          .end(function(err,res)
          {     
                chai.request(`${server}`)
                .get(`/after/${res.body.next}`)
                .end(function(err,resp)
                {
                    expect(res.body.ticketlist).to.have.lengthOf(25)
                    done()
                })

          })
         
      })
}
)

describe("Pagination Test 3",()=>
{
      it("Successfully pulled previous cursor",function(done)
      {
          chai.request(server)
          .get("/")
          .end(function(err,res)
          {     

                chai.request(`${server}`)
                .get(`/before/${res.body.next}`)
                .end(function(err,resp)
                {
                    
                    chai.request(server)
                    .get("/")
                    .end(function(err,resp)
                    {
                         expect(resp.body.ticketlist).to.have.lengthOf(25)
                         expect(resp.body.next).to.be.a('string')
                         done()
                        
                    }
                    ) 
                
                })

          })
         
      })
}
)






