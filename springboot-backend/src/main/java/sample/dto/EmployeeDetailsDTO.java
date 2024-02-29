package sample.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDetailsDTO {
    private Long id;
    private String name;
    private String email;
    private int age;
    private double salary;
    private String cv;
    private String image;
    private String address;
    private Date birthday;
    private String gender;
    private String department;
}
