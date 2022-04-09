USE APPDDBB0001;

INSERT INTO Activities (Id,Title,Date,Description,Category,City,Venue) VALUES
(NEWID(),'Past Activity 1','01/15/2021','Activity','Drinks','London','Pub'),
(NEWID(),'Past Activity 2','05/15/2021','Activity','Culture','Paris','Louvre'),
(NEWID(),'Future Activity 1','04/15/2022','Activity ','Culture','London','Natural History Museum'),
(NEWID(),'Future Activity 2','05/15/2022','Activity','Music','London','O2 Arena'),
(NEWID(),'Future Activity 3','06/15/2022','Activity','Drinks','London','Another pub'),
(NEWID(),'Future Activity 4','07/15/2022','Activity','Drinks','London','Yet another pub'),
(NEWID(),'Future Activity 5','08/01/2022','Activity','Drinks','London','Just another pub');

SELECT * FROM Activities;