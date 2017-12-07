```
executing query: START TRANSACTION
executing query: SELECT * FROM current_schema()
executing query: SELECT * FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'class'
executing query: SELECT * FROM information_schema.columns WHERE table_schema IN ('public')
executing query: SELECT t.relname AS table_name, i.relname AS index_name, a.attname AS column_name, ix.indisunique AS is_unique, a.attnum, ix.indkey FROM pg_class t, pg_class i, pg_index ix, pg_attribute a, pg_namespace ns
WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid
AND a.attnum = ANY(ix.indkey) AND t.relkind = 'r' AND t.relname IN ('class') AND t.relnamespace = ns.OID AND ns.nspname IN ('public') ORDER BY t.relname, i.relname
executing query: SELECT table_name, constraint_name FROM information_schema.table_constraints WHERE table_schema IN ('public') AND constraint_type = 'FOREIGN KEY'
executing query: SELECT * FROM information_schema.table_constraints WHERE table_schema IN ('public') AND constraint_type = 'UNIQUE'
executing query: SELECT c.column_name, tc.table_name, tc.constraint_name FROM information_schema.table_constraints tc
JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_name)
JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name
where constraint_type = 'PRIMARY KEY' AND c.table_schema IN ('public')
executing query: COMMIT
executing query: START TRANSACTION
executing query: INSERT INTO "class"("item") VALUES ($1) RETURNING "id" -- PARAMETERS: ["{\"str\":\"this is string\",\"num\":1}"]
executing query: COMMIT
executing query: SELECT "TestEntity"."id" AS "TestEntity_id", "TestEntity"."item" AS "TestEntity_item" FROM "class" "TestEntity" WHERE ("TestEntity"."id" = $1) -- PARAMETERS: [8]
executing query: START TRANSACTION
executing query: UPDATE "class" SET "item" = $2 WHERE "id" = $1 -- PARAMETERS: [8,"\"{\\\"str\\\":\\\"this is new string\\\",\\\"num\\\":2}\""]
executing query: COMMIT
```
