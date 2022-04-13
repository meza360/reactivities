DECLARE
V_COUNT INTEGER;
BEGIN
SELECT COUNT(TABLE_NAME) INTO V_COUNT from USER_TABLES where TABLE_NAME = '__EFMigrationsHistory';
IF V_COUNT = 0 THEN
Begin
BEGIN 
EXECUTE IMMEDIATE 'CREATE TABLE 
"__EFMigrationsHistory" (
    "MigrationId" NVARCHAR2(150) NOT NULL,
    "ProductVersion" NVARCHAR2(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
)';
END;

End;

END IF;
EXCEPTION
WHEN OTHERS THEN
    IF(SQLCODE != -942)THEN
        RAISE;
    END IF;
END;
/

BEGIN 
EXECUTE IMMEDIATE 'CREATE TABLE 
"Activities" (
    "Id" uniqueidentifier NOT NULL,
    "Title" nvarchar(max),
    "Date" datetime2 NOT NULL,
    "Description" nvarchar(max),
    "Category" nvarchar(max),
    "City" nvarchar(max),
    "Venue" nvarchar(max),
    CONSTRAINT "PK_Activities" PRIMARY KEY ("Id")
)';
END;
/

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES (N'20220202025923_FirstMigration', N'6.0.1')
/

declare
   l_nullable user_tab_columns.nullable % type;
begin 
   select nullable into l_nullable 
   from user_tab_columns 
  where table_name = 'Activities' 
  and column_name = 'Venue' 
;
   if l_nullable = 'N' then 
        EXECUTE IMMEDIATE 'ALTER TABLE "Activities" MODIFY "Venue" NVARCHAR2(2000) NULL';
 else 
        EXECUTE IMMEDIATE 'ALTER TABLE "Activities" MODIFY "Venue" NVARCHAR2(2000)';
 end if;
end;
/

declare
   l_nullable user_tab_columns.nullable % type;
begin 
   select nullable into l_nullable 
   from user_tab_columns 
  where table_name = 'Activities' 
  and column_name = 'Title' 
;
   if l_nullable = 'N' then 
        EXECUTE IMMEDIATE 'ALTER TABLE "Activities" MODIFY "Title" NVARCHAR2(2000) NULL';
 else 
        EXECUTE IMMEDIATE 'ALTER TABLE "Activities" MODIFY "Title" NVARCHAR2(2000)';
 end if;
end;
/

declare
   l_nullable user_tab_columns.nullable % type;
begin 
   select nullable into l_nullable 
   from user_tab_columns 
  where table_name = 'Activities' 
  and column_name = 'Description' 
;
   if l_nullable = 'N' then 
        EXECUTE IMMEDIATE 'ALTER TABLE "Activities" MODIFY "Description" NVARCHAR2(2000) NULL';
 else 
        EXECUTE IMMEDIATE 'ALTER TABLE "Activities" MODIFY "Description" NVARCHAR2(2000)';
 end if;
end;
/

declare
   l_nullable user_tab_columns.nullable % type;
begin 
   select nullable into l_nullable 
   from user_tab_columns 
  where table_name = 'Activities' 
  and column_name = 'Date' 
;
   if l_nullable = 'N' then 
        EXECUTE IMMEDIATE 'ALTER TABLE "Activities" MODIFY "Date" TIMESTAMP(7) ';
 else 
        EXECUTE IMMEDIATE 'ALTER TABLE "Activities" MODIFY "Date" TIMESTAMP(7) NOT NULL';
 end if;
end;
/

declare
   l_nullable user_tab_columns.nullable % type;
begin 
   select nullable into l_nullable 
   from user_tab_columns 
  where table_name = 'Activities' 
  and column_name = 'City' 
;
   if l_nullable = 'N' then 
        EXECUTE IMMEDIATE 'ALTER TABLE "Activities" MODIFY "City" NVARCHAR2(2000) NULL';
 else 
        EXECUTE IMMEDIATE 'ALTER TABLE "Activities" MODIFY "City" NVARCHAR2(2000)';
 end if;
end;
/

declare
   l_nullable user_tab_columns.nullable % type;
begin 
   select nullable into l_nullable 
   from user_tab_columns 
  where table_name = 'Activities' 
  and column_name = 'Category' 
;
   if l_nullable = 'N' then 
        EXECUTE IMMEDIATE 'ALTER TABLE "Activities" MODIFY "Category" NVARCHAR2(2000) NULL';
 else 
        EXECUTE IMMEDIATE 'ALTER TABLE "Activities" MODIFY "Category" NVARCHAR2(2000)';
 end if;
end;
/

declare
   l_nullable user_tab_columns.nullable % type;
begin 
   select nullable into l_nullable 
   from user_tab_columns 
  where table_name = 'Activities' 
  and column_name = 'Id' 
;
   if l_nullable = 'N' then 
        EXECUTE IMMEDIATE 'ALTER TABLE "Activities" MODIFY "Id" RAW(16) ';
 else 
        EXECUTE IMMEDIATE 'ALTER TABLE "Activities" MODIFY "Id" RAW(16) NOT NULL';
 end if;
end;
/

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES (N'20220413190645_ActivitiestoOracle', N'6.0.1')
/