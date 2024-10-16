const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Allow credentials (cookies, sessions)
};

app.use(cors(corsOptions));

const session = require('express-session');

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
    }
}));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Harsh@1234',
    database: 'IET_PROJECT'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get("/", (req, res)=>{
    res.send("Helo, Team Memeber's")
})


// Register Hospital Endpoint
app.post('/register-hospital', (req, res) => {
    const { name, location, contact_number, email, password, type } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = `INSERT INTO hospitals (name, location, contact_number, email, password, type)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [name, location, contact_number, email, hashedPassword, type], (err, results) => {
        if (err) {
            console.error('Error registering hospital:', err);
            return res.status(500).json({ error: 'Failed to register hospital' });
        }
        res.status(201).json({ message: 'Hospital registered successfully' });
    });
});

// Login Hospital Endpoint
app.post('/login-hospital', (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM hospitals WHERE email = ?`;
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error fetching hospital:', err);
            return res.status(500).json({ error: 'Failed to login' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Hospital not found' });
        }

        const hospital = results[0];
        const isPasswordMatch = bcrypt.compareSync(password, hospital.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Password matches, login successful
        res.status(200).json({ message: 'Login successful', hospitalId: hospital.id });

    });
});


// Add Donor Endpoint
app.post('/add-donor', (req, res) => {
    const { full_name, aadhar_no, dob, gender, address, blood_type, last_donation, donation_type_history, available_for_stem_cell, CMV_status, HLA_typing, contact_number, email, registered_by } = req.body;

    const query = `INSERT INTO donors (full_name, aadhar_no, dob, gender, address, blood_type, last_donation, donation_type_history, available_for_stem_cell, CMV_status, HLA_typing, contact_number, email, registered_by)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [full_name, aadhar_no, dob, gender, address, blood_type, last_donation, donation_type_history, available_for_stem_cell, CMV_status, HLA_typing, contact_number, email, registered_by], (err, results) => {
        if (err) {
            console.error('Error adding donor:', err);
            return res.status(500).json({ error: 'Failed to add donor' });
        }
        res.status(201).json({ message: 'Donor added successfully' });
    });
});

// Example: Automatically assign donor based on some criteria
const determineHospitalId = (donorLocation) => {
    // Implement your logic to determine the hospital ID
    return 1; // Example hospital ID
};

app.post('/register-donor', (req, res) => {
    const { full_name, aadhar_no, dob, gender, address, blood_type, last_donation, donation_type_history, available_for_stem_cell, CMV_status, HLA_typing, contact_number, email, password } = req.body;
    
    // Determine the hospital ID
    const registered_by = determineHospitalId(address); 

    const query = `INSERT INTO donors (full_name, aadhar_no, dob, gender, address, blood_type, last_donation, donation_type_history, available_for_stem_cell, CMV_status, HLA_typing, contact_number, email, password, registered_by)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [full_name, aadhar_no, dob, gender, address, blood_type, last_donation, donation_type_history, available_for_stem_cell, CMV_status, HLA_typing, contact_number, email, password, registered_by], (err, results) => {
        if (err) {
            console.error('Error registering donor:', err);
            return res.status(500).json({ error: 'Failed to register donor' });
        }
        res.status(201).json({ message: 'Donor registered successfully' });
    });
});

app.get('/hospitals', (req, res) => {
    const query = 'SELECT id, name FROM hospitals';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching hospitals:', err);
            return res.status(500).json({ error: 'Failed to fetch hospitals' });
        }
        res.status(200).json({ hospitals: results });
    });
});


// Donor Login

app.post('/donor-login', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const query = 'SELECT id, full_name FROM donors WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to login' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email' });
        }

        const donor = results[0];

        // Set donorid in session
        req.session.donorid = donor.id;

        res.status(200).json({
            message: 'Login successful',
            donorid: donor.id,
            fullName: donor.full_name
        });
    });
});

app.get('/donor-history/:id', (req, res) => {
    const { id } = req.params;

    const query = `SELECT * FROM donors WHERE id = ?`;
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching donor details:', err);
            return res.status(500).json({ error: 'Failed to fetch donor details' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Donor not found' });
        }

        res.status(200).json(results[0]);
    });
});



app.get('/blood-banks', (req, res) => {
    const query = 'SELECT * FROM blood_banks';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching blood banks:', err);
            return res.status(500).json({ error: 'Failed to fetch blood banks' });
        }
        res.json(results);
    });
});

// Inside your Express.js app file

// Add a POST endpoint for donor registration

   

// Inside your Express.js app file

// Add a POST endpoint for donor registration
app.post('/hospital-donor-register', (req, res) => {
    const {
        full_name,
        aadhar_no,
        dob,
        gender,
        address,
        blood_type,
        last_donation,
        donation_type_history,
        available_for_stem_cell,
        CMV_status,
        HLA_typing,
        contact_number,
        email,
        password,
        hospitalId  // ID of the hospital adding the donor
    } = req.body;

    const query = `
        INSERT INTO donors (
            full_name, aadhar_no, dob, gender, address, blood_type, last_donation, donation_type_history,
            available_for_stem_cell, CMV_status, HLA_typing, contact_number, email, password, registered_by
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [
        full_name, aadhar_no, dob, gender, address, blood_type, last_donation, donation_type_history,
        available_for_stem_cell, CMV_status, HLA_typing, contact_number, email, password, hospitalId
    ], (err, result) => {
        if (err) {
            console.error('Error adding donor:', err);
            return res.status(500).json({ error: 'Failed to add donor' });
        }

        // Retrieve the hospital name
        const hospitalQuery = 'SELECT name FROM hospitals WHERE id = ?';
        db.query(hospitalQuery, [hospitalId], (err, hospitalResult) => {
            if (err) {
                console.error('Error retrieving hospital name:', err);
                return res.status(500).json({ error: 'Failed to retrieve hospital name' });
            }
            res.json({ message: 'Donor added successfully', hospitalName: hospitalResult[0].name });
        });
    });
});

// Add a GET endpoint to retrieve donor details
app.get('/donors/:hospitalId', (req, res) => {
    const hospitalId = req.params.hospitalId;

    const query = `
        SELECT donors.*, hospitals.name AS hospital_name
        FROM donors
        JOIN hospitals ON donors.registered_by = hospitals.id
        WHERE registered_by = ?
    `;

    db.query(query, [hospitalId], (err, results) => {
        if (err) {
            console.error('Error fetching donors:', err);
            return res.status(500).json({ error: 'Failed to fetch donors' });
        }

        res.json(results);
    });
});
// Add other endpoints as needed...

app.get('/DonorDetails/:id', (req, res) => {
    const { id } = req.params;

    const query = `SELECT * FROM donors WHERE id = ?`;
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching donor details:', err);
            return res.status(500).json({ error: 'Failed to fetch donor details' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Donor not found' });
        }

        res.status(200).json(results[0]);
    });
});

app.get('/search-donors', (req, res) => {
    const { address, blood_type, available_for_stem_cell, HLA_typing, CMV_status } = req.query;

    // Construct SQL query with dynamic filtering
    let query = `
        SELECT donors.*, hospitals.name AS hospital_name
        FROM donors
        JOIN hospitals ON donors.registered_by = hospitals.id
        WHERE 1=1
    `;
    const queryParams = [];

    if (address) {
        query += ' AND donors.address LIKE ?'; // Use LIKE for partial matching
        queryParams.push(`%${address}%`);
    }

    if (blood_type) {
        query += ' AND donors.blood_type = ?';
        queryParams.push(blood_type);
    }

    if (available_for_stem_cell && available_for_stem_cell.toLowerCase() === 'yes') {
        query += ' AND donors.available_for_stem_cell = ?';
        queryParams.push(true); // Assuming BOOLEAN

        if (HLA_typing) {
            query += ' AND donors.HLA_typing = ?';
            queryParams.push(HLA_typing);
        }

        if (CMV_status) {
            query += ' AND donors.CMV_status = ?';
            queryParams.push(CMV_status);
        }
    }

    db.query(query, queryParams, (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Database query failed' });
        }
        res.json(results);
    });
});
   

// Define saltRounds
const saltRounds = 10;

app.post('/register-laboratory', (req, res) => {
    const { name, address, contact, donor_registration_history, password } = req.body;

    if (!name || !address || !contact || !password) {
        return res.status(400).json({ message: 'Name, address, contact, and password are required' });
    }

    // Hash the password with the defined saltRounds
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ message: 'Error hashing password' });
        }

        const query = 'INSERT INTO laboratories (name, address, contact, donor_registration_history, password) VALUES (?, ?, ?, ?, ?)';
        const queryParams = [name, address, contact, donor_registration_history || '', hashedPassword];

        db.query(query, queryParams, (error, results) => {
            if (error) {
                console.error('Database query failed:', error);
                return res.status(500).json({ message: 'Database query failed' });
            }
            res.status(201).json({ message: 'Laboratory registered successfully', id: results.insertId });
        });
    });
});

app.post('/login-laboratory', (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ message: 'Name and password are required' });
    }

    const query = 'SELECT * FROM laboratories WHERE name = ?';
    db.query(query, [name], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Database query failed' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const laboratory = results[0];

        // Check password (assuming passwords are stored hashed)
        bcrypt.compare(password, laboratory.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Error comparing passwords' });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // If login is successful, return the ID and success message
            res.json({ message: 'Login successful', laboratoryId: laboratory.id });

            // Use the laboratoryId returned from the database, not req.body
            const laboratoryId = parseInt(laboratory.id, 10);
            if (isNaN(laboratoryId)) {
                return res.status(400).json({ error: 'Invalid laboratory ID' });
            }

            console.log(typeof laboratoryId);  // Ensure it's a number
        });
    });
});

app.post('/laboratory-donor-register', (req, res) => {
    const {
        full_name,
        aadhar_no,
        dob,
        gender,
        address,
        blood_type,
        last_donation,
        donation_type_history,
        available_for_stem_cell,
        CMV_status,
        HLA_typing,
        contact_number,
        email,
        password,
        laboratoryId  // ID of the hospital adding the donor
    } = req.body;

    const query = `
        INSERT INTO donors (
            full_name, aadhar_no, dob, gender, address, blood_type, last_donation, donation_type_history,
            available_for_stem_cell, CMV_status, HLA_typing, contact_number, email, password, registered_by_lab
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [
        full_name, aadhar_no, dob, gender, address, blood_type, last_donation, donation_type_history,
        available_for_stem_cell, CMV_status, HLA_typing, contact_number, email, password, laboratoryId
    ], (err, result) => {
        if (err) {
            console.error('Error adding donor:', err);
            return res.status(500).json({ error: 'Failed to add donor' });
        }

        // Retrieve the hospital name
        const LaboratoryQuery = 'SELECT name FROM laboratories WHERE id = ?';
        db.query(LaboratoryQuery, [laboratoryId], (err, laboratoryResult) => {
            if (err) {
                console.error('Error retrieving Laboratory name:', err);
                return res.status(500).json({ error: 'Failed to retrieve hospital name' });
            }

            // Check if any laboratory was found
            if (laboratoryResult.length === 0) {
                return res.status(404).json({ error: 'Laboratory not found' });
            }

            res.json({ message: 'Donor added successfully', laboratoryName: laboratoryResult[0].name });
            console.log('Laboratory ID:', laboratoryId);

        });
    });
});

app.get('/laboratories', (req, res) => {
    const query = 'SELECT id, name FROM laboratories';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching laboratories:', err);
            return res.status(500).json({ error: 'Failed to fetch laboratories' });
        }
        res.status(200).json({ laboratories: results });
    });
});

app.get('/Ldonors/:laboratoryId', (req, res) => {
    const laboratoryId = req.params.laboratoryId;

    // Optional: Validate laboratoryId format here
    const query = `
        SELECT donors.*, laboratories.name AS laboratoryName
        FROM donors
        JOIN laboratories ON donors.registered_by_lab = laboratories.id
        WHERE donors.registered_by_lab = ?
    `;

    db.query(query, [laboratoryId], (err, results) => {
        if (err) {
            console.error('Error fetching donors:', err);
            return res.status(500).json({ error: 'Failed to fetch donors' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No donors found for this laboratory' });
        }

        res.json(results);
    });
});
// Add other endpoints as needed...

// app.get('/LabDetails/:id', (req, res) => {
//     const { id } = req.params;

//     const query = `SELECT * FROM donors WHERE id = ?`;
//     db.query(query, [id], (err, results) => {
//         if (err) {
//             console.error('Error fetching donor details:', err);
//             return res.status(500).json({ error: 'Failed to fetch donor details' });
//         }

//         if (results.length === 0) {
//             return res.status(404).json({ error: 'Donor not found' });
//         }

//         res.status(200).json(results[0]);
//     });
// });


// app.post('/laboratory-donor-register', (req, res) => {
//     const {
//         laboratoryId, // Expect laboratoryId directly
//         full_name,
//         aadhar_no,
//         dob,
//         gender,
//         address,
//         blood_type,
//         last_donation,
//         donation_type_history,
//         available_for_stem_cell,
//         CMV_status,
//         HLA_typing,
//         contact_number,
//         email,
//         password
//     } = req.body;

//     if (!laboratoryId || !full_name || !aadhar_no || !dob || !gender || !address || !blood_type || !email || !password) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Convert laboratoryId to integer
//     const labId = parseInt(laboratoryId, 10);

//     if (isNaN(labId)) {
//         return res.status(400).json({ message: 'Invalid laboratory ID' });
//     }

//     // Hash password before storing
//     bcrypt.hash(password, 10, (err, hashedPassword) => {
//         if (err) {
//             console.error('Error hashing password:', err);
//             return res.status(500).json({ message: 'Failed to hash password' });
//         }

//         // Insert new donor
//         const donorQuery = `
//             INSERT INTO donors (
//                 full_name, aadhar_no, dob, gender, address, blood_type, last_donation, donation_type_history,
//                 available_for_stem_cell, CMV_status, HLA_typing, contact_number, email, password, registered_by_lab
//             )
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;

//         db.query(donorQuery, [
//             full_name, aadhar_no, dob, gender, address, blood_type, last_donation, donation_type_history,
//             available_for_stem_cell, CMV_status, HLA_typing, contact_number, email, hashedPassword, labId
//         ], (err, result) => {
//             if (err) {
//                 console.error('Error adding donor:', err);
//                 return res.status(500).json({ message: 'Failed to add donor' });
//             }

//             // Retrieve the laboratory name
//             const labNameQuery = 'SELECT name FROM laboratories WHERE id = ?';
//             db.query(labNameQuery, [labId], (err, labNameResult) => {
//                 if (err) {
//                     console.error('Error retrieving laboratory name:', err);
//                     return res.status(500).json({ message: 'Failed to retrieve laboratory name' });
//                 }
//                 res.json({ message: 'Donor added successfully', laboratoryName: labNameResult[0].name });
//             });
//         });
//     });
// });

app.post('/register-blood', (req, res) => {
    const { address, contact, email, password } = req.body;

    // Password hashing for security
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = 'INSERT INTO blood_banks (address, contact, email, password) VALUES (?, ?, ?, ?)';

    db.query(query, [address, contact, email, hashedPassword], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error while registering', error: err });
        }
        return res.status(200).json({ message: 'Blood bank registered successfully' });
    });
});


// app.post('/login-blood', (req, res) => {
//     const { email, password } = req.body;

//     const query = 'SELECT * FROM blood_banks WHERE email = ?';

//     db.query(query, [email], (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error while logging in', error: err });
//         }

//         if (results.length > 0) {
//             const user = results[0];
//             // Compare entered password with the stored hashed password
//             const isPasswordValid = bcrypt.compareSync(password, user.password);

//             if (isPasswordValid) {
//                 return res.status(200).json({ message: 'Login successful', user });
//             } else {
//                 return res.status(401).json({ message: 'Incorrect password' });
//             }
//         } else {
//             return res.status(404).json({ message: 'User not found' });
//         }
//     });
// });

app.post('/login-blood', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM blood_banks WHERE email = ?';

    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error while logging in', error: err });
        }

        if (results.length > 0) {
            const bloodBank = results[0];
            const isPasswordValid = bcrypt.compareSync(password, bloodBank.password);

            if (isPasswordValid) {
                // Store blood bank id in session
                req.session.bloodBankId = bloodBank.id;
                req.session.bloodBankName = bloodBank.name; // Assuming name field exists
                req.session.bloodBankAddress = bloodBank.address;

                return res.status(200).json({
                    message: 'Login successful',
                    bloodBankId: bloodBank.id,
                    name: bloodBank.name,
                    address: bloodBank.address
                });
            } else {
                return res.status(401).json({ message: 'Incorrect password' });
            }
        } else {
            return res.status(404).json({ message: 'Blood bank not found' });
        }
    });
});



// API to get blood bank details
// app.get('/blood-bank-details/:id', (req, res) => {
//     const bloodBankId = req.params.id;

//     const query = 'SELECT * FROM blood_banks WHERE id = ?';
//     db.query(query, [bloodBankId], (error, results) => {
//         if (error) {
//             return res.status(500).json({ message: 'Database query failed' });
//         }

//         if (results.length === 0) {
//             return res.status(404).json({ message: 'Blood bank not found' });
//         }

//         const bloodBank = results[0];
//         res.json(bloodBank);
//     });
// });

app.get('/blood-bank-details', (req, res) => {
    const { blood_availability, address } = req.query;

    // Check if blood_availability is provided, since it's required
    if (!blood_availability) {
        return res.status(400).json({ message: 'Please provide a blood group to search.' });
    }

    // Construct the SQL query dynamically based on the filters provided
    let query = 'SELECT * FROM blood_banks WHERE blood_availability LIKE ?';
    let queryParams = [`%${blood_availability}%`];

    // If address is provided, add it to the query
    if (address) {
        query += ' AND address LIKE ?';
        queryParams.push(`%${address}%`);
    }

    db.query(query, queryParams, (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Database query failed' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No blood banks found with the given criteria' });
        }

        res.json(results);
    });
});

// Route to add blood bank details (for logged-in users)
// app.post('/add-blood-bank', (req, res) => {
//     // Retrieve logged-in blood bank id, name, and address from session
//     const bloodBankId = req.session.bloodBankId;
//     const bloodBankName = req.session.bloodBankName;
//     const bloodBankAddress = req.session.bloodBankAddress;

//     // If blood bank is not logged in
//     if (!bloodBankId) {
//         return res.status(401).json({ message: 'Please login to add blood bank details.' });
//     }

//     const { blood_availability, blood_transaction } = req.body;

//     // Validate the required fields
//     if (!blood_availability || !blood_transaction) {
//         return res.status(400).json({ message: 'Blood availability and blood transaction are required' });
//     }

//     // Insert the blood availability and transaction for the logged-in blood bank
//     const query = `
//         UPDATE blood_banks 
//         SET blood_availability = ?, blood_transaction = ? 
//         WHERE id = ?
//     `;

//     db.query(query, [blood_availability, blood_transaction, bloodBankId], (err, result) => {
//         if (err) {
//             console.error('Database error:', err);
//             return res.status(500).json({ message: 'Failed to update blood bank details' });
//         }

//         // Success response showing the logged-in blood bank's name and address
//         res.status(200).json({
//             message: 'Blood bank details updated successfully',
//             bloodBankId: bloodBankId,
//             name: bloodBankName,
//             address: bloodBankAddress,
//         });
//     });
// });

app.post('/add-blood-bank', (req, res) => {
    const { blood_availability, blood_transaction } = req.body;

    // Validate the required fields
    if (!blood_availability || !blood_transaction) {
        return res.status(400).json({ message: 'Blood availability and blood transaction are required' });
    }

    const query = `
        UPDATE blood_banks 
        SET blood_availability = ?, blood_transaction = ? 
        WHERE id = ?`;

    const bloodBankId = 1; // Hardcoded for now, or you can remove it entirely if not needed

    db.query(query, [blood_availability, blood_transaction, bloodBankId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed to update blood bank details' });
        }
        res.status(200).json({ message: 'Blood bank details updated successfully' });
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
