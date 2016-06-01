Simulador MFU:
====================================
Un simple simulador en html5.

Seudo algoritmo MFU
-----------------------------------------

		Para cada n en la secuencia:
			Si Existe un frame vació:
				Guardar n en este frame
				Generar Fallo
			Caso contrario:
				Si n existe en un frame:
					Incrementar frecuencia.
				Caso Contrario:
					Victima=Frame con mayor frecuencia
				Si existen varios candidatos a victima:
					Victima=Frame con menor marca de tiempo.
 

Descripción de archivos.

	.
	├── css
	│   └── style.css			<-- Estilo del app
	├── index.html				<-- Aplicación
	└── js
		├── app.js				<-- Js de la app
		└── jquery-1.11.3.js	<- Librería jQuery
