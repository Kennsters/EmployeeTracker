const { prompt } = require('inquirer')
const mysql = require('mysql2')
require('console.table')

const db = mysql.createConnection('mysql://root:K33nnyishere@localhost/employee_db')

const mainMenu = () => {
    prompt([
        {
            type: 'list',
            name: 'type',
            choices: ['Add Department', 'Add a Role', 'Add an Employee', 'View All Employees By Department', 'View All Employees By Roles', 'View All Employees', 'Update Employee Roles', 'Finish'],
            message: 'What would you like to do?'
        }
    ])
        .then(res => {
            switch (res.type) {
                case 'Add Deparment':
                    addDepartment()
                    break
                case 'Add a Role':
                    addRole()
                    break
                case 'Add an Employee':
                    addEmployee()
                    break
                case 'View All Employees By Department':
                    viewAllD()
                    break
                case 'View All Employees By Roles':
                    viewAllR()
                    break
                case 'View All Employees':
                    viewAll()
                    break
                case 'Update Employee Roles':
                    updateR()
                    break
                case 'Finish':
                    finish()
                    break
            }
        })
        .catch(err => console.log(err))
}

const addDepartment = () => {
    prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the department name'
        }
    ])
        .then(department => {
            db.query('INSERT INTO deparment SET ?', department, (err) => {
                if (err) {
                    console.log(err)
                } console.log('Department Created!')
                mainMenu()
            })
        })
}

const addRole = () => {
    prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the role of the employee?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this position?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department id number?'
        }
    ])
        .then(role => {
            db.query('INSERT INTO role SET ?', role, (err) => {
                if (err) { console.log(err) }
                console.log('role created')
                mainMenu()
            })
        })
        .catch(err => { console.log(err) })
}


const addEmployee = () => {
    db.query('SELECT * FROM role', (err, roles) => {
        if (err) {
            console.log(err)
        }

        roles = roles.map(role => ({
            name: role.title,
            value: role.id
        }))

        db.query('SELECT * FROM employee', (err, employees) => {

            employees = employees.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }))

            employees.unshift({ name: 'None', value: null })

            prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the employee first name?'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the employee last name?'
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Choose a role for the employee:',
                    choices: roles
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Choose a manager for the employee:',
                    choices: employees
                }
            ])
                .then(employee => {
                    db.query('INSERT INTO employee SET ?', employee, (err) => {
                        if (err) { 
                            console.log(err) 
                        }
                        console.log('Employee Created!')
                        mainMenu()
                    })
                })
                .catch(err => console.log(err))
        })
    })
}

const viewAllD = () => {
    db.query(`
        SELECT * FROM department
    `, (err, departments) => {
        if (err) {
            console.log(err)
        }
        console.table(departments)
    })
}

const viewAllR = () => {
    db.query(`
        SELECT * FROM role
    `, (err, roles) => {
        if (err) {
            console.log(err)
        }
        console.table(roles)
    })
}


const viewAll = () => {
    db.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee
        LEFT JOIN role 
        ON employee.role_id = role.id
        LEFT JOIN department 
        ON role.department_id = department.id
        LEFT JOIN employee manager
        ON manager.id = employee.manager_id
    `, (err, employees) => {
        if (err) {
            console.log(err)
        } console.table(employees)
        mainMenu()
    })
}

const updateR = () => {

}

const finish = () => {

}

mainMenu()