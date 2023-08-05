
INSERT INTO 
vakitadb.vakitas(vaquita_id, creation_date, cumulative_amount, expiration_date, is_active, total_amount, type, user_id, img_url,name, description) 
VALUES(1,"2023-04-17",1000,"2023-10-17",1,2000,1,2,"https://leadsales.io/wp-content/uploads/2022/03/como-tener-mi-fondo-de-ahorro-1024x683.jpg","Cumple Juan", "Fiesta sorpresa para Juan");
INSERT INTO 
vakitadb.vakitas(vaquita_id,creation_date, cumulative_amount,expiration_date,is_active,total_amount,type,user_id, img_url,name,description) 
VALUES(2,"2022-12-20",2000,"2023-07-10",0,2000,0,3,"https://leadsales.io/wp-content/uploads/2022/03/como-tener-mi-fondo-de-ahorro-1024x683.jpg","Paseo familiar", "Conocer el mar");
INSERT INTO 
vakitadb.vakitas(vaquita_id, creation_date, cumulative_amount, expiration_date, is_active, total_amount, type, user_id, img_url, name,description) 
VALUES(3,"2023-01-17",500,"2023-09-28",1,1000,1,4,"https://leadsales.io/wp-content/uploads/2022/03/como-tener-mi-fondo-de-ahorro-1024x683.jpg","Comprar zapatos", "Zapatos comodos");
INSERT INTO 
vakitadb.vakitas(vaquita_id,creation_date, cumulative_amount,expiration_date,is_active,total_amount,type,user_id, img_url,name,description) 
VALUES(4,"2023-03-07",800,"2023-09-17",1,1500,1,1,"https://leadsales.io/wp-content/uploads/2022/03/como-tener-mi-fondo-de-ahorro-1024x683.jpg","San Valentin", "Cita en su restaurante favorito");
INSERT INTO 
vakitadb.vakitas(vaquita_id,creation_date, cumulative_amount,expiration_date,is_active,total_amount,type,user_id, img_url,name,description) 
VALUES(5,"2023-05-13",950,"2023-10-02",1,3000,0,7,"https://leadsales.io/wp-content/uploads/2022/03/como-tener-mi-fondo-de-ahorro-1024x683.jpg","Salida con amigos", "Ir a la montaña a divertirnos");
INSERT INTO 
vakitadb.vakitas(vaquita_id, creation_date, cumulative_amount, expiration_date, is_active, total_amount, type, user_id, img_url,name, description) 
VALUES(6,"2023-04-17",1000,"2023-04-25",0,2000,1,5,"https://leadsales.io/wp-content/uploads/2022/03/como-tener-mi-fondo-de-ahorro-1024x683.jpg","Viernes de karaoke", "Compartir con mis amigas mientras nos divertimos");
INSERT INTO 
vakitadb.vakitas(vaquita_id,creation_date, cumulative_amount, expiration_date, is_active, total_amount, type, user_id, img_url, name, description) 
VALUES(7,"2023-06-20",3500,"2023-06-30",0,3500,0,8,"https://leadsales.io/wp-content/uploads/2022/03/como-tener-mi-fondo-de-ahorro-1024x683.jpg","Partido en la empresa", "Jugar por unas polas");
INSERT INTO 
vakitadb.vakitas(vaquita_id, creation_date, cumulative_amount, expiration_date, is_active, total_amount, type, user_id, img_url, name, description) 
VALUES(8,"2023-01-17",500,"2023-09-28",1,1000,0,9,"https://leadsales.io/wp-content/uploads/2022/03/como-tener-mi-fondo-de-ahorro-1024x683.jpg","Exposición de arte", "Ver las obras de Botero");
INSERT INTO 
vakitadb.vakitas(vaquita_id,creation_date, cumulative_amount,expiration_date,is_active,total_amount,type,user_id, img_url,name,description) 
VALUES(9,"2023-11-17",800,"2023-12-17",1,1500,0,10,"https://leadsales.io/wp-content/uploads/2022/03/como-tener-mi-fondo-de-ahorro-1024x683.jpg","Ir a el concierto", "Ver la banda tocar en vivo !!");
INSERT INTO 
vakitadb.vakitas(vaquita_id,creation_date, cumulative_amount,expiration_date,is_active,total_amount,type,user_id, img_url,name,description) 
VALUES(10,"2023-01-10",1500,"2023-05-02",1,2000,1,6,"https://leadsales.io/wp-content/uploads/2022/03/como-tener-mi-fondo-de-ahorro-1024x683.jpg","Adoptar un perrito", "Comprarle lo que necesita para su llegada");

INSERT INTO 
vakitadb.user (id,email) 
VALUES(1,"andres@micorreo.com");
INSERT INTO 
vakitadb.user (id,email) 
VALUES(2,"mglendinning0@correo.com");
INSERT INTO 
vakitadb.user (id,email) 
VALUES(3,"rrmaria@micorreo.com" );
INSERT INTO 
vakitadb.user (id,email) 
VALUES(4, "andreagal@micorreo.com");
INSERT INTO 
vakitadb.user (id,email) 
VALUES(5, "melodaniel@micorreo.com");
INSERT INTO 
vakitadb.user (id,email) 
VALUES(6,"karenv@micorreo.com");
INSERT INTO 
vakitadb.user (id,email) 
VALUES(7,"josemartinez@micorreo.com");
INSERT INTO 
vakitadb.user (id,email) 
VALUES(8, "fergarcia@micorreo.com");
INSERT INTO 
vakitadb.user (id,email) 
VALUES(9,"luciamesa@micorreo.com");
INSERT INTO 
vakitadb.user (id,email) 
VALUES(10, "diazjuan@micorreo.com");

INSERT INTO vakitadb.vakitas_users (fk_users, fk_vakita) VALUES (1,2);
INSERT INTO vakitadb.vakitas_users(fk_users, fk_vakita) VALUES (5,2);
INSERT INTO vakitadb.vakitas_users (fk_users, fk_vakita) VALUES (5,4);
INSERT INTO vakitadb.vakitas_users (fk_users, fk_vakita) VALUES (2,3);
