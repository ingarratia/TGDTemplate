/*=========================================================================================
	File Name: list.js
	Description: Adds search, sort, filters and flexibility to plain HTML lists
	----------------------------------------------------------------------------------------
	Item Name: Modern Admin - Clean Bootstrap 4 Dashboard HTML Template
	Author: PIXINVENT
	Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
$(document).ready(function(){

	var numItems = 0;
	var codigoProductoPredial = '123456';
	var codigoProductoManifiesto = '56789';

	/************************************************
	*				Add Get Remove					*
	************************************************/
	var options = {
		valueNames: ['Catastro', 'Nombre', 'Direccion']
	};
	 
	
	var shoppingCartViewModel = {
		ticket : '0',
		tiendaId : '0',
		fechaTransaccion : '',
		usuarioId : '',
		workStation : '',
		clienteId : '',
		total : 0,
		subtotal : 0,
		iva : 0,
		comision : 0,
		cambio : 0,
		otroImpuesto : 0,
		numArticulos : 0,
		lineas : [],
		formasPago : { 
						formaPagoId : '1',
						formaPagoNombre : 'Contado',
						Monto : 0
					}		
	};
	
	var lineaViewModel = {		
		lineaId : 0,
		codigoArticulo : '',
		descripcionArticulo: '',
		cantidad : 0,
		precioUnitario: 0,
		importe : 0,
		iva : 0		
	};
	
	var formaPagoViewModel = {
		formaPagoId : 0,
		formaPagoNombre: ''		
	};
	
	

	// Init list
	var contactList2 = new List('editable-list2', options);
	
	// var objShoppingCartDetail = new List('shoppingCartDetail', shoppingCartDetail);
	var objShoppingCartDetail = null ;

	var NumArticulo = 1,
		Codigo = '666',
		Nombre = 'Predial|Ref 123456',
		Cantidad = 1,
		Precio = '$500.00',
		Importe = '$500.00',
		//addBtn = $('.remove-item-btn'), /*$('#add-btn'),*/
		
		removeBtns = $('.select-item-btn');
		//editBtns = $('.edit-item-btn');

	/*var idField = $('#id-field'),
		nameField = $('#name-field'),
		ageField = $('#age-field'),
		cityField = $('#city-field'),
		addBtn = $('#add-btn'),
		editBtn = $('#edit-btn').hide(),
		removeBtns = $('.remove-item-btn'),
		editBtns = $('.edit-item-btn');
	*/
	
	// Sets callbacks to the buttons in the list
	refreshCallbacks();

/*
	addBtn.on('click', function() {
		
		alert(objShoppingCartDetail);
		
		if (objShoppingCartDetail == null )
		{
			var options = {
				valueNames: ['NumArticulo', 'Codigo', 'Producto','Cantidad','Precio','Importe']
			};
						
			var values = [{
				NumArticulo: '22',
				Codigo: 99999,
				Producto: 'Pago Servicio Predial|Ref 22222',
				Cantidad: 1,
				Precio: '$200.00',
				Importe: '$200.00'
			}
			];

			objShoppingCartDetail = new List('shoppingCartDetail', options,values);
			
			objShoppingCartDetail.add({
				NumArticulo: '33',
				Codigo: 99999,
				Producto: 'Pago Servicio Predial|Ref 22222',
				Cantidad: 1,
				Precio: '$200.00',
				Importe: '$200.00'
			});
			
			alert(JSON.stringify(objShoppingCartDetail));
		}
		else
		{
			objShoppingCartDetail.add({
				NumArticulo: '33',
				Codigo: 99999,
				Producto: 'Pago Servicio Predial|Ref 22222',
				Cantidad: 1,
				Precio: '$200.00',
				Importe: '$200.00'
			});
			
		}
		
		
	});
	*/
	
	/*
	$(".select-item-btn").on("click", function () {
		
		
		GetSelectedRow();
		
        var newRow = $("<tr>");
        var cols = "";

        cols += '<td>'+ (numItems + 1 ) +'</td>';
        cols += '<td>1</td>';
        cols += '<td>1</td>';
		cols += '<td>1</td>';
		cols += '<td>1</td>';
		cols += '<td>1</td>';
        cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Eliminar"></td>';
		//cols += '<td><a href="#"><i class="ibtnDel ft-trash-2"></i></a></td>';
		// <a href="#"><i class="ft-trash-2"></i></a>
        newRow.append(cols);
        $("#shoppingCartTable").append(newRow);
        numItems++;
    });
	*/
	
	
	$("#shoppingCartTable").on("click", ".select-item-btn", function (event) {
        $(this).closest("tr").remove();       
        numItems -= 1
    });
	
	
	
	// 
	$("#tableContribuyente").on("click", ".select-item-btn", function (event) {
		var currentRow=$(this).closest("tr"); 	

		var referenciaCatastro=currentRow.find("td:eq(1)").text(); // Get the Catastro ID
		var totalPredial=currentRow.find("td:eq(4)").text(); // Get amount for Predial service
		var totalManifiesto=currentRow.find("td:eq(5)").text(); // Get amount for Manifiesto service
		var newRowPredial = $("<tr>");
		var newRowManifiesto = $("<tr>");
        var cols = "";
		
		// Add Predial Service row
		cols += '<td>'+ (numItems + 1 ) +'</td>';
        cols += '<td>'+ codigoProductoPredial +'</td>';
		cols += '<td>'+ 'Servicio Predial|' +  referenciaCatastro + '</td>';
		cols += '<td>1</td>';
		cols += '<td>'+ totalPredial +'</td>';
		cols += '<td>'+ totalPredial +'</td>';
		cols += '<td></td>';
        //cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Eliminar"></td>';
        newRowPredial.append(cols);
        $("#shoppingCartTable").append(newRowPredial);
        numItems++;

		cols = "";
		// Add Manifiesto Service row
        cols += '<td>'+ (numItems + 1 ) +'</td>';
        cols += '<td>'+ codigoProductoManifiesto +'</td>';
		cols += '<td>'+ 'Servicio Manifiesto|' +  referenciaCatastro + '</td>';
		cols += '<td>1</td>';
		cols += '<td>'+ totalManifiesto +'</td>';
		cols += '<td>'+ totalManifiesto +'</td>';
		cols += '<td></td>';
        //cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Eliminar"></td>';
        newRowManifiesto.append(cols);
        $("#shoppingCartTable").append(newRowManifiesto);
		numItems++;
		
		UpdateViewModel();
		
    });	
	
	
	$("#btnCancelar").on("click", function (event) {
		$("#shoppingCartTable > tbody").empty();	
		numItems = 0;
		UpdateViewModel();
	});
	
	
	function UpdateViewModel() {
		
		
		// Cantidad de articulos
		shoppingCartViewModel.numArticulos = 0 ;
		$('#shoppingCartTable tr').each(function() {
			var numArticulo = parseInt($('td', this).eq(5).text());
			if (!isNaN(numArticulo)) {					
				shoppingCartViewModel.numArticulos += 1;
			}
			
		});
		
		// Total
		shoppingCartViewModel.total = 0.0 ;
		$('#shoppingCartTable tr').each(function() {
			var total = parseInt($('td', this).eq(5).text());
			if (!isNaN(total)) {					
				shoppingCartViewModel.total += total;
			}
		});
		
		$('#total').text(shoppingCartViewModel.total);
		$('#numArticulos').text(shoppingCartViewModel.numArticulos);
		
	}

	
	
	
	
	

	function refreshCallbacks() {
		// Needed to add new buttons to jQuery-extended object
		/*
		removeBtns = $(removeBtns.selector);
		editBtns = $(editBtns.selector);

		removeBtns.on('click', function() {
			var itemId = $(this).closest('tr').find('.id').text();
			contactList.remove('id', itemId);
		});

		editBtns.on('click', function() {
			var itemId = $(this).closest('tr').find('.id').text();
			var itemValues = contactList.get('id', itemId)[0].values();
			idField.val(itemValues.id);
			nameField.val(itemValues.name);
			ageField.val(itemValues.age);
			cityField.val(itemValues.city);

			editBtn.show();
			addBtn.hide();
		});
		*/
	}

	function clearFields() {
		nameField.val('');
		ageField.val('');
		cityField.val('');
	}


	

});