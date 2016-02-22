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
var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		app.receivedEvent('deviceready');
	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		setTimeout(function() {
		    navigator.splashscreen.hide();
		}, 5000);
		// start to initialize PayPalMobile library
		app.initPaymentUI();
	},
	initPaymentUI : function () {
		var clientIDs = {
			"PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
			"PayPalEnvironmentSandbox": "Aa7er8oGXx3EiAo08-XZ051gwBOevdzhEVeea8QTE4iO19EuzDBTGq2oL5PhYv3XD-51gohznM8THezY"
		};
		PayPalMobile.init(clientIDs, app.onPayPalMobileInit);
	},
	onSuccesfulPayment : function(payment) {
		var	paymentResponse	=	payment;
		$.each(paymentResponse, function(i,item){
			if ((item.state) == "approved") {
				localStorage.setItem("invoiceId", item.id);
				localStorage.setItem("paymentStatus", item.state);
			}
		});
		window.location.href = "invoice.html";
	},
	onAuthorizationCallback : function(authorization) {
		alert("authorization: " + JSON.stringify(authorization, null, 4));
	},
	createPayment : function () {
		// for simplicity use predefined amount
		// optional payment details for more information check [helper js file](https://github.com/paypal/PayPal-Cordova-Plugin/blob/master/www/paypal-mobile-js-helper.js)
		var	dynamicCarName						=	localStorage.getItem("dynamicCarName"),
				dynamicServiceName				=	localStorage.getItem("dynamicServiceName"),
				dynamicSubServicePrice			=	localStorage.getItem("dynamicSubServicePrice"),
				dynamicSubServiceName		=	localStorage.getItem("dynamicSubServiceName"),
				payment											=	new PayPalPayment(dynamicSubServicePrice, "NZD", dynamicCarName+" | "+dynamicServiceName+" | "+dynamicSubServiceName , "Sale");
		return payment;
	},
	configuration : function () {
		// for more options see `paypal-mobile-js-helper.js`
		var config = new PayPalConfiguration({merchantName: "Just Wash Limited", merchantPrivacyPolicyURL: "https://mytestshop.com/policy", merchantUserAgreementURL: "https://mytestshop.com/agreement"});
		return config;
	},
	onPrepareRender : function() {
		var buyNowBtn = document.getElementById("buyNowBtn");
		var buyInFutureBtn = document.getElementById("buyInFutureBtn");
		var profileSharingBtn = document.getElementById("profileSharingBtn");

		buyNowBtn.onclick = function(e) {
			// Global Variables
			var	apiUrl;
			// parameters for invoicing
			// Collecting Values
			var	customerFullName 					=	$("#customerdetails").find("input[name='fullname']").val(),
					customerEmail 							=	$("#customerdetails").find("input[name='email']").val(),
					customerPhone 							=	$("#customerdetails").find("input[name='phone']").val(),
					customerServiceDate 				=	$("#customerdetails").find("input[name='servicedate']").val(),
					customerHours 							=	$("#customerdetails").find("#hours").val(),
					customerMinutes 						=	$("#customerdetails").find("#minutes").val();

			if ((customerFullName && customerEmail && customerPhone && customerServiceDate && customerHours && customerMinutes) != "") {
				// Storing into localStorage
				localStorage.setItem("fullName",customerFullName),
				localStorage.setItem("email",customerEmail);
				localStorage.setItem("phone",customerPhone);
				localStorage.setItem("servicedate",customerServiceDate);
				localStorage.setItem("hours",customerHours);
				localStorage.setItem("minutes",customerMinutes);

				// Checking the availability
				$.getJSON("http://justwashapi.gsprasad.com/?email="+customerEmail+"&date="+customerServiceDate+"&time="+customerHours+":"+customerMinutes+"&submit=add_cart",
				function (data) {
					if (data == "open") {
						alert("Payment Should be completed within 10 Minutes to confirm the slot");
						// Single payment UI
						PayPalMobile.renderSinglePaymentUI(app.createPayment(), app.onSuccesfulPayment, app.onUserCanceled);
					} else {
						alert("Requested slot is not availabile");
					}
				});
			} else {
				alert("All fields with * required");
			}
		};

		buyInFutureBtn.onclick = function(e) {
			// future payment
			PayPalMobile.renderFuturePaymentUI(app.onAuthorizationCallback, app.onUserCanceled);
		};

		profileSharingBtn.onclick = function(e) {
			// profile sharing
			PayPalMobile.renderProfileSharingUI(["profile", "email", "phone", "address", "futurepayments", "paypalattributes"], app.onAuthorizationCallback, app.onUserCanceled);
		};
	},
	onPayPalMobileInit : function() {
		// must be called
		// use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
		PayPalMobile.prepareToRender("PayPalEnvironmentSandbox", app.configuration(), app.onPrepareRender);
	},
	onUserCanceled : function(result) {
		alert(result);
	}
};
app.initialize();