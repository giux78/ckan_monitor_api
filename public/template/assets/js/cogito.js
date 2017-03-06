type = [ '', 'info', 'success', 'warning', 'danger' ];

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

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

    initPage :function(){
    	var objId = getParameterByName("objId")
		$.ajax({
			type : 'Get',
			url : '/cogitoFindOne/' + objId,
			success: function(data){
				var doc = data.document
				if(doc.length > 300){
					$("#doc").text(doc.substring(0,399))
				}
				//$("#doc").text(doc)
				var clouds = []
				
				for(var i = 0; i < data.trans.PERSONE.length; i++){
					var per = data.trans.PERSONE[i];
					var html = ' <div class="col-md-3"><div class="card card-user" style="max-height:220px"> <div class="image"> <img src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" alt="..."/> </div> <div class="content"> <div class="author"> <a href="#"> <img class="avatar border-gray" src="assets/assets/img/faces/avatar.jpg" alt="..."/> <h4 class="title">' + per + '<br />  </h4> </a> </div> </div></div> </div></div>'
				    $('#per').append(html)
				    clouds.push({"text": per, "weight" : Math.floor((Math.random() * 20) + 1)})
				}
				
				var regioni = ""
				for(var i = 0; i < data.regioni.length; i++){
					var reg = data.regioni[i];
					regioni = regioni + reg + ', '
					clouds.push({"text": reg, "weight" : Math.floor((Math.random() * 20) + 1)})
				}
				$('#reg').val(regioni)
				
				var province = ""
					for(var i = 0; i < data.provincie.length; i++){
						var pro = data.provincie[i];
						province = province + pro + ', '
						clouds.push({"text": pro, "weight" : Math.floor((Math.random() * 20) + 1)})
					}
					$('#prov').val(province)
					
				if(data.trans.hasOwnProperty('LOCALITA_GENERICHE'))	{
					var loc = ""	
					for(var i = 0; i < data.trans.LOCALITA_GENERICHE.length; i++){
						var pro = data.trans.LOCALITA_GENERICHE[i];
						loc = loc + pro + ', '
						clouds.push({"text": pro, "weight" : Math.floor((Math.random() * 20) + 1)})
						
					}
					$('#loc').val(loc)
			      }
				if(data.trans.hasOwnProperty('ORGANIZZAZIONI'))	{
						var or = ""	
						for(var i = 0; i < data.trans.ORGANIZZAZIONI.length; i++){
							var pro = data.trans.ORGANIZZAZIONI[i];
							or = or + pro + ', '
							clouds.push({"text": pro, "weight" : Math.floor((Math.random() * 20) + 1)})

						}
						$('#org').val(or)
				}
				if(data.trans.hasOwnProperty('AZIENDE'))	{
					var az = ""	
					for(var i = 0; i < data.trans.AZIENDE.length; i++){
						var pro = data.trans.AZIENDE[i];
						az = az + pro + ', '
						clouds.push({"text": pro, "weight" : Math.floor((Math.random() * 20) + 1)})

					}
					$('#azi').val(az)
			}
				if(data.trans.hasOwnProperty('CITTA'))	{
					var cit = ""	
					for(var i = 0; i < data.trans.CITTA.length; i++){
						var pro = data.trans.CITTA[i];
						cit = cit + pro + ', '
						clouds.push({"text": pro, "weight" : Math.floor((Math.random() * 20) + 1)})

					}
					$('#cit').val(cit)
			}
				$("#cloud").jQCloud(clouds);
			}
		})
    },

	initCategories : function() {

		$.ajax({
			type : 'Get',
			url : '/categories',
			success : function(data) {
				console.log(data);

				data.map(function(item) {
					console.log(item)
					var obj = ' <li> <a href="dashboard.html" class="prov" id="link_'+ item +'"> <p>' + item
							+ '</p> </a>'
					$('#cats').append(obj);
				})

			}

		})
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
