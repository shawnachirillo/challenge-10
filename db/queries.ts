// db/queries.ts
import { pool } from './connection.js';

// ========== DEPARTMENTS ==========

export const getDepartments = async () => {
  const res = await pool.query('SELECT * FROM department');
  return res.rows;
};

export const addDepartment = async (name: string) => {
  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

// ========== ROLES ==========

export const getRoles = async () => {
  const res = await pool.query(`
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  return res.rows;
};

export const addRole = async (title: string, salary: number, departmentId: number) => {
  await pool.query(
    'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
    [title, salary, departmentId]
  );
};

// ========== EMPLOYEES ==========

export const getEmployees = async () => {
  const res = await pool.query(`
    SELECT e.id, e.first_name, e.last_name, r.title AS job_title, d.name AS department,
           r.salary, m.first_name AS manager
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id
  `);
  return res.rows;
};

export const addEmployee = async (
  firstName: string,
  lastName: string,
  roleId: number,
  managerId: number | null
) => {
  await pool.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [firstName, lastName, roleId, managerId]
  );
};

export const updateEmployeeRole = async (employeeId: number, roleId: number) => {
  await pool.query(
    'UPDATE employee SET role_id = $1 WHERE id = $2',
    [roleId, employeeId]
  );
};
