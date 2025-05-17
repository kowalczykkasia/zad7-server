const db = require('../database');
const Category = require('../components/category')

class CategoryRepository {
    
    getAll() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM category", (err, rows) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(rows.map(row => new Category(row.name, row.id)));
                }
            })
        })
    }

    save(category) {
        return new Promise((resolve, reject) => {
            const transaction = db.prepare("INSERT INTO category (name) VALUES (?)");
            transaction.run([category.name], function(err){
                if(err) {
                    reject(err);
                } else {
                    category.id = this.lastID;
                    resolve(category.id);
                }
            })
            transaction.finalize()
        })
    }
}

module.exports = CategoryRepository;