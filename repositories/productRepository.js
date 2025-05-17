const db = require('../database');
const Product = require('../components/product')

class ProductRepository {
    
    getAll() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM product", (err, rows) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(rows.map(row => new Product(row.name, row.price, row.category_id, row.id)));
                }
            })
        })
    }

    save(product) {
        return new Promise((resolve, reject) => {
            const transaction = db.prepare("INSERT INTO product (name, price, category_id) VALUES (?, ?, ?)");
            transaction.run([product.name, product.price, product.category_id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    product.id = this.lastID;
                    resolve(product.id);
                }
            });
            transaction.finalize();
        });
    }
}

module.exports = ProductRepository;