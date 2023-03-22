CREATE TABLE "flows" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR (255) NOT NULL,
	"is_published" BOOLEAN DEFAULT FALSE,
	"current_version_id" INT DEFAULT 1
);

CREATE TABLE "versions" (
	"id" SERIAL PRIMARY KEY,
	"flow_id" INT REFERENCES "flows" NOT NULL,
	"versions_number" INT DEFAULT 1
);

CREATE TABLE "input_type" (
	"id" SERIAL PRIMARY KEY,
	"input_type" VARCHAR (100)
);

CREATE TABLE "steps" (
	"id" SERIAL PRIMARY KEY,
	"instructions" VARCHAR (1000) NOT NULL,
	"content" VARCHAR (1000) NOT NULL,
	"input_type" INT REFERENCES "input_type"
);

CREATE TABLE "version_steps" (
	"id" SERIAL PRIMARY KEY,
	"versions_id" INT REFERENCES "versions" NOT NULL,
	"steps_id" INT REFERENCES "steps" NOT NULL
);

-- Flows table
INSERT INTO "flows" ("title", "is_published")
VALUES
('Goal Setting', TRUE),
('Stress Management', TRUE),
('Time Management', TRUE),
('Self-Improvement', TRUE),
('Communication Skills', TRUE);

-- Versions table (assuming each flow has only one version)
INSERT INTO "versions" ("flow_id", "versions_number")
VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1);

-- Input Types table
INSERT INTO "input_type" ("input_type")
VALUES
('shortText'),
('longText'),
('input'),
('dropDown'),
('textArea');

-- Steps table
INSERT INTO "steps" ("instructions", "content", "input_type")
VALUES
('Define your goal', 'What is your primary goal?', 1),
('Prioritize tasks', 'List tasks you need to complete to achieve your goal', 1),
('Identify stressors', 'What causes you stress in your daily life?', 1),
('Learn relaxation techniques', 'Choose a relaxation technique to practice', 3),
('Evaluate time usage', 'How do you spend your time during the day?', 1),
('Set self-improvement goals', 'What area of your life would you like to improve?', 1),
('Practice active listening', 'Describe a situation where active listening would be helpful', 1),
('Develop assertiveness', 'Identify a situation where being more assertive would be beneficial', 1);

-- Version Steps table (assuming each step is part of only one version)
INSERT INTO "version_steps" ("versions_id", "steps_id")
VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(4, 6),
(5, 7),
(5, 8);