package app.core.repositories;

import app.core.entites.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepo extends JpaRepository<Company,Integer> {

    Optional<Company> findByEmailAndPassword(String email, String password);

    Optional<Company> findByEmail(String email);
   boolean existsByEmailOrName(String email,String name);

}
