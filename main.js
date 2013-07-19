//Michael Bain
//1306
//Advanced Scalable Data
$("#home").on("pageinit", function () {

	$("#userInfo").hide();
	
	
$("#xml").on("click", function(){

//$(function(){

$.ajax({
   url       :'xhr/items.xml',
   type      :'GET',
   dataType  :'xml',
   success   : function(xml){
	   //$('#userData').empty();
	   $(xml).find("item").each(function(){
		   var $item = $(this);
		  //$("#userData").append($(this).text());


		   //$(''+
			   var html ='<div class="info">';
			   html += '<p>' + "Album:" + $item.find('album').text() +'</p>';

			   html += '<p>' + "Song:" + $item.find('song').text() +'</p>';

			   html += '<p>' + "Artist:" + $item.find('artist').text() + '</p>';

			   html += '<p>' + "Writer:" + $item.find('writer').text() + '</p>';

			   html += '<p>' + "Publishing:" + $item.find('publishing').text() + '</p>';

			   html += '<p>' + "Label:" + $item.find('label').text() + '</p>';

			   html += '<p>' + "Date:" + $item.find('date').text() + '</p>';
			   
			   html += '<p>' + "Sample Length:" + $item.find('sample length').text() + '</p>';

			   html += '<p>' + "Comments:" +  $item.find('comments').text() + '</p>' + '<a href="# id="edit">Edit</a>'  
			   + '<br>' +  '<a href="# id="delete">Delete</a>' + '<br>';




			   $('#form').hide();
			   $('#userData').append(html);

		   });
	   }
	  });



});

	
$("#csv").on("click", function(){

//$(function(){

$.ajax({
   url       :'xhr/items.csv',
   type      :'GET',
   dataType  :'text',
   success   : function(csvFile){
	   //$('#userData').empty();
	   var csv = csvFile.split("\n");
	   for (var lineNum = 1; lineNum < csv.length; lineNum++) {
		   var row = csv[lineNum];
		   var columns = row.split(",");




			   var html ='<div class="info">';
			   html += '<p>' + "Album:" + "  " + columns[0] +'</p>';
			   html += '<p>' + "Song:" + "  " + columns[1] +'</p>';
			   html += '<p>' + "Artist:" + "  " + columns[2] +'</p>';
			   html += '<p>' + "Writer:" +  "  " + columns[3] +'</p>';
			   html += '<p>' + "Publishing:" +  "  " + columns[4] +'</p>';
			   html += '<p>' + "Label:" +  "  " + columns[5] +'</p>';
			   html += '<p>' + "Date:" +  "  " + columns[6] +'</p>';
			   html += '<p>' + "Sample Length:" +  "  " + columns[7] +'</p>';
			   html += '<p>' + "Comments:" +  "  " + columns[8] +'</p>' + '<a href="# id="edit">Edit</a>'  
			   + '<br>' +  '<a href="# id="delete">Delete</a>' + '<br>';


			  



			   $('#form').hide();
			   $('#userData').append(html);

		   }
	   }

	});

});



	function saveData(data) {}
	$("#save").click(function (e) {

		alert("The Sample Has Been Saved!");
		e.preventDefault();
		var data = $("#form").serializeArray();
		var id = Math.floor(Math.random() * 10000001);

		var item = {};
		item.album = ["Album:", $("#album").val()];
		item.song = ["Song:", $("#song").val()];
		item.artist = ["Artist:", $("#artist").val()];
		item.writer = ["Writer:", $("#writer").val()];
		item.publishing = ["Publishing:", $("#publishing").val()];
		item.label = ["Label:", $("#label").val()];
		item.date = ["Date:", $("#date").val()];
		item.length = ["Sample Length:", $("#length").val()];
		item.format = ["Format:", $("#format").val()];
		item.comment = ["Comments:", $("#comment").val()];


		$.each(data, function (key, value) {
			localStorage.setItem(id, JSON.stringify(item));


		});
	});

});
$("#show").click(function (e) {
		e.preventDefault();
		$("#userInfo").show(); 

				$("#form").hide(); 

						if (localStorage.length === 0) {
							alert("There is no data in Local storage so default data was added.");
							autoFillData();

						}

						var makeDiv = document.createElement("div");
						makeDiv.setAttribute("id", "items");
						var makeList = document.createElement("listview");
						makeDiv.appendChild(makeList);
						document.body.appendChild(makeDiv);
						//$("#items").style.display = "block";
						for (var i = 0, len = localStorage.length; i < len; i++) {
							var makeLi = document.createElement("li");
							var linksLi = document.createElement("li");
							makeList.appendChild(makeLi);
							var key = localStorage.key(i);
							var value = localStorage.getItem(key);
							var obj = JSON.parse(value);
							var makeSubList = document.createElement("listview");
							makeLi.appendChild(makeSubList);

							for (var n in obj) {
								var makeSubLi = document.createElement("li");
								makeSubList.appendChild(makeSubLi);
								var optSubText = obj[n][0] + " " + obj[n][1];
								makeSubLi.innerHTML = optSubText;
								makeSubList.appendChild(linksLi);
								$("#userInfo").append(items);


							}
							makeItemLinks(localStorage.key(i), linksLi);
						}

						function autoFillData() {
							////The actual JSON OBJECT data required for this to work is coming from our json.js file which is loaded from our html page.
							//Store the JSON OBJECT into Local Storage.
							for (var n in json) {
								var id = Math.floor(Math.random() * 100000001);
								localStorage.setItem(id, JSON.stringify(json[n]));
							}
						}


						function makeItemLinks(key, linksLi) {
							var editLink = document.createElement("a");
							editLink.href = "#";
							editLink.key = key;
							var editText = "Edit Sample";
							editLink.addEventListener("click", editItem);
							editLink.innerHTML = editText;
							linksLi.appendChild(editLink);

							//add line break.
							var breakTag = document.createElement("br");
							linksLi.appendChild(breakTag);

							var deleteLink = document.createElement("a");
							deleteLink.href = "#";
							deleteLink.key = key;
							var deleteText = "Delete Sample";
							deleteLink.addEventListener("click", deleteItem);
							deleteLink.innerHTML = deleteText;
							linksLi.appendChild(deleteLink);

						}


						function editItem() {
							var value = localStorage.getItem(this.key);
							var item = JSON.parse(value);

							$("#form").show();
							$("#userInfo").hide();
						


							$('#album').val(item.album[1]);
							$('#song').val(item.song[1]);
							$('#artist').val(item.artist[1]);
							$('#writer').val(item.writer[1]);
							$('#publishing').val(item.publishing[1]);
							$('#label').val(item.label[1]);
							$('#length').val(item.length[1]);
							$('#date').val(item.date[1]);
							$('#comments').val(item.comments[1]);
                            
                   }         
                        
                         $(function() {
	                         
	                         $("#form").append("<input type='submit' value='Save Changes' id='savEdit'>");
	                         
	                         $("#savEdit").click(function(e) {
		                         if(!key){      
		                            var id                = Math.floor(Math.random()*100000001);
		                         }else{
		                         	
		                         	id = key;
		                         }
		                         
		                         var data = $("#form").serializeArray();
		                         var item = {};
		                         item.album = ["Album:", $("#album").val()];
		                         item.song =  ["Song:", $("#song").val()];
		                         item.artist =  ["Artist:", $("#artist").val()];
		                         item.writer =  ["Writer:", $("#writer").val()];
		                         item.publishing =  ["Publishing:", $("#publishing").val()];
		                         item.label =  ["Label:", $("#label").val()];
		                         item.length =  ["Sample Length:", $("#length").val()];
		                         item.date =  ["Date:", $("#date").val()];
		                         item.comments =  ["Comments:", $("#comments").val()];
		                         
		                         $.each(data, function (key, value) {
		                         	localStorage.setItem(id, JSON.stringify(item));
		                         
                                 });
		                         
	                         });
	                            
	                         
                         });        



						
				


			function deleteItem() {
				var ask = confirm("Are you sure you want to delete this contact?");
				if (ask) {
					localStorage.removeItem(this.key);
					alert("Contact was deleted!!");
					window.location.reload();
				} else {
					alert("Contact was NOT deleted.");
				}

			}
			$("#clear").click(function () {

				if (localStorage.length === 0) {
					alert("There Is No Info To Clear")
				} else {
					localStorage.clear();
					alert("All Names Have Been Deleted!");
					window.location.reload();
					return false;
				}

			});
			
			
			
			
			


		});