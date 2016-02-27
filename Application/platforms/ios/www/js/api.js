/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 // var app = {
 //     // Application Constructor
 //     initialize: function() {
 //         this.bindEvents();
 //     },
 //     // Bind Event Listeners
 //     //
 //     // Bind any events that are required on startup. Common events are:
 //     // 'load', 'deviceready', 'offline', and 'online'.
 //     bindEvents: function() {
 //         document.addEventListener('deviceready', this.onDeviceReady, false);
 //     },
 //     // deviceready Event Handler
 //     //
 //     // The scope of 'this' is the event. In order to call the 'receivedEvent'
 //     // function, we must explicitly call 'app.receivedEvent(...);'
 //     onDeviceReady: function() {
 //     	// Handle the offline event
 //     	navigator.notification.alert(
 //     		"Checking",
 //     		function() {},
 //     		"Just Wash",
 //     		"Ok"
 //     	);
 //     }
 // };

 // app.initialize();

jQuery(document).ready(function($){
	//body

	/* Required Plugins Intialization */

	// EventListner
	document.addEventListener("deviceready", onDeviceReady, true);

	// Device Ready
	function onDeviceReady() {
		document.addEventListener("offline", onOffline, false);
		function onOffline() {
			// Handle the offline event
			navigator.notification.alert(
				"Check your Internet",
				function() {},
				"Just Wash",
				"Ok"
			);
		}
	}

	//API
	var apiUrl		=	"http://justwashapi.gsprasad.com";

	// Global Variables
	var reg	= new RegExp(" ","g"); // For Substituting spaces in ID Names

	// Preventing Default Action of a click in "li"
	$(document).on("click", "li >a", function(e) {
		e.preventDefault();
	})
	
	// Loading Cars Data
	if ($("#cars").length > 0) {
		$.getJSON(apiUrl+"?cars",
		function(data) {
			$.each(data, function(i,item) {
				reg;
				var	carId			=	item.value1,
						carName	=	item.value2;
						carImage	=	apiUrl + "/uploads/cars/" + item.value3;
						logicalCarName	=	carName.replace(reg,"");
				// Populating the "Cars items" list
				$("#cars").clone().attr("id",logicalCarName).appendTo(".list-events");
				$("#"+logicalCarName).find(".car-title").text(carName);
				$("#"+logicalCarName).find(".car-block").attr("carId",carId);
				$("#"+logicalCarName).find(".image-calendar-event >img").attr("src",carImage);
			});
			// Hiding the Cars List Template
			$("#cars").css("display","none");
		});
	}
	
	// Requesting Service Data based on selected "Car Type"
	$(document).on("click",".car-block",function(e) {
		e.preventDefault();
		var	currentCarId	=	$(this).attr("carId");
		localStorage.setItem("dynamicCarId", currentCarId);
		window.location.href = "jw_services.html";
	});

	// Loading Services Data
	if ($("#services").length > 0) {
		var	dynamicCarId	=	localStorage.getItem("dynamicCarId");
		$.getJSON(apiUrl+"?car_id="+dynamicCarId,
		function(data) {
			$.each(data, function(i,item) {
				reg;
				var	serviceId					=	item.value1,
						service						=	item.value2,
						serviceImage			=	apiUrl + "/uploads/services/" + item.value3,
						description				=	item.value4,
						logicalService		=	service.replace(reg,"");
				// Populating the "Service items" list
				$("#services").clone().attr("id",logicalService).appendTo(".list-events");
				$("#"+logicalService).find(".service-title").text(service);
				$("#"+logicalService).find(".service-block").attr("serviceId",serviceId);
				$("#"+logicalService).find(".description-new").text(description);
				$("#"+logicalService).find(".image-calendar-event >img").attr("src",serviceImage);
			});
			// Hiding the Services List Template
			$("#services").css("display","none");
		});
	}

	// Requesting Sub Service Data based on selected "Service Type"
	$(document).on("click",".service-block",function(e) {
		e.preventDefault();
		var	currentServiceId	=	$(this).attr("serviceId");
		localStorage.setItem("dynamicServiceId",currentServiceId);
		window.location.href = "jw_sub_services.html";
	});

	// Loading Sub Services Data
	if($("#sub-services").length > 0) {
		var	dynamicCarId			=	localStorage.getItem("dynamicCarId"),
				dynamicServiceId	=	localStorage.getItem("dynamicServiceId");
		$.getJSON(apiUrl+"?cars_id="+dynamicCarId+"&&services_id="+dynamicServiceId,
		function(data) {
			$.each(data, function(i, item) {
				reg;
				var	subServiceId				=	item.value1,
						subService					=	item.value2,
						description					=	item.value3,
						subServiceImage		=	apiUrl + "/uploads/subservices/" + item.value4,
						price								=	item.value5,
						logicalSubService	=	subService.replace(reg,"");
				// Populating the "Sub Service items" list
				$("#sub-services").clone().attr("id",logicalSubService).appendTo(".list-news");
				$("#"+logicalSubService).find(".price").text(price);
				$("#"+logicalSubService).find(".sub-service-title").text(subService);
				$("#"+logicalSubService).find(".description-new").text(description);
				$("#"+logicalSubService).find(".book").attr("sub_service_id",subServiceId);
				$("#"+logicalSubService).find(".image-news > img").attr("src",subServiceImage);
			});
			// Hiding the Sub Services List Template
			$("#sub-services").css("display","none");
		});
	};

	/*
		Requesting "Car, Service, Sub Service Names & Sub Service
		Pricing" based on selection using the ID's of each section

		Geo location is tracked using "Phonegap GeoLocation" & "Google
		Latlng API"
	*/

	$(document).on("click","#book",function(e) {
		e.preventDefault();

		var	dynamicCarId					=	localStorage.getItem("dynamicCarId"),
				dynamicServiceId			=	localStorage.getItem("dynamicServiceId"),
				dynamicSubServiceId	=	$(this).attr("sub_service_id");

		$.getJSON(apiUrl+"?carid="+dynamicCarId+"&&serviceid="+dynamicServiceId+"&&subserviceid="+dynamicSubServiceId,
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
		// Options for Navigation
		var	options	=	{
			enableHighAccuracy	:	true, 
			maximumAge				:	300,
			timeout								:	5000
		};

		navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

		function onSuccess(position) {
			var coords = position.coords.latitude + "," + position.coords.longitude;
			$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + coords,
			function(data) {
				var currentLocation	=	data.results[0].formatted_address;
				localStorage.setItem("currentLocation",currentLocation);
				window.location.href="jw_customerdetails.html";
			});
		}

		function onError(error) {
			document.addEventListener("deviceready", onDeviceReady, true);
			function onDeviceReady () {
				navigator.notification.alert(
					'We are unable to detect your Location. Please check your GPS Settings',
					function(){},
					'Just Wash',
					'OK'
				);
			}
		}
	});

	// Loading Address Data
	if ($("#customerdetails").length>0) {
		$( "#datepicker" ).datepicker();
		var	retrievedLocation		=	localStorage.getItem("currentLocation");
		$(this).find("input[name='address']").val(retrievedLocation);
		var paymentOption = document.getElementById("paymentoption");
		paymentOption.onclick = function(e) {
			// parameters for invoicing
			// Collecting Values
			var	customerFullName 		=	$("#customerdetails").find("input[name='fullname']").val(),
					customerEmail 				=	$("#customerdetails").find("input[name='email']").val(),
					customerPhone 				=	$("#customerdetails").find("input[name='phone']").val(),
					customerServiceDate 	=	$("#customerdetails").find("input[name='servicedate']").val(),
					customerHours 				=	$("#customerdetails").find("#hours").val(),
					customerMinutes 			=	$("#customerdetails").find("#minutes").val();

			if ((customerFullName && customerEmail && customerPhone && customerServiceDate && customerHours && customerMinutes) != "") {
				// Storing into localStorage
				localStorage.setItem("fullName",customerFullName),
				localStorage.setItem("email",customerEmail);
				localStorage.setItem("phone",customerPhone);
				localStorage.setItem("servicedate",customerServiceDate);
				localStorage.setItem("hours",customerHours);
				localStorage.setItem("minutes",customerMinutes);

				// Checking the availability
				$.getJSON(apiUrl+"/?email="+customerEmail+"&date="+customerServiceDate+"&time="+customerHours+":"+customerMinutes+"&submit=add_cart",
				function (data) {
					$.each(data, function(i, item){
						var	message	=	item.error;
						//eventListners
						document.addEventListener("deviceready", onDeviceReady, true);
						function onDeviceReady () {
							if (message != "FALSE") {
								navigator.notification.alert(
									'Payment Type should be confirmed within 10 minutes to confirm the order.',
									function(){},
									'Just Wash',
									'OK'
								);
								//Redirecting to Payment Gateway
								window.location.href = "jw_paymentgateway.html";
							} else {
								navigator.notification.alert(
									'Requested slot is not available',
									function(){
										window.location.href	=	"jw_sub_services.html";
									},
									'Just Wash',
									'OK'
								);
							}
						}
					})
				});
			} else {
				//eventListners
				document.addEventListener("deviceready", onDeviceReady, true);
				function onDeviceReady () {
					navigator.notification.alert(
						'All fields are required',
						function(){},
						'Just Wash',
						'OK'
					);
				}
			}
		}
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

			$.getJSON(apiUrl+"?email="+email+"&invoice_id="+invoiceId+"&date="+serviceDate+"&time="+hours+":"+minutes+"&car_type="+localStorage.getItem("dynamicCarName")+"&sub_service_name="+localStorage.getItem("dynamicSubServiceName")+"&service_name="+localStorage.getItem("dynamicServiceName")+"&price="+paidAmount+"&add_invoice=add+invoice");
			//	Displaying Values
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
			//eventListners
			// document.addEventListener("deviceready", onDeviceReady, true);
			// function onDeviceReady() {
			// 	navigator.notification.alert(
			// 		'Booking Failed',
			// 		function(){},
			// 		'Just Wash',
			// 		'OK'
			// 	);
			// }
		}
	}
});