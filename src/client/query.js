const getQuery = schema => `
  SELECT 
  table_name,
  column_name,
  is_nullable,
  data_type,
  character_maximum_length,
  string_agg(constraint_type, ', ') AS constraint_types,
  string_agg(foreign_table_name, ', ') AS foreign_table_name,
  string_agg(foreign_column_name, ', ') AS foreign_column_name,
  string_agg(constraint_name, ', ') AS constraint_names
  FROM
    (
      SELECT
      tc.constraint_name,
      t.table_name,
      c.column_name,
      c.is_nullable,
      c.data_type,
      c.character_maximum_length,
      tc.constraint_type,
      null AS foreign_table_name,
      null AS foreign_column_name
      FROM
      information_schema.tables AS t JOIN information_schema.columns AS c
        ON t.table_name = c.table_name
      LEFT JOIN information_schema.key_column_usage AS kcu
        ON t.table_name = kcu.table_name AND c.column_name = kcu.column_name
      LEFT JOIN information_schema.table_constraints AS tc
        ON kcu.constraint_name = tc.constraint_name
      LEFT JOIN information_schema.constraint_column_usage AS ccu 
        ON tc.constraint_name = ccu.constraint_name
      WHERE t.table_type = 'BASE TABLE'
      AND t.table_schema = '${schema}'
      AND (tc.constraint_type is null OR tc.constraint_type <> 'FOREIGN KEY')
      UNION ALL
      SELECT
      tc.constraint_name,
      t.table_name,
      c.column_name,
      c.is_nullable,
      c.data_type,
      c.character_maximum_length,
      tc.constraint_type,
      ccu.table_name AS foreign_table_name,
      ccu.column_name AS foreign_column_name
      FROM
      information_schema.tables AS t JOIN information_schema.columns as c
        ON t.table_name = c.table_name
      LEFT JOIN information_schema.key_column_usage as kcu
        ON t.table_name = kcu.table_name AND c.column_name = kcu.column_name
      LEFT JOIN information_schema.table_constraints as tc
        ON kcu.constraint_name = tc.constraint_name
      LEFT JOIN information_schema.constraint_column_usage AS ccu
        ON tc.constraint_name = ccu.constraint_name
      WHERE t.table_type = 'BASE TABLE'
      AND t.table_schema = '${schema}'
      AND tc.constraint_type = 'FOREIGN KEY'
    ) AS subquery
  GROUP BY table_name, column_name,  is_nullable, data_type, character_maximum_length
  ORDER BY table_name, column_name
  `;

export default getQuery;
