CREATE TABLE "order" (
      id SERIAL PRIMARY KEY,
      customer_name VARCHAR(255) NOT NULL,
      status VARCHAR(255) NOT NULL,
      datetime TIMESTAMP
);

CREATE TABLE item (
      id SERIAL PRIMARY KEY,
      quantity INTEGER default 1,
      order_id INTEGER REFERENCES "order"
);