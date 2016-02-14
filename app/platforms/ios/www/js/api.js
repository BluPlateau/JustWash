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
				// Populating the "Cars items" list
				$("#cars").clone().attr("id",carName).appendTo(".list-events");
				$("#"+carName).find(".car-title").attr("carId",carId).text(carName);
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
				var	serviceId		=	item.value1,
						service			=	item.value2,
						description	=	item.value3;
				// Populating the "Service items" list
				$("#services").clone().attr("id",service).appendTo(".list-events");
				$("#"+service).find(".service-title").attr("serviceId",serviceId).text(service);
				$("#"+service).find(".description-new").text(description);
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
				var	subServiceId	=	item.value1,
						subService		=	item.value2,
						description		=	item.value3,
						price					=	item.value4;
				// Populating the "Sub Service items" list
				$("#sub-services").clone().attr("id",subService).appendTo(".list-news");
				$("#"+subService).find(".price").text(price);
				$("#"+subService).find(".sub-service-title").text(subService);
				$("#"+subService).find(".description-new").text(description);
				$("#"+subService).find(".book").attr("sub_service_id",subServiceId);
			});
			// Hiding the Sub Services List Template
			$("#sub-services").css("display","none");
		});
	}

	/*
		Requesting "Car, Service, Sub Service Names & Sub Service Pricing"
		based on selection using the ID's of each section
	*/

	$(document).on("click",".book",function() {
		var	dynamicCarId					=	localStorage.getItem("dynamicCarId"),
				dynamicServiceId			=	localStorage.getItem("dynamicServiceId"),
				dynamicSubServiceId	=	$(this).attr("sub_service_id");

		// $.getJSON(apiUrl+"/index.php?cars_id="+dynamicCarId+"&&services_id="+dynamicServiceId+"&&sub_services_id="+dynamicSubServiceId,
		// function(data) {
		// 	localStorage.setItem("dynamicCarName","Sedan"),
		// 	localStorage.setItem("dynamicServiceName","Water"),
		// 	localStorage.setItem("dynamicSubServicePrice","200"),
		// 	localStorage.setItem("dynamicSubServiceName","Exterior");
		// });

		// Dummy till JSON works
		localStorage.setItem("dynamicCarName","Sedan"),
		localStorage.setItem("dynamicServiceName","Water"),
		localStorage.setItem("dynamicSubServicePrice","200"),
		localStorage.setItem("dynamicSubServiceName","Exterior");
	});
})
