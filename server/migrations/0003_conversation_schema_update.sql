BEGIN TRANSACTION;
-- Create a new table with the desired schema
CREATE TABLE conversation_new (
    id TEXT PRIMARY KEY NOT NULL,
    user_id TEXT NOT NULL,
    history TEXT,
    itemTypeId TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
-- Copy all data from the old table to the new table
INSERT INTO conversation_new (id, user_id, history, created_at, updated_at)
SELECT id,
    user_id,
    history,
    created_at,
    updated_at
FROM conversation;
-- Drop the old table
DROP TABLE conversation;
-- Rename the new table to the old table's name
ALTER TABLE conversation_new
    RENAME TO conversation;
COMMIT;