import { SecurityGroup } from "./security.group.model";
import { Role } from "./role.model";

export interface Employee {
    key: string;
    email: string;
    employeeId: number;
    firstName: string;
    lastName: string;
    password: string;
    status: string;
    type: string;
    role: Role;
    securityGroup: SecurityGroup;
    permissions?: Permission[]; /* Temporarily set to Optional to test login */
}
