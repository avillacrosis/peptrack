import { SecurityGroup } from "./security.group.model";
import { Role } from "./role.model";

export class Employee {
    id?: string;
    email: string;
    employeeId: number;
    firstName: string;
    lastName: string;
    password: string;
    deleted: boolean;
    dateCreated: Date;
    dateModified: Date;
    status?: string;
    role: Role;
    securityGroup: SecurityGroup;

    constructor(
        id: string = '',
        email: string = '',
        firstName: string = '',
        lastName: string = '',
        password: string = '',
        status: string = 'Active',
        role: Role = new Role(),
        securityGroup: SecurityGroup = new SecurityGroup()
    ) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.status = status;
        this.role = role;
        this.securityGroup = securityGroup;
    }
}
