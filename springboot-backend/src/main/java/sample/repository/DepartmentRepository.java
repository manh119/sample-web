package sample.repository;

import sample.Entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long>{
    boolean existsByDepartmentName(String departmentName);

    Department findByDepartmentName(String department);
}
