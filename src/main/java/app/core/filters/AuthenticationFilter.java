package app.core.filters;


import app.core.jwt.JwtUser;
import app.core.jwt.User;
import org.springframework.http.HttpStatus;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.StringTokenizer;

public class AuthenticationFilter implements Filter {

	private JwtUser jwtUser;

	public AuthenticationFilter(JwtUser jwtUser) {
		super();
		this.jwtUser = jwtUser;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
//		System.out.println("\n--- authentication filter started");
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		String requestMethod = httpRequest.getMethod();
		if (requestMethod.equalsIgnoreCase("options")) {
//			System.out.println("--- PREFLIGHT (authentication filter)");
			chain.doFilter(request, response);
		} else {
			try {
				String authorization = httpRequest.getHeader("Authorization");
//				System.out.println("==================== token: " +authorization);
				StringTokenizer tokenizer = new StringTokenizer(authorization);
				String scheme = tokenizer.nextToken(); // Bearer
				String token = tokenizer.nextToken(); // the JWT: aaa.bbb.ccc
//				System.out.println("---------- " + scheme);
				User user = this.jwtUser.extractUser(token);
//				System.out.println("--- " + user);
				httpRequest.setAttribute("user", user);
				chain.doFilter(request, response);
			} catch (Exception e) {
//				e.printStackTrace();
//				System.out.println("--- invalid token: " + e);
				HttpServletResponse resp = (HttpServletResponse) response;
				resp.setHeader("Access-Control-Allow-Origin", "*"); // for CORS
				resp.setHeader("WWW-Authenticate", "Bearer realm=\"General API\"");
				resp.setHeader("Access-Control-Expose-Headers", "*");
				resp.sendError(HttpStatus.UNAUTHORIZED.value(), "You need to login - " + e.getMessage());
			}
		}
//		System.out.println("--- authentication filter is done");
	}

}
