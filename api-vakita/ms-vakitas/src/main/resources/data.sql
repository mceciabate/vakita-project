-- USUARIOS
INSERT INTO vakitadb.users (user_id,user_email) VALUES(1,"andres@micorreo.com");
INSERT INTO vakitadb.users (user_id,user_email) VALUES(2,"mglendinning0@correo.com");
INSERT INTO vakitadb.users (user_id,user_email) VALUES(3,"rrmaria@micorreo.com" );
INSERT INTO vakitadb.users (user_id,user_email) VALUES(4, "andreagal@micorreo.com");
INSERT INTO vakitadb.users (user_id,user_email) VALUES(5, "melodaniel@micorreo.com");
INSERT INTO vakitadb.users (user_id,user_email) VALUES(6,"karenv@micorreo.com");
INSERT INTO vakitadb.users (user_id,user_email) VALUES(7,"josemartinez@micorreo.com");
INSERT INTO vakitadb.users (user_id,user_email) VALUES(8, "fergarcia@micorreo.com");
INSERT INTO vakitadb.users (user_id,user_email) VALUES(9,"luciamesa@micorreo.com");
INSERT INTO vakitadb.users (user_id,user_email) VALUES(10, "diazjuan@micorreo.com");


-- VAKITAS
-- SELECT * FROM VAKITAS;
-- en type 0 es normal(CREARLAS EN NORMAL), en active 1 es true;


INSERT INTO 
vakitadb.vakitas(vakita_id, creation_date, cumulative_amount, expiration_date, is_active, total_amount, type, user_creator_id, img_url,name, description) 
VALUES(1, "2023-04-17", 0.0, "2023-10-17" , 1, 2000, 0, 1, "URL","Cumple Juan", "Fiesta sorpresa para Juan");
INSERT INTO 
vakitadb.vakitas(vakita_id,creation_date, cumulative_amount,expiration_date,is_active,total_amount,type,user_creator_id, img_url,name,description) 
VALUES(2, "2022-12-20", 200.0, "2023-07-10", 1, 2000, 0, 1, "URL", "Paseo familiar", "Conocer el mar");
INSERT INTO 
vakitadb.vakitas(vakita_id, creation_date, cumulative_amount, expiration_date, is_active, total_amount, type, user_creator_id, img_url, name,description) 
VALUES(3, "2023-01-17", 500.0, "2023-09-28", 1, 1000.0, 0, 2,"URL", "Comprar zapatos", "Zapatos comodos");
INSERT INTO 
vakitadb.vakitas(vakita_id,creation_date, cumulative_amount,expiration_date,is_active,total_amount,type,user_creator_id, img_url,name,description) 
VALUES(4, "2023-03-07", 800.0, "2023-09-17", 1, 1500.0, 0, 2, "URL"," San Valentin", "Cita en su restaurante favorito");
INSERT INTO 
vakitadb.vakitas(vakita_id,creation_date, cumulative_amount,expiration_date,is_active,total_amount,type,user_creator_id, img_url,name,description) 
VALUES(5, "2023-05-13", 950.0, "2023-10-02", 1, 3000.0, 0 , 3, "URL", "Salida con amigos", "Ir a la montaña a divertirnos");
INSERT INTO 
vakitadb.vakitas(vakita_id, creation_date, cumulative_amount, expiration_date, is_active, total_amount, type, user_creator_id, img_url,name, description) 
VALUES(6, "2023-04-17", 0.0, "2023-04-25", 1, 2000.0, 0, 4, "url", "Viernes de karaoke", "Compartir con mis amigas mientras nos divertimos");
INSERT INTO 
vakitadb.vakitas(vakita_id,creation_date, cumulative_amount, expiration_date, is_active, total_amount, type, user_creator_id, img_url, name, description) 
VALUES(7, "2023-06-20", 350.0, "2023-06-30", 1, 3500.0, 0, 5, "URL", "Partido en la empresa", "Jugar por unas polas");
INSERT INTO 
vakitadb.vakitas(vakita_id, creation_date, cumulative_amount, expiration_date, is_active, total_amount, type, user_creator_id, img_url, name, description) 
VALUES(8, "2023-01-17", 500.0, "2023-09-28", 1, 1000.0, 0, 6,"URL", "Exposición de arte", "Ver las obras de Botero");
INSERT INTO 
vakitadb.vakitas(vakita_id,creation_date, cumulative_amount,expiration_date,is_active,total_amount,type,user_creator_id, img_url,name,description) 
VALUES(9, "2023-11-17", 800.0, "2023-12-17", 1, 1500.0, 0, 7,"URL", "Ir a el concierto", "Ver la banda tocar en vivo !!");
INSERT INTO 
vakitadb.vakitas(vakita_id,creation_date, cumulative_amount,expiration_date,is_active,total_amount,type,user_creator_id, img_url,name,description) 
VALUES(10, "2023-01-10", 1500.0, "2023-05-02", 1, 2000.0, 0, 8,"URL", "Adoptar un perrito", "Comprarle lo que necesita para su llegada");



-- TABLA INTERMEDIA: Ojo con estos datos, LO MISMO QUE PUSIERON EN VAKITA DEBE ESTAR AQUI:
-- EL ID DE LA VAKITA QUE CREARON CON EL ID QUE LE PUSIERON COMO OWNER, DESDE EL CODE LA TABLA SE COMPLETARÁ SOLA
-- SELECT * FROM vakita_has_contributors; 
INSERT INTO vakitadb.vakita_has_contributors(user_id, vakita_id) VALUES (1, 1); -- MANDATORY: primer dato: dato owner que la creó, segundo dato: id de la vakita
INSERT INTO vakitadb.vakita_has_contributors(user_id, vakita_id) VALUES (2, 1); -- ACÁ LE ESTOY AGREGANDO UN CONTRIBUYENTE A LA VAKITA QUE ADEMAS YA TIENE EN LA LISTA SU OWNER
INSERT INTO vakitadb.vakita_has_contributors(user_id, vakita_id) VALUES (1, 2);
INSERT INTO vakitadb.vakita_has_contributors (user_id, vakita_id) VALUES (2, 3);
INSERT INTO vakitadb.vakita_has_contributors (user_id, vakita_id) VALUES (2, 4);
INSERT INTO vakitadb.vakita_has_contributors(user_id, vakita_id) VALUES (3, 5);
INSERT INTO vakitadb.vakita_has_contributors(user_id, vakita_id) VALUES (4, 6);
INSERT INTO vakitadb.vakita_has_contributors (user_id, vakita_id) VALUES (5, 7);
INSERT INTO vakitadb.vakita_has_contributors (user_id, vakita_id) VALUES (6, 8);
INSERT INTO vakitadb.vakita_has_contributors (user_id, vakita_id) VALUES (7, 9);
INSERT INTO vakitadb.vakita_has_contributors (user_id, vakita_id) VALUES (8, 10);

-- ejemplo: le agrego a la vakita 10 mas contribuyentes(el que está arriba de esta línea es su owner)
INSERT INTO vakitadb.vakita_has_contributors (user_id, vakita_id) VALUES (9, 10);
INSERT INTO vakitadb.vakita_has_contributors (user_id, vakita_id) VALUES (3, 10);
INSERT INTO vakitadb.vakita_has_contributors (user_id, vakita_id) VALUES (4, 10);


