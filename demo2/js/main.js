$(function(){
	
	var cityData=["成都","自贡","泸州","德阳","绵阳","广元","遂宁","内江","乐山","南充","宜宾","广安","达州","眉山","雅安","巴中","资阳","阿坝","甘孜","凉山","攀枝花","四川"];
	var coverOneYD=["95.16","96.23","97.08","97.32","96.66","97.76","97.61","98.13","96.48","97.70","98.02","97.47","97.14","97.25","96.30","97.19","98.39","97.71","97.68","96.44","95.60","96.53"];
	var coverTwoYD=["93.66","94.73","95.58","95.82","95.16","96.26","96.11","96.63","94.98","96.2","96.52","95.97","95.64","95.75","94.8","95.69","96.89","96.21","96.18","94.94","94.1","95.03"];
	var coverThreeYD=["81.16","91.54","82.16","87.57","88.98","90.30","88.85","87.40","86.83","87.81","88.97","88.80","88.45","86.71","87.72","90.89","87.19","92.70","92.61","88.39","88.48","86.03"];
	var coverOneLT=["94.16","95.23","96.08","96.32","95.66","96.76","96.61","97.13","95.48","96.7","97.02","96.47","96.14","96.25","95.3","96.19","97.39","96.71","96.68","95.44","94.6","95.53"];
	var coverTwoLT=["93.16","94.23","95.08","95.32","94.66","95.76","95.61","96.13","94.48","95.7","96.02","95.47","95.14","95.25","94.3","95.19","96.39","95.71","95.68","94.44","93.6","94.53"];
	var coverThreeLT=["92.16","93.23","94.08","94.32","93.66","94.76","94.61","95.13","93.48","94.7","95.02","94.47","94.14","94.25","93.3","94.19","95.39","94.71","94.68","93.44","92.6","93.53"];

	var theMore = {
		name : '四川',
		dataDx :[70,82,75,90.53,91.53,92.53],
		dataLt :[90,60,80,93.53,94.53,95.53],
		dataYd :[90,60,80,86.03,95.03,96.53],
	};
	var tmp = [];
	var coverOneDX=["91.16","92.23","93.08","93.32","92.66","93.76","93.61","94.13","92.48","93.7","94.02","93.47","93.14","93.25","92.3","93.19","94.39","93.71","93.68","92.44","91.6","92.53"];
	var coverTwoDX=["90.16","91.23","92.08","92.32","91.66","92.76","92.61","93.13","91.48","92.7","93.02","92.47","92.14","92.25","91.3","92.19","93.39","92.71","92.68","91.44","90.6","91.53"];
	var coverThreeDX=["89.16","90.23","91.08","91.32","90.66","91.76","91.61","92.13","90.48","91.7","92.02","91.47","91.14","91.25","90.3","91.19","92.39","91.71","91.68","90.44","89.6","90.53"];
	
	$(".btns li").click(function(){
		if($(this).is('.active')){
			$(this).removeClass("active");
			
			var currIndex = $(this).html();
			for(var i in cityData){
				if(currIndex == cityData[i]){
					currIndex = i;
				}
			}
			var city = {};
			city.name = cityData[currIndex];
			city.data = [coverOneDX[currIndex],coverTwoDX[currIndex],coverThreeDX[currIndex]];
			tmp.push(city);
			
			removeData(cityData,cityData[currIndex]);
			removeData(coverOneDX,coverOneDX[currIndex]);
			removeData(coverTwoDX,coverTwoDX[currIndex]);
			removeData(coverThreeDX,coverThreeDX[currIndex]);
			
			initBar();
		}else{
			$(this).addClass("active");
			var currIndex = $(this).html();
			for(var arr in tmp){
				if(currIndex == tmp[arr].name){

					cityData.push(tmp[arr].name);
					coverOneDX.push(tmp[arr].data[0]);
					coverTwoDX.push(tmp[arr].data[1]);
					coverThreeDX.push(tmp[arr].data[2]);
					
					tmp.splice(arr,1);
				}
			}
			
			initBar();
		}	
	});
	
	function removeData(arr,val){
		for(var i in arr){
			if(val == arr[i]){
				arr.splice(i,1);
			}
		}
	}
	
	
	initBar();
	function initBar(){		
	
	var myChart = echarts.init(document.getElementById('echarts_box'));
	var barOption={
		tooltip:{
			trigger:'axis',
			axisPointer:{
				type:'cross'
			},
		},
		legend:{
			bottom:0,
			textStyle:{
				fontSize:7
			},
			
			data:cityData
		},
		grid: {
			x: '10%',
			x2: 0,
			y: '30%',
			y2: '10%'
		},
		xAxis:[
				{
					type:'category',
					data:cityData,
					axisLabel:{
						interval: 0,
					},
					axisTick:{show:false},
					triggerEvent:true,
					
				},
				{
					type:'category',
					axisLine:{show:false},
					axisTick:{show:false},
					axisLabel:{show:false},
					splitArea:{show:false},
					splitLine:{show:false},
					data:cityData
				},
				{
					type:'category',
					axisLine:{show:false},
					axisTick:{show:false},
					axisLabel:{show:false},
					splitArea:{show:false},
					splitLine:{show:false},
					data:cityData
				}
			],
		yAxis:
			{
				min:'80',
				max:'100',
				type:'value',
				axisTick:{show:false},
				splitArea:{
					show:true,
					areaStyle:{
						color:['#eaeaea','#fff','#eaeaea','#fff']
					}
				},
				splitLine: {
				    lineStyle: {
				        // 使用深浅的间隔色
				        color: ["#ccc", '#ccc','#ccc','#ccc','#fff']
				    }
				}
			},
		series:[
			{
				name:'电信覆盖率(-105dbm)',
				type:'bar',
				itemStyle:{
					normal:{
						color:'#ade7ff',
						label:{
							show:false,
							textStyle:{
								
								color:'#111111'
							}
						}
					}
				},
				data:coverOneDX
			},
			{
				name:'电信覆盖率(-100dbm)',
				type:'bar',
				xAxisIndex:1,
				itemStyle:{
					normal:{
						color:'#5eccff',
						label:{
							show:false,
							textStyle:{
								
								color:'#111111'
							}
						}
					}
				},
				data:coverTwoDX
			},
			{
				name:'电信覆盖率(-95dbm)',
				type:'bar',
				xAxisIndex:2,
				itemStyle:{
					normal:{
						color:'#23b4f7',
						label:{
							show:false,
							textStyle:{
								
								color:'#111111'
							}
						}
					}
				},
				data:coverThreeDX
			}
		]
	}
	myChart.setOption(barOption);
	myChart.on('click', function (params) {
		var index = params.name;
		for(var i in cityData){
			if(index == cityData[i]){
				index = i;
			}
		}
		theMore.name = cityData[index];
		theMore.dataDx = [parseInt((Math.random()*25 + 50)*100)/100,parseInt((Math.random()*25 + 50)*100)/100,parseInt((Math.random()*25 + 50)*100)/100,coverThreeDX[index],coverTwoDX[index],coverOneDX[index]] ;//110,85,90,95,100,105
		theMore.dataLt = [parseInt((Math.random()*25 + 50)*100)/100,parseInt((Math.random()*25 + 50)*100)/100,parseInt((Math.random()*25 + 50)*100)/100,coverThreeLT[index],coverTwoLT[index],coverOneLT[index]] ;
		theMore.dataYd = [parseInt((Math.random()*25 + 50)*100)/100,parseInt((Math.random()*25 + 50)*100)/100,parseInt((Math.random()*25 + 50)*100)/100,coverThreeYD[index],coverTwoYD[index],coverOneYD[index]] ;
		initRadar();//更新雷达图
	});
	
	
	
	}
	/*==================================雷达===============================================*/
	initRadar();//初始化
	function initRadar(){
		var myChart1 = echarts.init(document.getElementById('echarts_box1'));
		var RadarOption = {
		    title: {
		    	x:'center',
		        text: theMore.name + '覆盖率',
		        textStyle:{
		        	fontSize:16
		        },
		        subtext : '电信：' + theMore.dataDx[5] + '%  移动:' + theMore.dataYd[5] + '%  联通：' + theMore.dataLt[5]+"%",
		    },
		    toolbox: {
		        show : true,
		        orient:'vertical',
		        showTitle:false,
		        feature : {
		            dataZoom: {
		               show:true
		            },
		            dataView : {readOnly:true},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    tooltip: {},
		    /*legend: {
		        data: []
		    },*/
		    radar: {
		        // shape: 'circle',
		        indicator: [
		           { name: '-110dBm', max: 110},
		           { name: '-85dBm', max: 85},
		           { name: '-90dBm', max: 90},
		           { name: '-95dBm', max: 95},
		           { name: '-100dBm', max: 100},
		           { name: '-105dBm', max: 105}
		        ],
		        center: ['50%', '55%'],
	        	radius: '60%',
		        nameGap:10
		    },
		    series: [{
		        name: theMore.name + '覆盖率',
		        type: 'radar',
		        // areaStyle: {normal: {}},
		        data : [
		            {
		                value : theMore.dataDx,
		                name : '电信覆盖率(%)'
		            },
		             {
		                value : theMore.dataLt,
		                name : '联通覆盖率(%)'
		            },
		             {
		                value : theMore.dataYd,
		                name : '移动覆盖率(%)'
		            }
		        ]
		    }]
		};
		myChart1.setOption(RadarOption);
		
	}
	
	
})