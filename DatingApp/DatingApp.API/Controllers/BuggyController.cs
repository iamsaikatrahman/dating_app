using DatingApp.API.Data;
using DatingApp.API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly ApplicationDbContext _dbContext;
        public BuggyController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [Authorize]
        [HttpGet]
        public ActionResult<string> GetSecret() 
        {
            return "secret text";
        }
        
        [HttpGet]
        public ActionResult<AppUser> GetNotFound() 
        {
            var thing = _dbContext.Users.Find(-1);
            if(thing == null) return NotFound();
            return Ok(thing);
        }
        
        [HttpGet]
        public ActionResult<string> GetServerError() 
        {
          
                var thing = _dbContext.Users.Find(-1);
                var thingToReturn = thing.ToString();
                return thingToReturn;
            
        }

        [HttpGet]
        public ActionResult<string> GetBadRequest() 
        {
            return BadRequest("This was not a good request");
        }
    }
}
