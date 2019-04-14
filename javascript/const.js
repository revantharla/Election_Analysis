$(document).ready(function () {
    document.getElementById("state1").options.length=0;
    var list =["--Select State--","chattisgarh","madhyapradesh","mizoram","rajasthan","telangana"]
        for(var i=0;i<list.length;i++)
        {
          var select = document.getElementById("state1");
          select.options[select.options.length] = new Option(list[i],list[i]);
        }
    });

	function updatestate(){
     
		var list1 = document.getElementById('state1');
		document.getElementById("constituency1").options.length=0;
		if(list1.value=='--Select State--')
		{
		   alert("Select state")
			return false;
		}
		else if(list1.value=='chattisgarh')
		{
	var list =["--Select Constituency--","Abhanpur","Ahiwara","Akaltara","Arang","Basna","Bastar","Bijapur","Beltara","Bilha","Durg City"]
			
			for(var i=0;i<list.length;i++)
			{
			 var select = document.getElementById("constituency1");
			 select.options[select.options.length] = new Option(list[i],list[i]);
			}
		}
		else if (list1.value=='telangana')
		{
			var list =["--Select Constituency--","Aliar","Armur","Boath","Chennur","Chevella","Dubbak","Gadwal","Jagtial","Jukkal","Mulug"]
			for(var i=0;i<list.length;i++)
			{
			 var select = document.getElementById("constituency1");
			 select.options[select.options.length] = new Option(list[i],list[i]);
			}
		}
		else if (list1.value=='mizoram')
		{
			var list =["--Select Constituency--","Aizawl North-i","Aizawl North-ii","Aizawl North-iii","Aizawl East-i","Aizawl East-ii","Aizawl South-i","Aizawl South-ii","Aizawl South-iii","Aizawl West-i","Aizawl West-ii","Aizawl West-iii"]
			for(var i=0;i<list.length;i++)
			{
			 var select = document.getElementById("constituency1");
			 select.options[select.options.length] = new Option(list[i],list[i]);
			}
		}
		else if (list1.value=='rajasthan')
		{
			var list =["--Select Constituency--","Ahore","Amber","Anta","Asind","Bali","Bagru","Bansur","Bari","Bassi","Bhim"]
			for(var i=0;i<list.length;i++)
			{
			 var select = document.getElementById("constituency1");
			 select.options[select.options.length] = new Option(list[i],list[i]);
			}
		}
		else if (list1.value=='madhyapradesh')
		{
			var list =["--Select Constituency--","AGAR","ALOTE","AMLA","ASHTA","ATER","BAGLI","BAIHAR","BANDA","BARGI","BETUL"]
			for(var i=0;i<list.length;i++)
			{
			 var select = document.getElementById("constituency1");
			 select.options[select.options.length] = new Option(list[i],list[i]);
			}
		   
		}
}

    function updateconst()
    {
        var list1 = document.getElementById('state1');
        var list2 = document.getElementById('constituency1');
        if(list1.value=='--Select State--' && list2.value=="--Select Constituency--")
        {
            //alert("select state and constituency")
            return false;
        }
        else if(list1.value=='--Select State--')
        {
           // alert("select state")
            return false;
        }
        else if(list2.value=='--Select Constituency--')
        {
           // alert("select Constituency")
            return false;
        }
        else{
            call(list1.value,list2.value);
            
        }
        
    }
    

var myObj = "";
		var allTextLines="";
		var cur_const = "";
		var dict_colors = {
			
				'Bharatiya Janata Party':'#ff9933',
				'Indian National Congress':'#0F6796',
            	'Bahujan Mukti Party':'#ffa500',
            	'Bahujan Samaj Party':'#000080',
               	'Vyavastha Parivartan Party':'#ffff00',
               	'Real Democracy Party':'#008000',
               	'Shivsena':'#0000ff',
               	'Independent':'#ff0000',
               	'Aam Aadmi Party':'#000000',
               	'Samajwadi Party':'#A52A2A',
               	'Yuva Sarkar':'#800000',
               	'JanataDal(United)':'#B22222',
               	'All India Hindustan Congress Party':'#8B0000',
               	'RashtriyaKrantikariSamajwadiParty':'#5E3A32',
               	'Nationalist Congress Party':'#B8978F',
               	'GujaratJanChetnaParty':'#BEC8D2',
               	'AapniSarkarParty':'#1E3C5C',
               	'BhartiyaTribalParty':'#BB2FAF',
               	'SwabhimanParty':'#60DC19',
               	'RashtriyaSamajwadiParty(Secular)':'#DE1E6A',
               	'LokVikasManch':'#7E295B',
               	'NavinBharatNirmanManch':'#EF0790',
               	'LokGathbandhanParty':'#1B9878',
               	'RepublicanPartyofIndia':'#3574EC',
               	'Bharatiya National JantaDal':'#1CEC2F',
				   'Bharatiya Rashtravadi Paksha':'#D0E81F',
				   'None of the Above' :'#696969'
               	
		 }
		 function call(state,cons)
		 {
			$.ajax({
        		type: "GET",
        		url: "data/constituency/"+state+".csv",
        		dataType: "text",
        		success: function(data) {processData(data,state,cons);}
		 });
		 
		 }
lines=[]
	function processData(allText,state,cons) {
		allTextLines = allText.split(/\r\n|\n/);
        for (var i=0; i<allTextLines.length; i+=2) {
            var data = allTextLines[i].split(',');
				var tarr = [];
				for (var j=0; j<data.length; j++) {
      				tarr.push(data[j]);
                  }
				  lines.push(tarr);
				}
				plot(state,cons)
		}
	
		function plot(state,cons){
			
			var x="";
			var candidate=new Array();
			var votes = new Array();
			var party = new Array();
			var col = new Array();
			for (x in lines) {
				var c=lines[x]
				if(c[1]==cons){
					candidate.push(c[0]);
					votes.push(c[3]);
					party.push(c[2]);
					col.push(dict_colors[c[2]]);
				}
			}
			var v = votes.map(function (x) { 
				return parseInt(x,10); 
			});
			
			var d = party;
			var b = candidate;
			var a = votes;
			var c = new Array();
			for(var i = 0; i < a.length; i++)
			{
				c.push('Votes: '+a[i]+'<br>Candidate: '+b[i]+'<br>Party: '+d[i]);
			}
			
			var data = [{
				x: party,
				y: v,
				type: 'bar',
				
				text:c,
				hoverinfo: 'text',
			 mode: 'markers',
				 marker: {color: col,opacity:1,}
			  }];
			  layout = {
			hovermode:'closest',
			title:'Visual Report of '+cons+' Constituency of '+state,
			xaxis:{zeroline:false, hoverformat: '.2r'},
			yaxis:{zeroline:false, hoverformat: '.2r'}
		 };
			  //$('#myDiv').empty();
		   Plotly.newPlot('myDiv', data,layout);
			
		   jQuery('#mySelector').html('');
			unique_Win =[];
		   
			$.each(party, function(i, el){
				   if($.inArray(el, unique_Win) === -1) unique_Win.push(el);
			});
			
			var ks = 0;
			var content = "<table><tr>"
			for(var i=0; i<unique_Win.length; i++){
				//alert(unique_Win[i]);
				content += '&nbsp<td> <div style="height:20px; border:1px solid black; width:20px; background-color:'+dict_colors[unique_Win[i].split('_').join('')]+'"> </div></td><td><b>' +  unique_Win[i].split('_').join(' ') + '</b></td>';
				ks = ks+1;			
				if(ks%3==0){
					content += '</tr><tr>';
				}		
			}
			content += "</tr></table>"
	
		$('#mySelector').append(content);
		}
	

