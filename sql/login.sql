-- UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================
-- TENANTS
-- =========================
CREATE TABLE tenants (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 name VARCHAR(255) NOT NULL,
 code VARCHAR(100),
 status VARCHAR(50) DEFAULT 'active',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- INSTITUTES
-- =========================
CREATE TABLE institutes (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
 name VARCHAR(255) NOT NULL,
 code VARCHAR(100),
 type VARCHAR(100),
 subtype VARCHAR(100),
 image_url TEXT,
 location TEXT,
 status VARCHAR(50) DEFAULT 'active',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 first_name VARCHAR(100),
 last_name VARCHAR(100),
 full_name VARCHAR(255),
 email VARCHAR(255) UNIQUE NOT NULL,
 mobile VARCHAR(20),
 password_hash TEXT NOT NULL,
 status VARCHAR(50) DEFAULT 'active',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- ROLES
-- =========================
CREATE TABLE roles (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 name VARCHAR(100) NOT NULL,
 code VARCHAR(100) UNIQUE,
 description TEXT,
 icon_url TEXT,
 status VARCHAR(50) DEFAULT 'active',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- USER INSTITUTE ROLES
-- =========================
CREATE TABLE user_institute_roles (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
 institute_id UUID NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
 user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
 is_primary BOOLEAN DEFAULT false,
 status VARCHAR(50) DEFAULT 'active',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- INDEXES
-- =========================
CREATE INDEX idx_users_email ON users(email);

CREATE INDEX idx_uir_user ON user_institute_roles(user_id);
CREATE INDEX idx_uir_institute ON user_institute_roles(institute_id);
CREATE INDEX idx_uir_role ON user_institute_roles(role_id);
CREATE INDEX idx_uir_tenant ON user_institute_roles(tenant_id);

-- =========================
-- UNIQUE CONSTRAINT (IMPORTANT)
-- =========================
ALTER TABLE user_institute_roles
ADD CONSTRAINT unique_user_role UNIQUE (user_id, institute_id, role_id);