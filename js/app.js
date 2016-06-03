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
//Va a contener la posicion actual en la secuencia
var posicion = 0;
//Va a contener el número de elementos de la secuencia
var numElementos= 0;

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
			valor = $.trim(valor);//trim borra espacios en blanco.
			if (valor.length) {
				contentHtml += 
					'<td data-pos="'+index+'">'+valor+'</td>';
				numElementos++;
			}
		});//
		$('#resultados table tr').html(contentHtml);
		$('#resultados').fadeIn();
		//Le cambiamos el paddin-top al body
		$('body').css('padding-top', 0);
	});
	//Accion siguiente
	$('#resultados button[name=siguiente]').click(function () {
		var $tdActual = $('#resultados table tr')
			.find('td[data-pos=' + posicion + ']')
		$tdActual.addClass('revisado');
		var numActual = $tdActual.text();
		mfu(numActual);
		posicion++;
		imprimirFrames(numActual);
		// Detectamos cuando ha concluido la secuencia
		// De haber concluido le agregamos el atributo disabled
		if(numElementos == posicion) {
			$(this).attr('disabled', 'disabled');
		}
	});
	$('#resultados button[name=reset]').click(function () {
		location.reload();
	});
});

/**
 *	Seudo algoritmo MFU
 * =========================
 * 		Para cada n en la secuencia:
 * 			Si n existe en un frame:
 * 				Solo Incrementar frecuencia y finalizar
 * 			Si Existe un frame vació:
 * 				Guardar n en este frame
 * 				Generar Fallo y finalizar
 * 			Si no ha finalizado buscar victima:
 * 				Victima=Frame con mayor frecuencia
 * 			Si existen varios candidatos a victima:
 * 				Victima=Frame con menor marca de tiempo.
 */
function mfu(n) {
	var finalizado = false;
	$.each(frames, function(i, frame) {
		if (frame.valor == n ) {
			frames[i].frec++;
			finalizado = true;
			return false;
		}
		if (frame.valor == 'x') {
			fallo(i, n);
			finalizado = true;
			return false;
		}
	});
	if(finalizado) {
		return true;
	}
	var mayor = -1;
	var index = -1;
	var numMayores = 0;
	$.each(frames, function(i, frame) {
		if(frame.frec>mayor) { //detectamos el mayor
			mayor = frame.frec;
			index = i;
			numMayores = 1;
		}
		if(frame.frec==mayor) { //detectamos los iguales
			numMayores++;
		}
	});
	if (numMayores==1) {
		fallo(index, n);
		return true;
	}
	menor = frames[index].hora;
	for(i=index; i<frames.length; i++) {
		var v = convertirADate(frames[i].hora);
		var vMenor = convertirADate(menor);
		if (vMenor>v) {
			menor = frames[i].hora;
			index = i;
		}
	}
	fallo(index, n);
	// Buscando victima
}

function convertirADate(hora) {
	var data = hora.split(':');
	return new Date(2016, null, null, data[0], data[1], data[2]);
}
function fallo(pos, n){
	frames[pos].valor = n; //escribimo en valor nuevo
	frames[pos].frec = 1;
	var d = new Date();
	frames[pos].hora = d.getHours() + ':' + d.getMinutes()+ ':' +d.getSeconds();
	frames[pos].style = 'fallo';
	//incrementando el número de fallos.
	var numFallos = parseInt($('#fallos').text()) + 1;
	$('#fallos').text(numFallos);
}
/* Genera un código similar a:
<div class='secuencia con-fallo'>
	<h3>3</h3>
	<div class='frame'>
		<span class='frecuencia'>1</span>
		<span class='numero'>5</span>
		<span class='hora'>10:18:32</span>
	</div>
	.. mas frames
</div>
*/
function imprimirFrames(n) {
	var salida = '';
	var con_fallo = '';
	$.each(frames, function(i, f) {
	  salida += "<div class='frame "+f.style+"'>";
	  salida += "<span class='frecuencia'>"+f.frec+"</span>";
	  salida += "<span class='numero'>"+f.valor+"</span>";
	  salida += "<span class='hora'>"+f.hora+"</span>";
	  salida += "</div>";
	  if(f.style == 'fallo') {
		  con_fallo = ' con-fallo';
	  }
	  //Eliminamos todos los estilos de fallos en los frames
	  frames[i].style = 'normal';
	});//end each
	salida = "<div class='secuencia" + con_fallo + "'>" +
			 "<h3>"+n+"</h3>"+salida+"</div>";
	  $('#secuencias').append(salida);
}
