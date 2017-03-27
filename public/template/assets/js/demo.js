type = [ '', 'info', 'success', 'warning', 'danger' ];

demo = {
	initPickColor : function() {
		$('.pick-class-label').click(function() {
			var new_class = $(this).attr('new-class');
			var old_class = $('#display-buttons').attr('data-class');
			var display_div = $('#display-buttons');
			if (display_div.length) {
				var display_buttons = display_div.find('.btn');
				display_buttons.removeClass(old_class);
				display_buttons.addClass(new_class);
				display_div.attr('data-class', new_class);
			}
		});
	},
	initCategories : function() {
		
	   	$.getJSON("/categories", function(data) {
	   	    data.map(function(item){
	   	    	var catalogName = item.split(' ').join('_')
	   	    	var html = ' <li> <a href="/catalog?name=' + catalogName +'"> <i class="pe-7s-graph"></i> <p>' + item + '</p> </a> </li>'
	   	    	$('#cats').append(html)
	   	    })
	   	})
	 },
	initChartist : function() {
		
		$.getJSON("/coll/m_status", function(data) {
			var tot = 0
			data.map(function(item){
				if (item.m_status === 'ko'){
					tot = item.count;
				}
			})
			$("#blinks").html("Broken Links : " + tot)
		});
		
		$.getJSON("/coll/datasets", function(data) {
			var tot = 0
			data.map(function(item){
				tot = item.count + tot
			})
			$("#tots").html("Datasets : " + tot)
		});
		
	   	$.getJSON("/coll/format_dist", function(data) {

	   	data.sort(function(a, b){return b.count-a.count});
	   	var total = 0	
	   	var series = data.map(function(item){
	   		total = total + item.count
	   		return item.count
	   	})
	    
	   	var labels = data.map(function(item){
	   		return item.format
	   	})	
	   		   	
		var dataPreferences = {
			series : [ [ 25, 30, 20, 25 ] ]
		};

		var optionsPreferences = {
			donut : true,
			donutWidth : 60,
			startAngle : 0,
			total : total,
			showLabel : false,
			axisX : {
				showGrid : false
			}
		};

		$("#resorces").html("Resources : " + total)
		
		Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

		Chartist.Pie('#chartPreferences', {
		//	labels : [ '62%', '32%', '6%' ],
		//	series : [ 62, 32, 6 ]
			labels : labels.slice(0,6),
			series : series.slice(0,6)
		});
	   	});
	   	
	   	$.getJSON("/coll/license", function(data) {

		   	data.sort(function(a, b){return b.count-a.count});
		   	var total = 0	
		   	var series = data.map(function(item){
		   		total = total + item.count
		   		return item.count
		   	})
		    
		   	var labels = data.map(function(item){
		   		return item.license_id
		   	})	
		   		   	
			var dataPreferences = {
				series : [ [ 25, 30, 20, 25 ] ]
			};

			var optionsPreferences = {
			//	donut : true,
			//	donutWidth : 60,
				startAngle : 0,
				total : total,
				showLabel : true,
			//	labelDirection: 'explode',
				axisX : {
					showGrid : false
				}
			};

		//	Chartist.Pie('#chartLicense', dataPreferences, optionsPreferences);

			new Chartist.Pie('#chartLicense', {
				labels : labels.slice(0,6),
				series : series.slice(0,6)
			}, {total : total, showLabel : true});
		   	});
	   	
	   	$.getJSON("/coll/dist_format_by_group", function(dataDist) {
	   		
         
	   	var testG = _.groupBy(dataDist, 'title')
        var keys = Object.keys(testG)
	   	
        var newLabels = []
	   	var newSeries = []
	   	var totals = keys.map(function(item){
	   		var vals =  testG[item]
	   		var tots =_.reduce(vals, function(memo, obj){ return memo + obj.count; }, 0);
	   	    return {"label" : item, "tot" : tots}
	   	//	newLabels.push(item)
	   	//	newSeries.push(tots)
	   	});
	   	totals.sort(function(a, b){return b.tot -a.tot});
	   	
	   	totals.map(function(item){
	   		newLabels.push(item["label"].slice(0,20))
	   		newSeries.push(item["tot"])
	   	});
	   		
	   	var data = {
            //    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            //    series: [
            //      [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
            //      [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
            //    ]
	   			labels : newLabels,
	   			series : [newSeries]
              };
              
              var options = {
                  seriesBarDistance: 30,
                  axisX: {
                      showGrid: false
                  },
                  height: "1200px",
                  reverseData: true,
                  horizontalBars: true,
                  axisY: {
                    offset: 70
                  }
              };
              
              var responsiveOptions = [
                ['screen and (max-width: 640px)', {
                  seriesBarDistance: 5,
                  axisX: {
                    labelInterpolationFnc: function (value) {
                      return value[0];
                    }
                  }
                }]
              ];
              
              Chartist.Bar('#chartActivity', data, options, responsiveOptions);
         });
	   $.getJSON("/coll/ko", function(data) {	
		data.map(function(item){
		var name = item.name
		var rurl = item.rurl
	   	var html =  '<tr > <td>'+ name.slice(0,50) +'</td> <td><a href="'+ rurl +'">'+ rurl.slice(0, 50)+'</a></td>  </tr>'
		$('#broken_links').append(html)
		})   
	});
	},
    initCogito : function(){
    	$.getJSON("/alldocs/cogito", function(data) {
    		data.map(function(item){
    			var id = item['_id']['$oid']
    			var doc = item.document.substring(0,100)
    			var prov = item.provincie.join()
    			var reg = item.regioni.join()
    			var cat = item.categories.join()
    			var loc = ''
    			if(item.trans.hasOwnProperty('LOCALITA_GENERICHE'))	{
    				loc = item.trans.LOCALITA_GENERICHE.join()
    			}
    			var cit = ''
    			if(item.trans.hasOwnProperty('CITTA'))	{
    				cit = item.trans.CITTA.join()
    			}
				var html = ' <div class="content"><a href="/cogito?objId='+ id+'"> <div class="row"> <div class="col-md-12"> <div class="form-group"> <label>Documento</label> <p> ' + doc + '</p> </div> </div> </div> <div class="row"> <div class="col-md-3"> <div class="form-group"> <label>Regioni</label> <p>'+ reg +'</p> </div> </div> <div class="col-md-3"> <div class="form-group"> <label>Province</label> <p>'+ prov +'</p> </div> </div> <div class="col-md-3"> <div class="form-group"> <label>Localita </label> <p>'+ loc +'</p> </div> </div> <div class="col-md-3"> <div class="form-group"> <label>Citta</label> <p>'+cit+'</p> </div> </div> </div><hr\> '
    		    $("#news").append(html)
    		})
    	})
    },

	initMapBox : function() {

		mapboxgl.accessToken = 'pk.eyJ1IjoiZ2l1eGFsZSIsImEiOiI1MnFxWEd3In0.VUbUvTr64Rr5JLDQCpoAxA';

		var map = new mapboxgl.Map({
			container : 'map',
			style : 'mapbox://styles/mapbox/dark-v9',
			center : [ 12.3773504, 41.8997653 ],
			zoom : 6
		});

		var geojson = {
			"type" : "FeatureCollection",
			"features" : [ {
				"type" : "Feature",
				"properties" : {
					"title" : "Mapbox DC",
					"icon" : "monument"
				},
				"geometry" : {
					"type" : "Point",
					"coordinates" : [ 12.3773504, 41.8997653 ]
				}
			} ]
		};

		map.on('load', function() {

			var newData = {
					"type" : "FeatureCollection",
					"features" : []
			}
			var dataAggr = undefined;
			$.getJSON("/assets/assets/geo_with_aggr.json", function(data) {
				for (var i = 0; i < data.length; i++) {
					var obj = data[i]
					console.log(obj);
					var da = {
						"geometry" : obj['geometry'],
						"type" : "Feature",
						"properties" : {
							"name" : obj['name'],
							"original_name" : obj['prov'],
							"countIperico" : obj['countIperico'],
							"countCogito" : obj['countCogito']
						}
					}
					newData['features'].push(da)

				}

				map.addSource("prova", {
					type : 'geojson',
					data : newData
				});

				for (var i = 0; i < data.length; i++) {
					var id = "id_" + i
					map.addLayer({
						"id" : id,
						// "type": "symbol",
						"type" : "circle",
						"source" : "prova",
						"paint" : {
							//"circle-radius" : 5,
							"circle-radius" : {
								"property" : "countIperico",
								 "stops" : [[0,3],
								            [500,5],
								            [1000,7],
								            [1110,10]
								 		  ]
							}, 
							"circle-color" : "#3887be",
						},
						"layout" : {
						// "icon-image": "marker-15"
						}
					});
				}
			});

			// Add a single point to the map
			map.addSource('point', {
				"type" : "geojson",
				"data" : geojson
			});

			map.addLayer({
				"id" : "point",
				"type" : "circle",
				"source" : "point",
				"paint" : {
					"circle-radius" : 10,
					"circle-color" : "#3887be",
				}
			});

			var data = {
				"geometry" : {
					"type" : "Point",
					"coordinates" : [ 12.5454223, 42.4342343 ]
				},
				"type" : "Feature",
				"properties" : {

				}
			}
			var url = 'https://wanderdrone.appspot.com/';
			map.addSource('drone', {
				type : 'geojson',
				data : data
			});
			map.addLayer({
				"id" : "drone",
				"type" : "symbol",
				"source" : "drone",
				"layout" : {
					"icon-image" : "marker-15"
				}
			});

			$( ".prov" ).click(function(event) {
				event.preventDefault();
				var myId = $(this).attr("id");
				var cat = myId.split('_')[1];
				for (var i = 0; i < newData['features'].length; i++) {
					map.removeLayer('id_' + i)					
				}
				newData['features'].map(function(item){
					$.getJSON("/docsByProvCat/"+item['properties']['original_name']+"/"+ cat +"/iperico", function(data) {
                        console.log(data)
                        var id = "data"
    					map.addLayer({
    						"id" : id,
    						// "type": "symbol",
    						"type" : "circle",
    						"source" : "prova",
    						"paint" : {
    							"circle-radius" : 5,
    							"circle-color" : "#3887be",
    						},
    						"layout" : {
    						// "icon-image": "marker-15"
    						}
    					});
					})
				})

				 
			});
		});
		// create the marker

		map.on('click',function(e) {
						var features = map.queryRenderedFeatures(e.point);

							if (!features.length) {
								return;
							}

							var feature = features[0];

							var newLat = feature.geometry.coordinates[0]
							var newLon = feature.geometry.coordinates[1] - 1.2

							map.flyTo({
								center : [ newLat, newLon ]
							});

							var htmlPop = '<div class="card"> <div class="header"> <h4 class="title">'
									+ feature['properties']['name']
									+ '</h4> </div> <div class="content"> <div id="chartPreferences" class="ct-chart ct-perfect-fourth"></div> <div class="footer"> <div class="legend"> <i class="fa fa-circle text-info"></i> Iperico <i class="fa fa-circle text-danger"></i> Cogito <i class="fa fa-circle text-warning"></i> Unsubscribe </div> <hr> </div> </div> </div>'

							var countCogito = feature['properties']['countCogito']
							var countIperico = feature['properties']['countIperico']
							var total = countCogito + countIperico

							var percentageCogito = Math
									.floor((countCogito * 100) / total)
							var percentageIperico = Math
									.floor((countIperico * 100) / total)

							if (countCogito == 0) {
								total = 100
								percentageIperico = 100
							}

							// Populate the popup and set its coordinates
							// based on the feature found.

							// $('#myModal').modal('toggle')

							var popup = new mapboxgl.Popup()
								.setLngLat(feature.geometry.coordinates)
								.setHTML(htmlPop).addTo(map);

							var dataPreferences = {
								series : [ [ 25, 30, 20, 25 ] ]
							};

							var optionsPreferences = {
								donut : true,
								donutWidth : 40,
								startAngle : 0,
								total : total,
								showLabel : false,
								axisX : {
									showGrid : false
								}
							};

							Chartist.Pie('#chartPreferences', dataPreferences,
									optionsPreferences);

							Chartist.Pie('#chartPreferences',
									{
										labels : [ percentageIperico + '%',
												percentageCogito + '%' ],
										series : [ percentageIperico,
												percentageCogito ]
									});
						});

	},
	
	showNotification : function(from, align) {
		color = Math.floor((Math.random() * 4) + 1);

		$
				.notify(
						{
							icon : "pe-7s-gift",
							message : "Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer."

						}, {
							type : type[color],
							timer : 4000,
							placement : {
								from : from,
								align : align
							}
						});
	}

}
