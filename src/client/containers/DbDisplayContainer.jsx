import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import DbDisplay from '../components/DbDisplay.jsx';

class DbDisplayContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRefs: [],
      allPositions: [],
      width: window.innerWidth,
      height: window.innerHeight,
      colors: ['#ae63e4','darkblue','gray','lightgray','white','cornflowerblue','darkgoldenrod']
    };
    this.storePositions = this.storePositions.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }


  componentDidMount() {
    // this.drawLines();
    
    window.addEventListener('resize', this.updateDimensions);
    
    console.log(this.state.width,this.state.height,'w,h')
    const { db } = this.props;

    let test;
    setTimeout(() => {
      test = document.getElementsByClassName('list-group-item');
      console.log(test, ',');
      for (let i = 0; i < test.length; i += 1) {
        if (test[i].textContent.includes('REFERENCES')) {
          const tt = test[i].textContent.split(' ');

          for (let j = 0; j < test.length; j += 1) {
            // console.log(tt[tt.indexOf('REFERENCES') + 3], tt[tt.indexOf('REFERENCES') + 1]);
            if (test[j].textContent.includes(tt[tt.indexOf('REFERENCES') + 1]) && (!test[j].textContent.includes('REFERENCES')) && (test[j].parentNode.childNodes[0].textContent === (tt[tt.indexOf('REFERENCES') + 3]))) {
              

              // The data for our line
              const lineData = [
                { x: test[i].getBoundingClientRect().x, y: test[i].getBoundingClientRect().y+10 },
                { x: test[i].parentNode.parentNode.getBoundingClientRect().x, y: test[i].getBoundingClientRect().y+10 },
                { x: test[i].parentNode.parentNode.getBoundingClientRect().x, y: test[i].parentNode.parentNode.getBoundingClientRect().y+10 },
                { x: test[i].parentNode.parentNode.getBoundingClientRect().x, y: test[i].parentNode.parentNode.getBoundingClientRect().y+10 },
                { x: test[j].parentNode.parentNode.getBoundingClientRect().x, y: test[i].parentNode.parentNode.getBoundingClientRect().y+10 },
                { x: test[j].parentNode.parentNode.getBoundingClientRect().x, y: test[j].getBoundingClientRect().y+10 },
                { x: test[j].getBoundingClientRect().x, y: test[j].getBoundingClientRect().y+10 }];

              // This is the accessor function we talked about above
              const lineFunction = d3.line()
                .x(d => d.x)
                .y(d => d.y)
                .curve(d3.curveBasis);
              
              const bodyCanvas = document.getElementById('dbDisplayContainer');
              const svgContainer = d3.select(bodyCanvas)
                .append('div')
                .classed('svg-container', true)
                .append('svg')
                .attr('width', '100%')
                .attr('height', '100%')
                // .attr('preserveAspectRatio', 'xMinYMin meet')
                // .attr("viewBox", "0 0 600 400")
                .classed("svg-content-responsive", true); 

              // The line SVG Path we draw
              // function getRandomColor() {
              //   var letters = '0123456789ABCDEF';
              //   var color = '#';
              //   for (var i = 0; i < 6; i++) {
              //     color += letters[Math.floor(Math.random() * 16)];
              //   }
              //   return color;
              // }

              const lineGraph = svgContainer.append('path')
                .attr('d', lineFunction(lineData))
                .attr('stroke', this.state.colors[i%(this.state.colors.length)])
                .attr('stroke-width', 2)
                .attr('fill', 'none');
            }
          }
          
        }
      }
     
    }, 1000);

  }

  updateDimensions() {
  //  d3.select('svg').remove();
   d3.selectAll('svg').remove();
   
   const { db } = this.props;

    let test;
    setTimeout(() => {
      test = document.getElementsByClassName('list-group-item');
      console.log(test, ',');
      for (let i = 0; i < test.length; i += 1) {
        if (test[i].textContent.includes('REFERENCES')) {
          const tt = test[i].textContent.split(' ');

          for (let j = 0; j < test.length; j += 1) {
            // console.log(tt[tt.indexOf('REFERENCES') + 3], tt[tt.indexOf('REFERENCES') + 1]);
            if (test[j].textContent.includes(tt[tt.indexOf('REFERENCES') + 1]) && (!test[j].textContent.includes('REFERENCES')) && (test[j].parentNode.childNodes[0].textContent === (tt[tt.indexOf('REFERENCES') + 3]))) {
              

              // The data for our line
              const lineData = [
                { x: test[i].getBoundingClientRect().x, y: test[i].getBoundingClientRect().y },
                { x: test[i].parentNode.parentNode.getBoundingClientRect().x, y: test[i].getBoundingClientRect().y },
                { x: test[i].parentNode.parentNode.getBoundingClientRect().x, y: test[i].parentNode.parentNode.getBoundingClientRect().y },
                { x: test[i].parentNode.parentNode.getBoundingClientRect().x, y: test[i].parentNode.parentNode.getBoundingClientRect().y },
                { x: test[j].parentNode.parentNode.getBoundingClientRect().x, y: test[i].parentNode.parentNode.getBoundingClientRect().y },
                { x: test[j].parentNode.parentNode.getBoundingClientRect().x, y: test[j].getBoundingClientRect().y },
                { x: test[j].getBoundingClientRect().x, y: test[j].getBoundingClientRect().y }];

              // This is the accessor function we talked about above
              const lineFunction = d3.line()
                .x(d => d.x)
                .y(d => d.y)
                .curve(d3.curveBasis);
              
              const bodyCanvas = document.getElementById('dbDisplayContainer');
              const svgContainer = d3.select(bodyCanvas)
                .append('div')
                .classed('svg-container', true)
                .append('svg')
                .attr('width', '100%')
                .attr('height', '100%')
                // .attr('preserveAspectRatio', 'xMinYMin meet')
                // .attr("viewBox", "0 0 600 400")
                .classed("svg-content-responsive", true); 

              // function getRandomColor() {
              //   var letters = '0123456789ABCDEF';
              //   var color = '#';
              //   for (var i = 0; i < 6; i++) {
              //     color += letters[Math.floor(Math.random() * 16)];
              //   }
              //   return color;
              // }
              
              // let color = ['pink', 'lightblue', 'indigo', 'darkcyan']
              // The line SVG Path we draw
              const lineGraph = svgContainer.append('path')
                .attr('d', lineFunction(lineData))
                .attr('stroke', this.state.colors[i%(this.state.colors.length)])
                .attr('stroke-width', 2)
                .attr('fill', 'none');
              
            }
          }
          
        }
      }
     
    }, 1000);
  }
 


  storePositions(stuff) {
    // const positions = this.state.allPositions.slice();
    // positions.push(stuff);
    this.setState({ allPositions: stuff });
    console.log(stuff, 'stuff', this.state.allPositions);
  }


  render() {
    const { db } = this.props;
    const tables = db.map(tableInfo => <DbDisplay key={tableInfo.name} tableInfo={tableInfo} ref={tableInfo.name} storePositions={this.storePositions} />);
    console.log(tables, 'tbl');
    // const arrTest = this.state.allRefs.slice();
    // db.forEach(ele => {
    //   console.log(arrTest,'TT',ele)
    //   ele.columns.forEach(e=>arrTest.push(e))
    // });
    // console.log(tables, 'tables2');
    return (
      <div id="dbDisplayContainer">
        {tables}
      </div>
    );
  }

  // return (
  //   <div id="dbDisplayContainer">
  //     {tables}
  //   </div>
  // );
}

export default DbDisplayContainer;
