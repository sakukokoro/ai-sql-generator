
export const INITIAL_SCHEMA = `CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_details JSONB NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data is for context, but not part of the schema itself.
-- INSERT INTO products (name, description, price, image_url, stock) VALUES
-- ('Product A', 'This is product A.', 19.99, 'https://example.com/product_a.jpg', 100),
-- ('Product B', 'This is product B.', 29.50, 'https://example.com/product_b.jpg', 50),
-- ('Product C', 'This is product C.', 9.99, 'https://example.com/product_c.jpg', 200);`;
