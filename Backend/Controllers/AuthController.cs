using Backend.Contracts;
using Backend.Model;
using Backend.Repository;
using Backend.Services.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthService authService, IConfiguration configuration, IUserRepository userRepository, ILogger<AuthController> logger)
        {
            _authService = authService;
            _configuration = configuration;
            _userRepository = userRepository;
            _logger = logger;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<RegistrationResponse>> Register(RegistrationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userRole = _configuration["RoleSettings:UserRole"];
            var result = await _authService.RegisterAsync(request.Email, request.UserName, request.Password,
                request.BirthDate, request.Address, userRole!);
            if (!result.Success)
            {
                AddErrors(result);
                return BadRequest(ModelState);
            }

            return CreatedAtAction(nameof(Register), new RegistrationResponse(result.Email, result.UserName));
        }

        [HttpPost("Login")]
        public async Task<ActionResult<AuthResponse>> Authenticate([FromBody] AuthRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _authService.LoginAsync(request.Email, request.Password);
            if (!result.Success)
            {
                AddErrors(result);
                return BadRequest(ModelState);
            }

            return Ok(new AuthResponse(result.Email, result.UserName, result.Token));
        }

        [Authorize]
        [HttpGet("GetUserByEmail/{userEmail}")]
        public async Task<ActionResult<ApplicationUser>> GetUserByEmail(string userEmail)
        {
            try
            {
                var user = await _userRepository.GetUserByEmailAsync(userEmail);
                if (user == null)
                {
                    return NotFound("No user found in database");
                }

                return Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest("Error with finding user by email");
            }
        }

        [HttpPatch("UpBalance")]
        public async Task<IActionResult> UpBalanceAsync([FromBody] UpBalanceRequest request)
        {
            Console.WriteLine(request.Email);
            var success = await _userRepository.UpdateBalanceAsync(request.Email, request.Balance);

            if (success)
            {
                return Ok("Balance updated successfully");
            }
            else
            {
                return BadRequest("Failed to update balance");
            }
        }

        [HttpDelete("DeleteTestUser")]
        public async Task<IActionResult> DeleteUserByEmailAsync()
        {
            try
            {
                var userToDelete = await _userRepository.GetUserByEmailAsync("test3@test.com");
                Console.WriteLine($"USER TO DELETE EMAIL {userToDelete.Email}");
                if (userToDelete == null)
                {
                    _logger.LogError("Couldn't find test user in the database");
                    return NotFound("No test user found in database");
                }

                await _userRepository.DeleteUserAsync(userToDelete);
                return Ok("Test user successfully deleted");
            }
            catch (Exception e)
            {
                _logger.LogError("Error with deleting test user, {exception}", e);
                return BadRequest("Error with deleting test user");
            }
        }

        [Authorize(Roles = "User, Admin")]
        [HttpPatch("DeactivateAccount")]
        public async Task<ActionResult<DeactivationResponse>> Deactivate([FromBody] AuthRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _authService.DeactivateAsync(request.Email, request.Password);
            if (!result.Success)
            {
                AddErrors(result);
                return BadRequest(ModelState);
            }

            return Ok(new DeactivationResponse(result.UserName));
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch("ActivateAccount")]
        public async Task<ActionResult<ActivationResponse>> Activate([FromBody] AuthRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _authService.ActivateAsync(request.Email, request.Password);
            if (!result.Success)
            {
                AddErrors(result);
                return BadRequest(ModelState);
            }

            return Ok(new ActivationResponse(result.UserName));
        }

        private void AddErrors(AuthResult result)
        {
            foreach (var error in result.ErrorMessages)
            {
                ModelState.AddModelError(error.Key, error.Value);
            }
        }
    }
}
