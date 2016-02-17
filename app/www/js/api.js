jQuery(document).ready(function($){
	//body
	$(function() {
		$( "#datepicker" ).datepicker();
	});
	
	//API
	var apiUrl		=	"http://justwashapi.gsprasad.com",
			cars		=	apiUrl+"/index.php?cars";

	// Loading Cars Data
	if ($("#cars").length > 0) {
		$.getJSON(apiUrl+"/index.php?cars",
		function(data) {
			$.each(data, function(i,item) {
				var	carId			=	item.value1,
						carName	=	item.value2;
						carImage	=	item.value3;
						logicalCarName	=	carName.replace(' ','');
				// Populating the "Cars items" list
				$("#cars").clone().attr("id",logicalCarName).appendTo(".list-events");
				$("#"+logicalCarName).find(".car-title").attr("carId",carId).text(carName);
			});
			// Hiding the Cars List Template
			$("#cars").css("display","none");
		});
	}
	
	// Requesting Service Data based on selected "Car Type"
	$(document).on("click",".car-title",function(e) {
		e.preventDefault();
		var	currentCarId	=	$(this).attr("carId");
		localStorage.setItem("dynamicCarId", currentCarId);
		window.location.href = "jw_services.html";
	});

	// Loading Services Data
	if ($("#services").length > 0) {
		var	dynamicCarId	=	localStorage.getItem("dynamicCarId");
		$.getJSON(apiUrl+"/index.php?car_id="+dynamicCarId,
		function(data) {
			$.each(data, function(i,item) {
				var	serviceId					=	item.value1,
						service						=	item.value2,
						serviceImage			=	item.value3,
						description				=	item.value4,
						logicalService	=	service.replace(' ','');
				// Populating the "Service items" list
				$("#services").clone().attr("id",logicalService).appendTo(".list-events");
				$("#"+logicalService).find(".service-title").attr("serviceId",serviceId).text(service);
				$("#"+logicalService).find(".description-new").text(description);
			});
			// Hiding the Services List Template
			$("#services").css("display","none");
		});
	}

	// Requesting Sub Service Data based on selected "Service Type"
	$(document).on("click",".service-title",function(e) {
		e.preventDefault();
		var	currentServiceId	=	$(this).attr("serviceId");
		localStorage.setItem("dynamicServiceId",currentServiceId);
		window.location.href = "jw_sub_services.html";
	});

	// Loading Sub Services Data
	if($("#sub-services").length > 0) {
		var	dynamicCarId			=	localStorage.getItem("dynamicCarId"),
				dynamicServiceId	=	localStorage.getItem("dynamicServiceId");
		$.getJSON(apiUrl+"/index.php?cars_id="+dynamicCarId+"&&services_id="+dynamicServiceId,
		function(data) {
			$.each(data, function(i, item) {
				var	subServiceId				=	item.value1,
						subService					=	item.value2,
						description					=	item.value3,
						subServiceImage		=	item.value4,
						price								=	item.value5,
						logicalSubService	=	subService.replace(' ','');
				// Populating the "Sub Service items" list
				$("#sub-services").clone().attr("id",logicalSubService).appendTo(".list-news");
				$("#"+logicalSubService).find(".price").text(price);
				$("#"+logicalSubService).find(".sub-service-title").text(subService);
				$("#"+logicalSubService).find(".description-new").text(description);
				$("#"+logicalSubService).find(".book").attr("sub_service_id",subServiceId);
			});
			// Hiding the Sub Services List Template
			$("#sub-services").css("display","none");
		});
	}

	/*
		Requesting "Car, Service, Sub Service Names & Sub Service
		Pricing" based on selection using the ID's of each section

		Geo location is tracked using "Phonegap GeoLocation" & "Google
		Latlng API"
	*/
	$(document).on("click",".book",function() {
		var	dynamicCarId					=	localStorage.getItem("dynamicCarId"),
				dynamicServiceId			=	localStorage.getItem("dynamicServiceId"),
				dynamicSubServiceId	=	$(this).attr("sub_service_id");

		$.getJSON(apiUrl+"/index.php?carid="+dynamicCarId+"&&serviceid="+dynamicServiceId+"&&subserviceid="+dynamicSubServiceId,
		function(data) {
			$.each(data, function(i,item) {
				var	dynamicCarName					=	item.value2,
						dynamicServiceName			=	item.value3,
						dynamicSubServiceName	=	item.value4,
						dynamicSubServicePrice		=	item.value5;	
				localStorage.setItem("dynamicCarName",dynamicCarName),
				localStorage.setItem("dynamicServiceName",dynamicServiceName),
				localStorage.setItem("dynamicSubServicePrice",dynamicSubServicePrice),
				localStorage.setItem("dynamicSubServiceName",dynamicSubServiceName);
			});
		});

		// Getting the user coordinates using "Phonegap Plugin"
		navigator.geolocation.getCurrentPosition(onSuccess, onError);

		function onSuccess(position) {
			// alert("Hello");
			var coords = position.coords.latitude + "," + position.coords.longitude;
			$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + coords,
			function(data) {
				var currentLocation	=	data.results[0].formatted_address;
				localStorage.setItem("currentLocation",currentLocation);
				window.location.href="customerdetails.html";
			});
		}

		// onError Callback receives a PositionError object
		function onError(error) {
		    alert('code: '    + error.code    + '\n' +
		          'message: ' + error.message + '\n');
		}
	});

	// Loading Address Data
	if ($("#customerdetails").length>0) {
		var	retrievedLocation		=	localStorage.getItem("currentLocation");
		$(this).find("input[name='address']").val(retrievedLocation);
	}

	// Loading Invoice Details
	if($("#invoicedetails").length>0) {
		var	paymentStatus	=	localStorage.getItem("paymentStatus");
		if (paymentStatus == "approved") {
			// Collecting all the session variables required
			var	retrievedLocation		=	localStorage.getItem("currentLocation"),
					fullName						=	localStorage.getItem("fullName"),
					email								=	localStorage.getItem("email"),
					phone							=	localStorage.getItem("phone"),
					serviceDate				=	localStorage.getItem("servicedate"),
					hours								=	localStorage.getItem("hours"),
					minutes						=	localStorage.getItem("minutes"),
					invoiceId						=	localStorage.getItem("invoiceId"),
					paidAmount				=	localStorage.getItem("dynamicSubServicePrice"),
					serviceName				=	localStorage.getItem("dynamicCarName") + " " + localStorage.getItem("dynamicSubServiceName") + " " + localStorage.getItem("dynamicServiceName");
			
			//	Assigning Values
			$(this).find("input[name='address']").val(retrievedLocation);
			$(this).find("input[name='fullname']").val(fullName);
			$(this).find("input[name='email']").val(email);
			$(this).find("input[name='phone']").val(phone);
			$(this).find("input[name='servicedate']").val(serviceDate);
			$(this).find("input[name='servicename']").val(serviceName);
			$(this).find("input[name='hours']").val(hours);
			$(this).find("input[name='minutes']").val(minutes);
			$(this).find("input[name='invoiceid']").val(invoiceId);
			$(this).find("input[name='paidamount']").val(paidAmount);
		} else {
			alert("Payment unSuccessful")
		}
	}
})
