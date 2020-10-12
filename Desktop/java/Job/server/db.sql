CREATE DATABASE GetHired;

CREATE TABLE job_users
(
    id TEXT NOT NULL PRIMARY KEY UNIQUE,
    name TEXT ,
    surname TEXT,
    email TEXT UNIQUE,
    password TEXT ,
    address TEXT,
    category TEXT,
    description TEXT,
    wish TEXT,
    type TEXT,
    exp TEXT
);

CREATE TABLE job_companies
(
    id TEXT NOT NULL PRIMARY KEY UNIQUE,
    companyName TEXT ,
    email TEXT UNIQUE,
    password TEXT,
    description TEXT,
    type TEXT,
    address TEXT
);

CREATE TABLE job_postings
(
    id SERIAL PRIMARY KEY UNIQUE,
    ref_id TEXT NOT NULL,
    title TEXT,
    company TEXT,
    description TEXT,
    city TEXT,
    category TEXT,
    req TEXT,
    salary TEXT,
    remote TEXT,
    applied TEXT
);

CREATE TABLE job_chat
(
    id TEXT NOT NULL  ,
    company_id TEXT ,
    account_id TEXT,
    account_text TEXT,
    company_text TEXT
);
CREATE TABLE job_chathead
(
    id TEXT NOT NULL  ,
    company_id TEXT,
    account_id TEXT
);

CREATE TABLE job_applied
(
    id SERIAL PRIMARY KEY UNIQUE,
    posting_id INT,
    ref_id TEXT,
    acc_id TEXT,
    name TEXT ,
    surname TEXT,
    category TEXT,
    description TEXT,
    exp TEXT
);