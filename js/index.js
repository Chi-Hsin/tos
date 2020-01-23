var indexData = new Vue({
            el: '#indexSheet',
            data: {
                'indexLocate':"?",//目前指標的位置
                'count':0,
                'comboCount':0,
                'neighborArr':[],
                'elementSelectBox':['heart','light','dark','water','fire','tree'],
                'elementSelect':'heart',
                'keyCodeCommand':{
                    'ArrowRight':'light',
                    'ArrowLeft':'heart',
                },
                'boardTemplate':[],//暫存板子上的資料
            	'elementBoard':[
                           //第一排珠
                            {index:0,element:'fire',background:"#3E2615",type:"normal"},
                            {index:1,element:'fire',background:"#28180F",type:"normal"},
                            {index:2,element:'fire',background:"#3E2615",type:"normal"},
                            {index:3,element:'heart',background:"#28180F",type:"normal"},
                            {index:4,element:'heart',background:"#3E2615",type:"normal"},
                            {index:5,element:'heart',background:"#28180F",type:"normal"},
                        
                          //第二排珠
                            {index:6,element:'fire',background:"#28180F",type:"normal"},
                            {index:7,element:'fire',background:"#3E2615",type:"normal"},
                            {index:8,element:'heart',background:"#28180F",type:"normal"},
                            {index:9,element:'heart',background:"#3E2615",type:"normal"},
                            {index:10,element:'heart',background:"#28180F",type:"normal"},
                            {index:11,element:'heart',background:"#3E2615",type:"normal"},
                        
                          //第三排珠
                            {index:12,element:'fire',background:"#3E2615",type:"normal"},
                            {index:13,element:'heart',background:"#28180F",type:"normal"},
                            {index:14,element:'heart',background:"#3E2615",type:"normal"},
                            {index:15,element:'heart',background:"#28180F",type:"normal"},
                            {index:16,element:'heart',background:"#3E2615",type:"normal"},
                            {index:17,element:'heart',background:"#28180F",type:"normal"},
                        
                           //第四排珠
                            {index:18,element:'heart',background:"#28180F",type:"normal"},
                            {index:19,element:'heart',background:"#3E2615",type:"normal"},
                            {index:20,element:'heart',background:"#28180F",type:"normal"},
                            {index:21,element:'heart',background:"#3E2615",type:"normal"},
                            {index:22,element:'heart',background:"#28180F",type:"normal"},
                            {index:23,element:'heart',background:"#3E2615",type:"normal"},
                        
                           //第五排珠
                            {index:24,element:'heart',background:"#3E2615",type:"normal"},
                            {index:25,element:'heart',background:"#28180F",type:"normal"},
                            {index:26,element:'heart',background:"#3E2615",type:"normal"},
                            {index:27,element:'heart',background:"#28180F",type:"normal"},
                            {index:28,element:'heart',background:"#3E2615",type:"normal"},
                            {index:29,element:'heart',background:"#28180F",type:"normal"},
                        
                    ],
                    'handMotionOrigin':0,//紀錄離開的轉點位置
                    'handMotionOver':0,//紀錄經過的轉點位置
            	    'handMotionContinue':0,//判斷滑鼠是否按著不放   才能拖移元素
                
            },
            methods: {
                elementSelectEvent:function(e){//更換珠子選色
                    this.elementSelect = e.target.getAttribute("data-dataInfo");
                },
                alertSthing:function(e){
                    var hasValue = this.keyCodeCommand.hasOwnProperty(e.code);
                    if(!hasValue){return;}
                    else{
                         for(var i=0;i<5;i++){
                            for(var j=0;j<6;j++){
                                this.elementBoard[6*i+j].element = this.keyCodeCommand[e.code];
                            }
                        }
                    }
                },
                calcCombo:function(index){//計算版面Combo數
                },
                test1:function(e){//滑鼠離開元素觸發
                    var index = e.target.getAttribute("data-index");
                    this.handMotionOrigin = Number(index);
                    // console.log("離開第"+this.handMotionOrigin+"個元素");

                },
                test2:function(e){//滑鼠觸碰元素觸發
                    this.indexLocate = e.target.getAttribute("data-index");

                    if(this.handMotionContinue){//當滑鼠按著不放時  才交換元素
                        if(this.handMotionOver == Number(this.indexLocate)){return;}
                        this.handMotionOver = Number(this.indexLocate);
                        // console.log("接觸第"+this.handMotionOver+"個元素");
                        this.test3()
                    }
                },
                test3:function(e){//交換元素
                        var change =  this.elementBoard[this.handMotionOrigin].element;
                        this.elementBoard[this.handMotionOrigin].element = this.elementBoard[this.handMotionOver].element;
                        this.elementBoard[this.handMotionOver].element = change;
                },
                //滑鼠按著不放+滑鼠放開的動作  其實就是click
                test4:function(e){//滑鼠按著不放
                    if(this.handMotionContinue == 1){ //如果是移動狀態  又跑到這個狀態時 那麼就設定滑鼠放開的狀態 而不改色
                        this.handMotionContinue = 0;
                        console.log("移動狀態解除");
                        return;
                    }
                    var index = e.target.getAttribute("data-index");
                    this.handMotionOrigin = Number(index); //按著不放會同時觸發自己珠子上的觸碰事件  這樣做可與自己交換
                    this.handMotionContinue = 1;
                    console.log("滑鼠按著不放")
                },
                test5:function(index){//滑鼠放開
                    if(this.handMotionContinue){
                        this.elementBoard[index].element = this.elementSelect;
                        this.handMotionContinue = 0;
                        console.log("滑鼠放開");
                        console.log("珠子已換色");
                    }
                },
                boardAll:function(obj){
                    for(var i=0;i<5;i++){
                        for(var j=0;j<6;j++){
                             this.elementBoard[6*i+j].element = obj[6*i+j];
                        }
                    }
                },
                randomBoard:function(){
                    var arr = [];
                    for(var i=0;i<30;i++){
                        var rrr = Math.floor(Math.random() * 6);
                        arr.push(this.elementSelectBox[rrr]);
                    }
                    this.boardAll(arr);
                },
                comboCalc:function(){
                    this.boardTemplate = JSON.parse(JSON.stringify(this.elementBoard))

                    for(var i=0;i<this.elementSelectBox.length;i++){
                       
                        var filterElement = this.elementSelectBox[i];
                        for(var j=0;j<30;j++){
                            
                            var index = this.findBoardIndex(filterElement);
                            console.log("index:"+index);
                            console.log("第"+(j+1)+"組"+filterElement);
                            if(index == -1){
                                console.log(this.elementSelectBox[i]+"已計算完畢");
                                break;
                            }
                             this.findNeighbor(index,filterElement)
                            if(this.count>=2){
                                this.comboCount += 1;
                                this.count = 0;
                                console.log("總Combo數:"+this.comboCount);
                            }
                            
                        }
                       
                    }
                    
                },
                findNeighbor:function(index,element){//以第幾個珠子為起點 找旁邊相符合的元素
                   
                   
                   // this.boardTemplate[index].element = "";
                   // for(var i=index+1;i<6*parseInt(index/6)+6;i++){
                   //       if(this.boardTemplate[i].element == element){
                   //          this.neighborArr.push(i);
                   //          this.boardTemplate[i].element = "";
                   //          this.count += 1;
                   //          console.log(i);
                   //       }
                   //       else{break;}
                   // }
                   // for(var j=index+6;j<index%6+25;j+=6){
                   //       if(this.boardTemplate[j].element == element){
                   //          this.neighborArr.push(j);
                   //          this.boardTemplate[j].element = "";
                   //          this.count += 1;
                   //          console.log(j);
                   //       }
                   //       else{break;}
                   //  }
                   
                   // return this.findNeighbor(,element);
                   // console.log("已經計算"+this.count+"次");
                },
                // factorial:function(x){
                //     console.log(x);
                //     if(x==1){return 1;};
                //     return x * this.factorial(x-1);
                // },
                // factorialLoop:function(){
                //     for(var i =1;i<6;i++){
                //         this.factorial(i);
                //         if(i>=3){
                //             console.log("執行大於等於3次");
                //         }
                //     }
                // },
                findBoardIndex:function(element){
                    var originIndex = this.boardTemplate.findIndex(function(x){return x.element == element})
                    return originIndex;
                },
            },
            computed: {
            	// allBlockElement:function() { //產生版面上30格格子的珠子物件
	            //         // var obj = new Object();
	            //         for (var i = 0; i < 5; i++) {
	            //             this.aaa[i] = {};
	            //             for(var j=0;j<6;j++){
	            //             	this.aaa[i][j] = {}; 
	            //             	this.aaa[i][j].background = (i%2 == j%2)?"#3E2615":"#28180F";
	            //             	this.aaa[i][j].x = i;
	            //             	this.aaa[i][j].y = j;
	            //             	this.aaa[i][j].element = "heart";
	            //             }
	            //         }
	            //         return this.aaa;
             //    },	
            },
            created() { //模板渲染前
                window.addEventListener('keyup',this.alertSthing);
            },
            mounted() {//模板渲染後 EX:加載完後 把Loading動畫關閉的效果實現
                // alert()
                
            }

            })