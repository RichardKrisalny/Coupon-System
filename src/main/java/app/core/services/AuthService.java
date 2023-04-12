package app.core.services;


import app.core.entites.Company;
import app.core.entites.Customer;
import app.core.jwt.ClientType;
import app.core.jwt.JwtUser;
import app.core.jwt.User;
import app.core.jwt.UserCredentials;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.security.auth.login.LoginException;
import javax.security.auth.message.AuthException;
import java.util.Objects;

@Service
@Transactional
public class AuthService extends ClientService {
	@Value("${admin.email}")
	private String EMAIL;
	@Value("${admin.password}")
	private String PASSWORD;
	@Autowired
	private JwtUser jwtUser;
	@Autowired
	private User user;


	public String login(UserCredentials userCredentials) throws LoginException, JsonProcessingException {
		switch (userCredentials.getClientType()) {
			case COMPANY:
				Company company = companyRepo.findByEmailAndPassword(userCredentials.getEmail(), userCredentials.getPassword()).orElseThrow(() -> new AuthException("loging failed - company with email " + userCredentials.getEmail() + " not found"));
				user.setEmail(company.getEmail());
				user.setClientType(ClientType.COMPANY);
				user.setName(company.getName());
				return this.jwtUser.generateToken(user);
			case CUSTOMER:
				Customer customer = customerRepo.findByEmailAndPassword(userCredentials.getEmail(), userCredentials.getPassword()).orElseThrow(() -> new AuthException("loging failed - customer with email " + userCredentials.getEmail() + " not found"));
				user.setEmail(customer.getEmail());
				user.setName(customer.getFirstName()+"  "+customer.getLastName());
				user.setClientType(ClientType.CUSTOMER);
				return jwtUser.generateToken(user);
			case ADMINISTRATOR:
				if (Objects.equals(userCredentials.getEmail(), EMAIL) && Objects.equals(userCredentials.getPassword(), PASSWORD)){
					user.setEmail(userCredentials.getEmail());
					user.setClientType(ClientType.ADMINISTRATOR);
					user.setName("Admin");
					return jwtUser.generateToken(user);
				}else throw new AuthException("login failed - admin credentials illegal");
		}
		throw new AuthException("login failed");

	}
}



