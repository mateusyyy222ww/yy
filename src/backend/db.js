const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./chat.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        comment TEXT NOT NULL
    )`);
});

const getComments = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM comments', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const addComment = (name, comment) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO comments (name, comment) VALUES (?, ?)', [name, comment], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

module.exports = { getComments, addComment };
