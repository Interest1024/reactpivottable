import React from 'react';
import PivotTableUI from '../src/PivotTableUI';
import '../src/pivottable.css';
import TableRenderers from '../src/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from '../src/PlotlyRenderers';

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);

// see documentation for supported input formats
let data = [['attribute', 'attribute2'], ['value1', 'value2']];

/*
const data =
[['GENDER', 'NAME', 'NUMBER', 'YEAR'],
    ["Boys", "Oliver",'616', '2018']
,["Boys", "Ashton", '170','2018']
];
*/

/*
let data =
[{GENDER: "Boys", NAME: "Oliver", NUMBER: 616, YEAR: 2018}
,{GENDER: "Boys", NAME: "Ashton", NUMBER: 170, YEAR: 2018}
,{GENDER: "Boys", NAME: "William", NUMBER: 567, YEAR: 2018}
,{GENDER: "Boys", NAME: "Lincoln", NUMBER: 169, YEAR: 2018}];
*/

class App extends React.Component {
    constructor(props) {
        super(props);
        //this.state = props;
        //console.log('===>props');
        //console.log(props);
        this.state = {data,
            pivotState: props};
    }

    
    async componentDidMount() {
        data = await fetch('https://cors-anywhere.herokuapp.com/https://www.code.sydney/api_topbabynames/topbabynames/all/2018/boys')
            .then(response=>response.json())
            //.then(data => console.log(data))
            .then(data => this.setState({data, pivotState: this.state.pivotState}))
            .catch ( () => this.props.history.push('/') );
    }

    render() {
        return (
            <PivotTableUI
                data={this.state.data}
                onChange={s => this.setState({pivotState: s})}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                {...this.state.pivotState}
            />
        );
    }
}

//ReactDOM.render(<App />, document.body);
export default App;