	
	function initialize() {
	
	var historicalOverlay;
	
	var mechelen = new google.maps.LatLng(51.027330, 4.480119);

	var mapElement = document.getElementById('map-canvas');
	
	var bounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(50.992936, 4.366583),
		new google.maps.LatLng(51.079835, 4.562847));
		
	var map = new google.maps.Map(mapElement,{
		center: mechelen,
		zoom: 14,
		restriction: bounds,
		panControl:false,
		zoomControl:false,
		mapTypeControl:false,
		scaleControl:true,
		streetViewControl:false,
		overviewMapControl:false,
		rotateControl:false,
		draggableCursor: 'crosshair',
		styles: 
		[
			{
				"featureType": "administrative",
				"elementType": "all",
				"stylers": [
					{
						"lightness": -100
					},
					{
						"visibility": "off"
					},
					{
						"color": "#f8e7b3"
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "geometry",
				"stylers": [
					{
						"saturation": -100
					},
					{
						"lightness": -3
					},
					{
						"visibility": "on"
					},
					{
						"color": "#f8e7b3"
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "labels",
				"stylers": [
					{
						"hue": "#000000"
					},
					{
						"saturation": -100
					},
					{
						"lightness": -100
					},
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "all",
				"stylers": [
					{
						"hue": "#000000"
					},
					{
						"saturation": -100
					},
					{
						"lightness": -100
					},
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [
					{
						"saturation": -100
					},
					{
						"lightness": 26
					},
					{
						"visibility": "on"
					},
					{
						"color": "#ffffff"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels",
				"stylers": [
					{
						"hue": "#ffffff"
					},
					{
						"saturation": -100
					},
					{
						"lightness": 100
					},
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "all",
				"stylers": [
					{
						"hue": "#ffffff"
					},
					{
						"saturation": -100
					},
					{
						"lightness": 100
					},
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "geometry",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"color": "#d8a18c"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "labels",
				"stylers": [
					{
						"hue": "#000000"
					},
					{
						"lightness": -100
					},
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"saturation": -100
					},
					{
						"lightness": 100
					},
					{
						"visibility": "on"
					},
					{
						"color": "#bee4fa"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels",
				"stylers": [
					{
						"hue": "#000000"
					},
					{
						"saturation": -100
					},
					{
						"lightness": -100
					},
					{
						"visibility": "off"
					}
				]
			}
		]
		//mapTypeId:google.maps.MapTypeId.ROADMAP DIT MAG ER NIET STAAN ALS JE STYLE WIL WIJZIGEN
		});	
	//map.setOptions({ draggableCursor: 'crosshair' });
	
	var opt = { minZoom: 13, maxZoom: 16 };
	map.setOptions(opt);
	
	var layerCWGC = new google.maps.FusionTablesLayer({
		query: {select: 'Adres', from: '1CElEtXy2pvr5to5SqtclBAXL2ArBoWAylYeNoTuk'},
		suppressInfoWindows: true,
		styles: [{where: "'country'='Belgium'", markerOptions:{ iconName:"road_shield3"}}]
	});
	//var nationslayer = new google.maps.FusionTablesLayer({
	//	query: {select: "'Full Address'",from: '1DqX0BxwByjSybJhHQbJdZhQ_RKkAQdgH9XcxpLRA'}, 
	//	suppressInfoWindows: true
	//});
	layerCWGC.setMap(map);
	// nationslayer.setMap(map);
	//
	//
	//GRID
	//This can turn on a grid loaded from the v3_11_grat.js script
	// grid = new Graticule(map, true);
	//
	//
	//INFOWINDOW_ALTERNATIVE
	//This is another method to customise the Infowindow content, more dificult to stylize
	//google.maps.event.addListener(layerCWGC, 'click', function(e) 
	//	{
	//		Change the content of the InfoWindow
	//		e.infoWindowHtml = e.row['name'].value; + "<br>" + e.row['name'].value;
	//		If the delivery == yes, add content to the window
	//		if (e.row['delivery'].value == 'yes') {
	//		e.infoWindowHtml += "Delivers!";
	//	});
	//
	//
	//INFOWINDOW_ALTERNATIVE_BEST
	//This is the best alternative, combining style-options, setcontent and table integration
	var infowindow;
	var infoWindowContent = '';
	var coordinate;
	var latlng = new google.maps.LatLng(51.04, 4.45); 
	//click listener on layer
	google.maps.event.addListener(layerCWGC, 'click', function(e) 
		{
			map.setZoom(16);
			if(infowindow) infowindow.close();
			else infowindow = new google.maps.InfoWindow();
	//		create info window layer
			infoWindowContent = infowindow.setContent(
				/*'<h1>This comes from the Fusion Table: <br />' + */
				'<h2>' + e.row['Naam'].value + '</h2>' +
				'<br />' +
				'<p><b>Adres: </b>' + e.row['Adres'].value + '</p>' +
				'<p><b>Website: </b><a href="mailto:' + e.row['Email'].value + '">' + e.row['Email'].value + '</a></p>' +
				'<p><b>Tel: </b>' + e.row['Tel'].value + '</p>' +
				'<p><b>Website: </b><a href="' + e.row['URL'].value + '">' + e.row['URL'].value + '</a></p>' +
				'<p><img src="' + e.row['Image'].value + '" style="width:100px;"></p>'
				/* +
				'<p>This is hardcoded to the script <br /> and will appear in each infowindow</p>' +
				'<div id="content">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
				'<div id="bodyContent">'+
				'<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
				'sandstone rock formation in the southern part of the '+
				'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
				'south west of the nearest large town, Alice Springs; 450&#160;km '+
				'(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
				'features of the Uluru - Kata Tjuta National Park. Uluru is '+
				'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
				'Aboriginal people of the area. It has many springs, waterholes, '+
				'rock caves and ancient paintings. Uluru is listed as a World '+
				'Heritage Site.</p>'+
				'<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
				'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
				'(last visited June 22, 2009).</p>'+
				'</div>'+
				'</div>'*/);
			infowindow.setPosition(e.latLng);
			map.setCenter(e.latLng);
			infowindow.open(map);   
		});
		
	// This makes the overlay opaque 
	// var overlayOpts = {opacity:0.1} > needs to be added to line below: after "bounds"
	historicalOverlay = new google.maps.GroundOverlay(
				'https://ego4.mechelen.be/files/uploads/images/Deelsites/Mechelenmakers/De%20Mensen%20Maken%20De%20Stad/stadskaart_dmmds_gijs.png',
				bounds);
	historicalOverlay.setMap(map);
		
	//Closes the infowindow if you click somewhere else	
		google.maps.event.addListener(map, "click", function(){infowindow.close()});
	}
	google.maps.event.addDomListener(window, 'load', initialize);