// src/index.ts
import inquirer from 'inquirer';
import consoleTable from 'console.table';
import {
  getDepartments,
  addDepartment,
  getRoles,
  addRole,
  getEmployees,
  addEmployee,
  updateEmployeeRole,
} from '../db/queries.js';

const main = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select an option:',
      choices: [
        'View all departments',
        'Add a department',
        'View all roles',
        'Add a role',
        'View all employees',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    },
  ]);

  switch (action) {
    case 'View all departments':
      console.table(await getDepartments());
      break;
    case 'Add a department': {
      const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter department name:',
      });
      await addDepartment(name);
      console.log('✅ Department added.');
      break;
    }
    case 'View all roles':
      console.table(await getRoles());
      break;
    case 'Add a role': {
      const { title, salary, departmentId } = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Role title:' },
        { type: 'number', name: 'salary', message: 'Salary:' },
        { type: 'number', name: 'departmentId', message: 'Department ID:' },
      ]);
      await addRole(title, salary, departmentId);
      console.log('✅ Role added.');
      break;
    }
    case 'View all employees':
      console.table(await getEmployees());
      break;
    case 'Add an employee': {
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        { type: 'input', name: 'firstName', message: 'First name:' },
        { type: 'input', name: 'lastName', message: 'Last name:' },
        { type: 'number', name: 'roleId', message: 'Role ID:' },
        { type: 'number', name: 'managerId', message: 'Manager ID (or leave blank):', default: null },
      ]);
      await addEmployee(firstName, lastName, roleId, managerId || null);
      console.log('✅ Employee added.');
      break;
    }
    case 'Update an employee role': {
      const { employeeId, newRoleId } = await inquirer.prompt([
        { type: 'number', name: 'employeeId', message: 'Enter employee ID to update:' },
        { type: 'number', name: 'newRoleId', message: 'Enter new role ID:' },
      ]);
      await updateEmployeeRole(employeeId, newRoleId);
      console.log('✅ Employee role updated.');
      break;
    }
    case 'Exit':
      process.exit();
  }

  main(); // Loop again
};

main();
