package sample.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "employees")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_employee")
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "email")
	private String email;

	@Column(name = "age")
	private int age;

	@Column(name = "salary")
	private double salary;

	@Column(name = "cv")
	private String cv;

	@Column(name = "image")
	private String image;

	@Column(name = "address")
	private String address;

	@ManyToOne
	@JoinColumn(name = "id_department", nullable = false)
	private Department department;

	@Column(name = "birthday")
	private Date birthday;

	@Column(name = "gender")
	private String gender;

}
