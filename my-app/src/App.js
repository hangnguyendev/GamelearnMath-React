import React, { Component } from 'react';

class App extends React.Component{
    constructor() {
        super();
        this.state = {
            numbers : [1, 2, 3, 4, 5,6,7,8,9],
            a:10,
            random:4,
            choosenumber:[],
            totalNumber:0
         
        };
        
        this.handleClick = this.handleClick.bind(this);
        this.getSum = this.getSum.bind(this);
      }
      
        printStar=()=>{   
            let stars = [];
            for (let j = 0; j < this.state.random; j++) {
                stars.push(<i className="fa fa-star fa-spin"></i>)
            }
            return stars;
        }

        handleClick() {
            // this.setState({ totalNumber: this.state.choosenumber.reduce(this.getSum)});
            const random= this.state.random;
            const x = Math.floor((Math.random() * 10) + 1);
            this.setState({ random:x });
            this.state.choosenumber =this.state.choosenumber.map(Number);
            const a=this.state.choosenumber.reduce(this.getSum);
            
            console.log(a);
            // {this.printstar(random)};
            // console.log({this.state.totalNumber});
        }
        getSum(total, num) {
            return total + num;
        }
        onClickBtn=(e)=>{
            let number=e.target.value;
            // var btn = document.createElement("input");
            // btn.type = "button";
            // btn.value=number;
            // console.log( btn.setAttribute("id",this.state.a));
            // document.getElementById("right").appendChild(btn);
            this.setState({ choosenumber: [...this.state.choosenumber,number] });
            // this.setState({ totalNumber: choosenumber.reduce(getSum)});
            // console.log(this.state.choosenumber,number);
            return 0;
        } 
    
        renderChooseButton() {
            return (
                <div>
                    {this.state.choosenumber.map(item => {
                    return <button type="button" className="btn btn-default" value={item} onClick={this.removeButton}>{item}</button>
                    })}
                </div>
            );
        }

        render(){
            return (
                <div>
                    <div className="left-content" id="left">
                            {this.printStar(this.state.random)}
                    </div>

                    <div className="right-content" id="right">
                            {this.renderChooseButton()} 
                    </div>

                    <div className="center">
                            <button className="btn default"  onClick={this.handleClick}> = </button>
                            <button className="btn default"> Reset </button>
                    </div>
                
                    <div className="button-below">
                        {this.state.numbers.map((item,i)=> (
                            <button className="btn default" value={item} onClick={(e) => this.onClickBtn(e)}> {item} </button>
                                                ))}
                        
                        {/* <button className="btn default" value="1" onClick={this.createBtn()}> 1 </button>
                        <button className="btn default" value="2" onClick={this.createBtn()}> 2 </button>
                        <button className="btn default" value="3" onClick={this.createBtn()}> 3 </button>
                        <button className="btn default" value="4" onClick={this.createBtn()}> 4 </button>
                        <button className="btn default" value="5" onClick={this.createBtn()}> 5 </button>
                        <button className="btn default" value="6" onClick={this.createBtn()}> 6 </button>
                        <button className="btn default" value="7" onClick={this.createBtn()}> 7 </button>
                        <button className="btn default" value="8" onClick={this.createBtn()}> 8 </button>
                        <button className="btn default" value="9" onClick={this.createBtn()}> 9 </button> */}
                    </div>
                    
                </div>
            )
        }
    }

    export default App
















































//  class Buttonbelow extends React.Component{
   
//     render(){
//         return (
        
//                 // <div className="button-below">
//                 //     <button className="btn default" value="1" onClick=""> 1 </button>
//                 //     <button className="btn default" value="2"> 2 </button>
//                 //     <button className="btn default" value="3"> 3 </button>
//                 //     <button className="btn default" value="4"> 4 </button>
//                 //     <button className="btn default" value="5"> 5 </button>
//                 //     <button className="btn default" value="6"> 6 </button>
//                 //     <button className="btn default" value="7"> 7 </button>
//                 //     <button className="btn default" value="8"> 8 </button>
//                 //     <button className="btn default" value="9"> 9 </button>
//                 // </div>
//         )
       
//      }
//  }
//  class Butonequal extends React.Component{
//     render(){
      
//         return (
//                     // <div className="center">
//                     //     <button className="btn default"> = </button>
//                     //     <button className="btn default"> Reset </button>
//                     // </div>
//                 )
//             }
// }

// class Star  extends React.Component{
//     render(){
      
//         return (
//                     <div className="left">
//                         <i className="fa fa-star fa-spin"></i><i className="fa fa-star fa-spin"></i>
//                     </div>
                   
//                 )
//             }
// }


// // App.PropTypes={
// //      txt : React.PropTypes.string
// //     // cat: React.PropTypes.number
// // }