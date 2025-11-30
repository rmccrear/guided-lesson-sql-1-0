import { Lesson } from './types';

export const LESSONS: Lesson[] = [
  {
    id: 'intro',
    title: 'What is SQL Zoo?',
    description: 'Introduction to our primary learning tool.',
    type: 'reading',
    content: `
**Goal:** Understand the ecosystem of tools we will use to learn SQL.

**User Story:** As a student, I want to understand the difference between our practice environment (SQL Zoo) and our production environment (Supabase) so I can learn effectively.

---

## 📘 Introduction

SQL Zoo is a fantastic, free online platform for learning SQL through hands-on practice. It provides a simple website interface where you can run queries against real databases directly in your browser.

We will use SQL Zoo to learn the syntax, and then apply that knowledge to Supabase, a modern backend-as-a-service that uses PostgreSQL.

## Instructions
1.  Read the description above.
2.  Click the button below to open SQL Zoo in a new tab.
3.  Keep this app open to track your progress!
`,
    externalLink: {
      url: 'https://sqlzoo.net/wiki/SQL_Tutorial',
      label: 'Visit SQL Zoo'
    }
  },
  {
    id: 'select-basics',
    title: 'SELECT Basics',
    description: 'Learn how to retrieve data.',
    type: 'exercise',
    content: `
**Goal:** Learn how to retrieve specific columns from a table.

**User Story:** As a data analyst, I need to extract specific population data so that I can answer questions about different countries.

---

## What You'll Do

The \`SELECT\` statement is the foundation of SQL. It allows you to choose which columns of data you want to see. In this lesson, you will practice simple queries to fetch specific columns from a table.

## Instructions
1.  Click the link below to start the SQL Zoo lesson.
2.  Modify the query to show the population of Germany.
3.  Modify the query to show the population of 'Scandinavia' and 'Polynesia'.
4.  Solve the area calculations.

### ✅ Check
*   You understand \`SELECT column FROM table\`.
*   You understand \`WHERE\` clauses.
*   You understand the \`IN\` keyword.
`,
    codeSnippets: [{
      language: 'sql',
      code: "SELECT population FROM world\n  WHERE name = 'Germany'",
      description: "Basic SELECT syntax"
    }],
    externalLink: {
      url: 'https://sqlzoo.net/wiki/SELECT_basics',
      label: 'Start Lesson 0: SELECT Basics'
    }
  },
  {
    id: 'select-names',
    title: 'Pattern Matching',
    description: 'Filtering text with patterns.',
    type: 'exercise',
    content: `
**Goal:** Filter text data using pattern matching.

**User Story:** As a researcher, I want to find countries that start or end with specific letters so I can categorize them.

---

## What You'll Do

Sometimes you need to find data that *looks like* a certain pattern, rather than an exact match. SQL uses the \`LIKE\` operator for this.

**Common wildcards:**
* \`%\` matches any sequence of characters
* \`_\` matches a single character

## Instructions
1.  Complete the SQL Zoo pattern matching exercises.
2.  Find countries starting with 'Y'.
3.  Find countries ending with 'y'.
4.  Find countries containing the letter 'x'.

### 🔍 Diving Deeper
The \`%\` symbol is a wildcard. 
- \`'A%'\` means "Starts with A".
- \`'%a'\` means "Ends with a".
- \`'%a%'\` means "Contains a".
`,
    externalLink: {
      url: 'https://sqlzoo.net/wiki/SELECT_names',
      label: 'Start Lesson 1: SELECT Name'
    }
  },
  {
    id: 'select-world',
    title: 'Querying the World',
    description: 'Working with a larger dataset.',
    type: 'exercise',
    content: `
**Goal:** Master the \`WHERE\` clause with comparison operators.

**User Story:** As a geographer, I want to filter countries based on population, GDP, and area to perform complex analysis.

---

## What You'll Do

Now we dive deeper. You will query the 'World' country profile table. This lesson reinforces \`WHERE\` clauses and introduces comparison operators like \`>\`, \`<\`, and logic like \`AND\` / \`OR\`.

## Instructions
1.  Go to the SQL Zoo lesson linked below.
2.  Write queries to find countries with large populations.
3.  Use \`AND\` to combine conditions (e.g., big area AND big population).
4.  Use \`XOR\` (Exclusive OR) if requested.

### ✅ Check
*   You can use \`>=\` and \`<=\`.
*   You can combine logic with \`AND\`, \`OR\`.
`,
    externalLink: {
      url: 'https://sqlzoo.net/wiki/SELECT_from_WORLD_Tutorial',
      label: 'Start Lesson 2: SELECT from World'
    }
  },
  {
    id: 'select-nobel',
    title: 'Nobel Prize Winners',
    description: 'Practice basic features.',
    type: 'exercise',
    content: `
**Goal:** Practice queries on a dataset with mixed data types (text and numbers).

**User Story:** As a historian, I want to look up Nobel prize winners by year and subject to study historical trends.

---

## What You'll Do

You will query a table of Nobel Prize winners. Pay attention to how you handle strings (text needs quotes like \`'Physics'\`) and numbers (years do not need quotes).

## Instructions
1.  Find winners from the year 1950.
2.  Find who won the 'Literature' prize in 1962.
3.  Find all winners from a specific era.

### 💡 Tip
Text strings always need single quotes: \`subject = 'Chemistry'\`. 
Numbers do not: \`yr = 1970\`.
`,
    externalLink: {
      url: 'https://sqlzoo.net/wiki/SELECT_from_Nobel_Tutorial',
      label: 'Start Lesson 3: SELECT from Nobel'
    }
  },
  {
    id: 'supabase-setup',
    title: 'Supabase Implementation',
    description: 'Taking your skills to a real production database.',
    type: 'exercise',
    content: `
**Goal:** Create your first production database table in Supabase.

**User Story:** As a developer, I want to set up a real PostgreSQL database so I can build the backend for my Potluck app.

---

## What You'll Do

Now that you know the syntax, let's use a real tool. Supabase is an open-source Firebase alternative built on top of PostgreSQL.

## Instructions
1.  Go to your [Supabase Dashboard](https://supabase.com/dashboard) and open your project.
2.  Navigate to the **Table Editor** (icon looks like a grid).
3.  Create a new table named \`potluck_dinners\`.
4.  Add the following columns:
    *   \`id\` (int8, primary key, usually auto-created)
    *   \`family\` (text)
    *   \`dish\` (text)
    *   \`serves\` (int2 or int4)
    *   \`type_of_dish\` (text) - e.g., 'entree', 'side', 'dessert'
5.  Add at least 3 dummy rows using the "Insert Row" button.

### ✅ Check
*   Table \`potluck_dinners\` exists.
*   Columns \`family\`, \`dish\`, \`serves\`, \`type_of_dish\` exist.
*   You have at least 3 rows of data.
`,
    codeSnippets: [{
        language: 'text',
        code: "Example Data:\nJones | Mac & Cheese | 6  | side\nSmith | Roast Beef   | 10 | entree\nLee   | Apple Pie    | 8  | dessert",
        description: "Add at least 5 rows to make it interesting."
    }]
  },
  {
    id: 'supabase-select',
    title: 'Selecting in Supabase',
    description: 'Using the SQL Editor.',
    type: 'exercise',
    content: `
**Goal:** Execute SQL queries against your new Supabase table.

**User Story:** As a backend developer, I want to verify my data by running raw SQL queries in the database console.

---

## Instructions

Supabase has a built-in **SQL Editor** where you can run raw SQL queries, just like in SQL Zoo.

1.  Click on the **SQL Editor** icon in the left sidebar of Supabase.
2.  Click "New Query".
3.  Copy and run the examples below against your \`potluck_dinners\` table.

### ✅ Check
*   You can retrieve all rows.
*   You can filter by family name.
*   You can filter by dish type.
`,
    codeSnippets: [{
        language: 'sql',
        code: "-- Get all dishes brought by the Jones family\nSELECT family, dish FROM potluck_dinners WHERE family = 'Jones';\n\n-- Get entrees and sides only\nSELECT dish, serves, type_of_dish \nFROM potluck_dinners \nWHERE type_of_dish IN ('entree', 'side');"
    }]
  },
  {
    id: 'practice-own',
    title: 'Practice With Your Own',
    description: 'Expand your dataset.',
    type: 'exercise',
    content: `
**Goal:** Expand your dataset and practice custom queries.

**User Story:** As a developer, I want to populate my database with more diverse data so I can test edge cases in my queries.

---

## Instructions

A database is boring with only 3 rows. Let's make it realistic.

1.  Go back to the **Table Editor**.
2.  Add **5-10 more entries**.
    *   Have families bring multiple items.
    *   Have multiple items of the same type (e.g., 3 different desserts).
3.  Return to the **SQL Editor** and practice:
    *   Find all dishes that serve more than 8 people.
    *   Find all desserts.

### ✅ Check
*   Your table has > 8 rows.
*   You have successfully run a query filtering by \`serves > 8\`.
`
  },
  {
    id: 'import-codeorg',
    title: 'Importing External Data',
    description: 'Working with CSVs from Code.org.',
    type: 'exercise',
    content: `
**Goal:** Import a CSV dataset from an external source.

**User Story:** As a data engineer, I want to import existing data from a CSV file so I don't have to enter everything manually.

---

## Instructions

Real-world data often comes from spreadsheets or CSV files.

1.  Go to [Code.org](https://code.org) and create an App Lab project (or use an existing one).
2.  Go to the **Data Tab**.
3.  Select a dataset you like (e.g., Movies, Spotify Charts) and **Download** it as a CSV.
4.  Return to **Supabase > Table Editor**.
5.  Click "New Table" but look for the option to **Import Data from CSV**.
6.  Upload your file.
7.  Once imported, go to the SQL Editor and practice selecting from this new, larger table!

### ✅ Check
*   You have a new table in Supabase (e.g., \`movies\`).
*   It is populated with data from the CSV.
`
  },
  {
    id: 'sum-count-zoo',
    title: 'SUM and COUNT',
    description: 'Aggregating data.',
    type: 'exercise',
    content: `
**Goal:** Learn how to aggregate data to find totals and counts.

**User Story:** As an analyst, I want to calculate statistics like averages, totals, and counts to summarize the data.

---

## What You'll Do

So far, we've just fetched rows. Now we want to do math on them.

*   \`COUNT\`: How many rows match?
*   \`SUM\`: Add up the values in a column.

Complete the tutorial on SQL Zoo before moving to the next step.

## Instructions
1.  Click the link below.
2.  Learn how \`SUM\`, \`COUNT\`, \`MAX\`, \`AVG\` work.
3.  Complete the exercises.
`,
    externalLink: {
      url: 'https://sqlzoo.net/wiki/SUM_and_COUNT_Tutorial',
      label: 'Learn SUM and COUNT'
    }
  },
  {
    id: 'sum-count-practice',
    title: 'Aggregates in Supabase',
    description: 'Applying math to your potluck.',
    type: 'exercise',
    content: `
**Goal:** Apply aggregation functions to your Potluck database.

**User Story:** As a party planner, I want to count how many entrees I have to ensure there is enough food.

---

## Instructions

Return to your \`potluck_dinners\` table in the Supabase SQL Editor.

Try the queries below to answer questions about your party.

### ✅ Check
*   You can count rows.
*   You can verify your data.
`,
    codeSnippets: [
        {
            language: 'sql',
            code: "-- How many total entrees are there?\nSELECT COUNT(*) FROM potluck_dinners WHERE type_of_dish = 'entree';",
            description: "Basic Count Example"
        },
        {
            language: 'sql',
            code: "-- Show me all side dishes (just to verify)\nSELECT * FROM potluck_dinners WHERE type_of_dish = 'side';",
            summary: "all side dishes"
        }
    ]
  },
  {
    id: 'thinking-cap-count',
    title: 'Thinking Cap: COUNT',
    description: 'Challenge your logic.',
    type: 'challenge',
    content: `
**Goal:** Solve complex questions using \`COUNT\`.

**User Story:** As a party organizer, I need to count confirmed dishes to ensure we have a balanced menu.

---

## ⚡ Challenge Mode

This is a challenge level! There are no step-by-step instructions here. 

**Instructions:**
1.  Open your Supabase SQL Editor.
2.  Read the questions below.
3.  Write and run a query to answer each one.
4.  Only check the "Show Me" hints if you are completely stuck.

### ✅ Check
*   You have found the count for Entrees.
*   You have found the count for Sides.
*   You have found the unique count of families.
`,
    challenges: [
        "Write a query to count exactly how many 'entree' dishes we have.",
        "Write a query to count how many 'side' dishes we have.",
        "Write a query to count how many dishes the 'Jones' family brought.",
        "CHALLENGE: How many unique families are bringing dishes? (Hint: Use DISTINCT)"
    ],
    codeSnippets: [
        {
            language: 'sql',
            code: "SELECT COUNT(DISTINCT family) FROM potluck_dinners;",
            summary: "Solution: Unique Families (Challenge)"
        }
    ]
  },
  {
    id: 'thinking-cap-sum',
    title: 'Thinking Cap: SUM',
    description: 'Totaling up the numbers.',
    type: 'challenge',
    content: `
**Goal:** Solve complex questions using \`SUM\`.

**User Story:** As a party host, I need to know the total serving capacity to ensure no one goes hungry.

---

## ⚡ Challenge Mode

Now we are dealing with capacity. We don't just want to know *how many* dishes there are, but *how many people* they feed.

**Instructions:**
1.  Use \`SUM(column_name)\` to add up values.
2.  Combine with \`WHERE\` to be specific.
3.  Answer the questions below in your SQL Editor.

### ✅ Check
*   You know the total capacity for entrees.
*   You know the total capacity for desserts.
`,
    challenges: [
        "How many total people can we serve with all our entrees combined?",
        "What is the total serving capacity of all desserts?",
        "Try to combine SUM and WHERE to answer: 'How many people can the Smith family feed with their dishes?'"
    ],
    codeSnippets: [
        {
            language: 'sql',
            code: "SELECT SUM(serves) FROM potluck_dinners WHERE family = 'Smith';",
            summary: "Solution: Smith Family Capacity"
        }
    ]
  },
  {
    id: 'thinking-cap-codeorg-explore',
    title: 'Thinking Cap: Explore Code.org Data',
    description: 'Discover insights in real-world datasets.',
    type: 'challenge',
    content: `
**Goal:** Apply everything you've learned to explore a large, real-world dataset.

**User Story:** As a data analyst, I want to explore a large dataset to discover interesting patterns and insights.

---

## ⚡ Challenge Mode

Now it's time to get creative! You imported a dataset from Code.org earlier (movies, music charts, or another dataset). This is a much larger and more complex table than our simple potluck database.

**Your Mission:**
Explore your imported dataset and write queries to answer interesting questions. There are no "correct" answers here - the goal is to practice thinking like a data analyst.

**Instructions:**
1.  Open your Supabase SQL Editor.
2.  Look at your Code.org table to see what columns are available.
3.  Come up with at least 3-5 interesting questions you can answer with SQL.
4.  Write and run queries to find the answers.

**Example Questions (adjust based on your dataset):**
- **Movies:** What's the oldest movie in the database? Which genre appears most often?
- **Music:** Which artist has the most songs? What year had the most releases?
- **General:** What's the average value of a numeric column? How many unique entries exist?

### 💡 Tips
*   Use \`SELECT DISTINCT\` to find unique values
*   Use \`ORDER BY\` with \`LIMIT\` to find top/bottom results
*   Combine \`COUNT\`, \`SUM\`, \`AVG\` with \`GROUP BY\` for powerful insights
*   Use \`LIKE\` for pattern matching in text fields

### ✅ Check
*   You've written at least 3 different queries
*   You've used at least 2 different aggregate functions (COUNT, SUM, AVG, etc.)
*   You've discovered something interesting about your data!
`,
    challenges: [
        "What are the column names in your table? (Hint: Just SELECT * and look at the headers)",
        "How many total rows are in your dataset? Use COUNT(*)",
        "Pick a text column - what are the unique values? Use SELECT DISTINCT",
        "Find the top 5 or bottom 5 of something using ORDER BY and LIMIT",
        "CREATIVE CHALLENGE: Come up with your own question and answer it!"
    ],
    codeSnippets: [
        {
            language: 'sql',
            code: "-- Example: Find the 5 most recent movies (adjust table/column names)\nSELECT title, year FROM movies \nORDER BY year DESC \nLIMIT 5;",
            summary: "Example: Top 5 by Year"
        },
        {
            language: 'sql',
            code: "-- Example: Count items by category\nSELECT genre, COUNT(*) as count \nFROM movies \nGROUP BY genre \nORDER BY count DESC;",
            summary: "Example: GROUP BY for Categories"
        }
    ]
  },
  {
    id: 'thinking-cap-codeorg-advanced',
    title: 'Thinking Cap: Advanced Analysis',
    description: 'Push your SQL skills to the limit.',
    type: 'challenge',
    content: `
**Goal:** Combine multiple SQL concepts to perform sophisticated data analysis.

**User Story:** As a senior data analyst, I want to perform complex queries that combine filtering, aggregation, and sorting to extract meaningful insights.

---

## ⚡⚡ ADVANCED Challenge Mode

This is the ultimate challenge! You'll need to combine everything you've learned: WHERE clauses, aggregate functions, GROUP BY, ORDER BY, and creative thinking.

**Your Mission:**
Answer increasingly complex questions about your Code.org dataset. Each question requires combining multiple SQL concepts.

**Instructions:**
1.  These challenges build on each other in complexity
2.  Start with the easier ones and work your way up
3.  Don't be afraid to experiment and make mistakes
4.  Use the AI Tutor if you get stuck - that's what it's there for!

### 🏆 Challenge Levels

**Level 1: Filtering + Aggregation**
- Find the average of something, but only for a specific category
- Example: "What's the average rating for action movies?"

**Level 2: Grouping + Sorting**
- Group by one column, aggregate another, then sort the results
- Example: "Which year had the most movies released?"

**Level 3: Complex Combinations**
- Combine multiple WHERE conditions with GROUP BY and ORDER BY
- Example: "For movies after 2010, which genre has the highest average rating?"

### 💡 Pro Tips
*   Break complex problems into smaller steps
*   Test each part of your query separately
*   Use comments (--) to document your thinking
*   The HAVING clause can filter results AFTER grouping

### ✅ Check
*   You've successfully used GROUP BY with an aggregate function
*   You've combined WHERE with GROUP BY
*   You've used ORDER BY to sort aggregated results
*   You feel confident exploring data with SQL!
`,
    challenges: [
        "Find the average of a numeric column, but only for rows that match a specific text value",
        "GROUP BY a category column and COUNT how many items are in each category. Sort from most to least.",
        "Find which category/group has the highest average value for a numeric column",
        "Use multiple WHERE conditions (AND/OR) combined with aggregation",
        "ULTIMATE CHALLENGE: Write a query that uses WHERE, GROUP BY, an aggregate function (COUNT/SUM/AVG), and ORDER BY all in one query!"
    ],
    codeSnippets: [
        {
            language: 'sql',
            code: "-- Template for complex query\nSELECT category_column, COUNT(*) as total, AVG(numeric_column) as average\nFROM your_table\nWHERE some_condition = 'value'\nGROUP BY category_column\nORDER BY total DESC\nLIMIT 10;",
            summary: "Template: Complex Query Structure"
        },
        {
            language: 'sql',
            code: "-- Example: Movies with highest average ratings by genre (2010+)\nSELECT genre, AVG(rating) as avg_rating, COUNT(*) as movie_count\nFROM movies\nWHERE year >= 2010\nGROUP BY genre\nHAVING COUNT(*) >= 5  -- Only genres with 5+ movies\nORDER BY avg_rating DESC;",
            summary: "Solution: Advanced Analysis Example"
        }
    ]
  }
];