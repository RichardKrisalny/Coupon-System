package app.core.jwt;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUser extends JwtUtilAbstract<User, String> {
	ObjectMapper objectMapper = new ObjectMapper();
	@Override
	public String generateToken(User user) throws JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		String json = objectMapper.writeValueAsString(user);
		Map<String, Object> claims = new HashMap<>();
		claims.put("user", json);
		String token = this.createToken(claims, user.getEmail());
		return token;
	}

	@Override
	public User extractUser(String token) throws JwtException, JsonProcessingException {
		Claims claims = this.extractAllClaims(token);
//		String email = claims.getSubject();
//	    ClientType clientType = ClientType.valueOf(claims.get("ClientType", String.class));
		String a = claims.get("user", String.class);
//		System.out.println(a);
		User user = objectMapper.readValue(a, User.class);
		return user;
	}

}
