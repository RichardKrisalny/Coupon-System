package app.core.controllers;
import app.core.jwt.UserCredentials;
import app.core.services.AuthService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.security.auth.login.LoginException;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/login")
	public String login(@RequestBody UserCredentials userCredentials) {

		try {
			return this.authService.login(userCredentials);
		} catch (LoginException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
	}
}
