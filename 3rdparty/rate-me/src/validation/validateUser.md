## Validar usuarios

En un intento de mejorar nuestro código, contratamos a un freelance que nos salía muy barato para que nos ayudara en el proyecto.
Nos ha entregado una primera parte de lo pactado, la validación de usuarios, pero creemos que algo no está bien. En cambio, los test pasan...
Nuestro departamento interno de IT ha echado un ojo al código y dicen que es incomprensible y que está mal estructurado.
Estas son nuestras reglas de validación de usuarios:


- Todo usuario debe tener un email válido
- Hace poco hemos introducido los usuarios referidos. Vienen a ser usuarios recomendados por otras empresas. Para los usuarios referidos, en las comunicaciones, usamos el email del usuario que los ha recomendado. Entonces, no todos los usuarios deben tener email. Los referidos no tendrán.
- Todo usuario tiene que tener nombre y apellidos.
- Todo usuario tiene que tener una fecha de nacimiento válida.
- En la misma evolución en la que introdujimos usuarios referidos, decidimos que los usuarios que nos recomiendan a otros usuarios se merecían un descuento. Así que definimos dos capas de usuarios:
  - Usuarios *regular*: cualquier usuario que no nos ha recomendado a nadie. No tendrá descuento.
  - Usuarios *premium*: nos han recomendado otros usuarios, tienen que tener un descuento.