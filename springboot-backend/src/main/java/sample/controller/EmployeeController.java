package sample.controller;

import java.util.List;

import   sample.Entity.Employee;
import   sample.Sevice.EmployeeSevice;
import   sample.dto.EmployeeDTO;
import   sample.dto.EmployeeDetailsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import   sample.exception.*;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

	@Autowired
	EmployeeSevice employeeSevice;

	@GetMapping("/employees/find_page")
	public ResponseEntity<Page<EmployeeDTO>> getEmployees(@RequestParam(name = "page") int page,
														  @RequestParam(name = "size") int size){

		Pageable pageable = PageRequest.of(page, size);
		Page<EmployeeDTO> employeePage = employeeSevice.findPage(pageable);
		return ResponseEntity.ok(employeePage);
	}

	@GetMapping("/employees/getAll")
	public ResponseEntity<List<EmployeeDTO>> getAllEmployees(){
		return ResponseEntity.ok(employeeSevice.findAllPage());
	}

	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody EmployeeDetailsDTO employeeDetailsDTO) {
		if(employeeSevice.existsByEmail(employeeDetailsDTO.getEmail())) {
			throw new ResourceAlreadyExistException("Email already exist");
		}
		if(!employeeSevice.existsByDepartmentName(employeeDetailsDTO.getDepartment())) {
			throw new ResourceAlreadyExistException("Department not exist");
		}
		return employeeSevice.save(employeeDetailsDTO);
	}



	@GetMapping("/employees/find_by_name")
	public ResponseEntity<Page<EmployeeDTO>> getEmployeesByName(
			@RequestParam(name = "name") String name,
			@RequestParam(name = "page") int page,
			@RequestParam(name = "size") int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<EmployeeDTO> employeePage = employeeSevice.findByNameContaining(name, pageable);
		if(employeePage.isEmpty()) {
            throw new ResourceNotFoundException("Employee not found");
		}
        return ResponseEntity.ok(employeePage);
	}

	@GetMapping("/employees/{id}")
	public ResponseEntity<EmployeeDetailsDTO> getDetailEmployee(@PathVariable Long id) {
		EmployeeDetailsDTO employee = employeeSevice.findById(id);
		if(employee == null) {
			throw new ResourceNotFoundException("Employee not found");
		}
		return ResponseEntity.ok(employee);
	}

//	@PutMapping("/employees/{id}")
//	public ResponseEntity<EmployeeDetailsDTO> updateEmployee(@PathVariable Long id, @RequestBody EmployeeDetailsDTO employeeDetails){
//		EmployeeDetailsDTO employee = employeeSevice.findById(id);
//		if(employee == null) {
//			throw new ResourceNotFoundException("Employee not found");
//		}
//		employee = employeeSevice.save(employeeDetails);
//	}
//
//	@DeleteMapping("/employees/{id}")
//	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
//		Employee employee = employeeRepository.findById(id)
//				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
//
//		employeeRepository.delete(employee);
//		Map<String, Boolean> response = new HashMap<>();
//		response.put("deleted", Boolean.TRUE);
//		return ResponseEntity.ok(response);
//	}
//
	
}
