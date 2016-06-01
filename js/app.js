var frames = [
	{ //frame 1
		valor:	'x',
		frec:	'0',
		hora:	'00:00:00',//hh:mm:ss
		style: 'normal' //fallo
	},
	{ //frame 2
		valor:	'x',
		frec:	'0',
		hora:	'00:00:00',//hh:mm:ss
		style: 'normal' //fallo
	},
	{
		valor:	'x',
		frec:	'0',
		hora:	'00:00:00',//hh:mm:ss
		style: 'normal' //fallo
	}
];
var posicion = 0;
$(function () {
	//cacha los datos, los pasa a la tabla y oculta
	//solicitud de datos
	$('#resultados').hide();
	$('#solicitud_datos button').click(function() {
		$papa = $(this).closest('div');
		//ocultamos al padre
		$papa.fadeOut();
		var data = $papa.find('input').val();
		data = data.split(',');
		var contentHtml = '';
		$.each(data, function(index, valor) {
			contentHtml += 
				'<td data-pos="'+index+'">'+valor+'</td>';
		});//
		$('#resultados table tr').html(contentHtml);
		$('#resultados').fadeIn();
	});
	$('#resultados button').click(function () {
		var numActual = $('#resultados table tr')
			.find('[data-pos=' + posicion + ']')
			.text();
		mfu(numActual);
		posicion++;
	});
});
/**
 *	Seundo algoritmo MFU
 * =========================
 * 		Para cada n en la secuencia:
 * 			Si Existe un frame vació:
 * 				Guardar n en este frame
 * 				Generar Fallo
 *			Caso contrario:
 * 				Si n existe en un frame:
 * 					Incrementar frecuencia.
 * 				Caso Contrario:
 * 					Victima=Frame con mayor frecuencia
 * 				Si existen varios candidatos a victima:
 * 					Victima=Frame con menor marca de tiempo.
 */
function mfu(n) {
	$.each(frames, function(i, frame) {
		if (frame.valor == 'x') {
			fallo(i, n);
			console.log('frame vacio detectado');
			return false;
		}
	});
	imprimirFrames();
}

function fallo(pos, n){
	frames[pos].valor = n; //escribimo en valor nuevo
	frames[pos].frec = 1;
	var d = new Date();
	frames[pos].hora = d.getHours() + ':' + d.getMinutes()+ ':' +d.getSeconds();
	frames[pos].style = 'fallo';
	$.each(frames, function(i, frame) {
	  if (i != pos) {
		  frames[i].style = 'normal';
		}
	});
}

function imprimirFrames(){
	console.log(frames);
}
