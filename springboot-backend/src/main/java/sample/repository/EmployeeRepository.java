package sample.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sample.Entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{
    Page<Employee> findByNameContaining(String name, Pageable pageable);

    boolean existsByEmail(String email);
}
