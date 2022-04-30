SELECT SQ_ACTIVITYID.NEXTVAL FROM DUAL;

CREATE SEQUENCE SQ_ACTIVITYID
START WH 1
INCREMENT BY 1
ORDER
NOCYCLE;



INSERT INTO "Activities" ("Id","Title","Date","Description","Category","City","Venue") VALUES (SQ_ACTIVITYID.NEXTVAL,'Past Activity 1',SYSDATE-50,'Activity','Drinks','London','Pub');
INSERT INTO "Activities" ("Id","Title","Date","Description","Category","City","Venue") VALUES (SQ_ACTIVITYID.NEXTVAL,'Past Activity 2',SYSDATE-100,'Activity','Culture','Paris','Louvre');
INSERT INTO "Activities" ("Id","Title","Date","Description","Category","City","Venue") VALUES (SQ_ACTIVITYID.NEXTVAL,'Past Activity 3',SYSDATE-10,'Activity','Culture','Paris','Louvre');
INSERT INTO "Activities" ("Id","Title","Date","Description","Category","City","Venue") VALUES (SQ_ACTIVITYID.NEXTVAL,'Past Activity 4',SYSDATE-25,'Activity','Culture','Paris','Louvre');
INSERT INTO "Activities" ("Id","Title","Date","Description","Category","City","Venue") VALUES (SQ_ACTIVITYID.NEXTVAL,'Past Activity 5',SYSDATE-30,'Activity','Culture','Paris','Louvre');
INSERT INTO "Activities" ("Id","Title","Date","Description","Category","City","Venue") VALUES (SQ_ACTIVITYID.NEXTVAL,'Past Activity 6',SYSDATE-25,'Activity','Culture','Paris','Louvre');
INSERT INTO "Activities" ("Id","Title","Date","Description","Category","City","Venue") VALUES (SQ_ACTIVITYID.NEXTVAL,'Past Activity 7',SYSDATE-132,'Activity','Culture','Paris','Louvre');
INSERT INTO "Activities" ("Id","Title","Date","Description","Category","City","Venue") VALUES (SQ_ACTIVITYID.NEXTVAL,'Future Activity 1',SYSDATE+150,'Activity ','Culture','London','Natural History Museum');
INSERT INTO "Activities" ("Id","Title","Date","Description","Category","City","Venue") VALUES (SQ_ACTIVITYID.NEXTVAL,'Future Activity 2',SYSDATE+100,'Activity','Music','London','O2 Arena');
INSERT INTO "Activities" ("Id","Title","Date","Description","Category","City","Venue") VALUES (SQ_ACTIVITYID.NEXTVAL,'Future Activity 3',SYSDATE+138,'Activity','Drinks','London','Another pub');
INSERT INTO "Activities" ("Id","Title","Date","Description","Category","City","Venue") VALUES (SQ_ACTIVITYID.NEXTVAL,'Future Activity 4',SYSDATE+20,'Activity','Drinks','London','Yet another pub');
INSERT INTO "Activities" ("Id","Title","Date","Description","Category","City","Venue") VALUES (SQ_ACTIVITYID.NEXTVAL,'Future Activity 5',SYSDATE+45,'Activity','Drinks','London','Just another pub');




CREATE OR REPLACE PROCEDURE SP_DETALLES(id IN NUMBER) 
IS
I_ID "Activities"%ROWTYPE;
BEGIN
SELECT "a"."Id", "a"."Category", "a"."City", "a"."Date", "a"."Description", "a"."Title", "a"."Venue"
      INTO I_ID
      FROM "Activities" "a"
      WHERE "a"."Id" = id
      FETCH FIRST 1 ROWS ONLY;
END;


SELECT * FROM "Activities";

EXECUTE SP_DETALLES(1);

INSERT INTO "Activities"(
    "Id","Title","Date","Description","Category","City","Venue"
    )
VALUES
  (
    '"Id":RAW(16):NOT NULL',
    '"Title":NVARCHAR2(2000)',
    '"Date":DATE:NOT NULL',
    '"Description":NVARCHAR2(2000)',
    '"Category":NVARCHAR2(2000)',
    '"City":NVARCHAR2(2000)',
    '"Venue":NVARCHAR2(2000)'
  );


SELECT * FROM "Activities";