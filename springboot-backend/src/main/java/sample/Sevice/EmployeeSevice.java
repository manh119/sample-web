package sample.Sevice;

import sample.Entity.Employee;
import sample.dto.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sample.repository.DepartmentRepository;
import sample.repository.EmployeeRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeSevice {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private final ModelMapper mapper;

    public EmployeeSevice(ModelMapper mapper) {
        this.mapper = mapper;
    }

    private EmployeeDTO mapToEmployeeDTO(Employee employee) {
        EmployeeDTO employeeDTO = mapper.map(employee, EmployeeDTO.class);
        if (employee.getDepartment() != null) {
            employeeDTO.setDepartment(employee.getDepartment().getDepartmentName());
        }
        return employeeDTO;
    }

    private EmployeeDetailsDTO mapToEmployeeDetailsDTO(Employee employee) {
        EmployeeDetailsDTO employeeDTO = mapper.map(employee, EmployeeDetailsDTO.class);
        if (employee.getDepartment() != null) {
            employeeDTO.setDepartment(employee.getDepartment().getDepartmentName());
        }
        return employeeDTO;
    }

    // constrain : existsByDepartmentName is true
    private Employee mapToEmployee(EmployeeDetailsDTO employeeDetailsDTO) {
        if (employeeDetailsDTO == null) {
            return null;
        }
        Employee employee = new Employee();
        employee.setId(employeeDetailsDTO.getId());
        employee.setName(employeeDetailsDTO.getName());
        employee.setEmail(employeeDetailsDTO.getEmail());
        employee.setAge(employeeDetailsDTO.getAge());
        employee.setSalary(employeeDetailsDTO.getSalary());
        employee.setCv(employeeDetailsDTO.getCv());
        employee.setImage(employeeDetailsDTO.getImage());
        employee.setAddress(employeeDetailsDTO.getAddress());
        employee.setBirthday(employeeDetailsDTO.getBirthday());
        employee.setGender(employeeDetailsDTO.getGender());
        employee.setDepartment(departmentRepository.findByDepartmentName(employeeDetailsDTO.getDepartment()));
        return employee;
    }


    public List<EmployeeDTO> findAllPage() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
                .map(this::mapToEmployeeDTO)
                .collect(Collectors.toList());
    }

    public Page<EmployeeDTO> findPage(Pageable pageable) {
        Page<Employee> employees = employeeRepository.findAll(pageable);
        return employees.map(this::mapToEmployeeDTO);
    }

    public Page<EmployeeDTO> findByNameContaining(String name, Pageable pageable) {
        Page<Employee> employees = employeeRepository.findByNameContaining(name, pageable);
        return employees.map(this::mapToEmployeeDTO);
    }

    public EmployeeDetailsDTO findById(Long id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isPresent()) {
            return mapToEmployeeDetailsDTO(employee.get());
        }
        return null;
    }

    // validate email is unique
    public Employee save(EmployeeDetailsDTO employee) {
        return employeeRepository.save(mapToEmployee(employee));
    }

    public boolean existsByDepartmentName(String department) {
        return departmentRepository.existsByDepartmentName(department);
    }

    public boolean existsByEmail(String email) {
        return employeeRepository.existsByEmail(email);
    }
}
