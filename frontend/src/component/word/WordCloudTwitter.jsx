import React from 'react';
import WordCloud from 'react-d3-cloud';
import {Form} from 'react-bootstrap';
import { scaleOrdinal } from 'd3-scale';
import { Grid } from "@material-ui/core";
import BarWordCloud from '../bar/BarWordCloudTwitter';



export default function WordCloudTwitter(props) {
const fillpositive = (props.valueWord==="5" ?['#007871', '#00B9AE', '#34C7BD', '#7CDDDD', '#CAF2EF'] : ['#46490F','#46490F','#D2DC2E','#D2DC2E','#D2DC2E','#D2DC2E','#E1E86D','#E1E86D','#E1E86D','#E1E86D','#E1E86D','#E1E86D','#E1E86D','#E1E86D','#E1E86D','#E1E86D','#E1E86D','#E1E86D','#E1E86D','#E1E86D','#E1E86D','#E1E86D'])
const fillnegative = (props.valueWord==="5" ?['#007871', '#00B9AE', '#34C7BD', '#7CDDDD', '#CAF2EF'] : ['#A52028','#A52028','#E1848A','#E1848A','#E1848A','#E1848A','#F6CFD2','#F6CFD2','#F6CFD2','#F6CFD2','#F6CFD2','#F6CFD2','#F6CFD2','#F6CFD2','#F6CFD2','#F6CFD2','#F6CFD2','#F6CFD2','#F6CFD2','#F6CFD2','#F6CFD2','#F6CFD2'])
const fillneutral  = (props.valueWord==="5" ?['#007871', '#00B9AE', '#34C7BD', '#7CDDDD', '#CAF2EF'] : ['#132947','#132947','#3A7BD5','#3A7BD5','#3A7BD5','#3A7BD5','#BDD3F1','#BDD3F1','#BDD3F1','#BDD3F1','#BDD3F1','#BDD3F1','#BDD3F1','#BDD3F1','#BDD3F1','#BDD3F1','#BDD3F1','#BDD3F1','#BDD3F1','#BDD3F1','#BDD3F1','#F6CFD2'])
const fillcollor  = ['#007871', '#3073cf', '#faf62a', '#f0325f', '#CAF2EF','#8832f0']
console.log(props.data,'TEST')
// const schemeCategory10ScaleOrdinal = scaleOrdinal(props.sentiment==="Positive"?fillpositive:props.sentiment==="Negative"?fillnegative:fillneutral);
const schemeCategory10ScaleOrdinal = scaleOrdinal(fillcollor);
const rotate = (word) => (word.value % 90) - 45;


    const renderForBarWordCloud = () => {
        
        let textArr = [];
        let valArr = [];
        let sentiment = props.sentiment

        if(props.data.length > 0){
            let ab = props.data.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
         
            for(var i=0; i < 5 ; i++){
                textArr.push(ab[i].text)
                valArr.push(ab[i].value)
            }

        }

        return(
            <BarWordCloud text={textArr} value={valArr} sentiment={sentiment} />
        )
    }

    return (
        <div >
            <Grid container justifyContent="left">
                    <Grid item sm={7} style={{ marginTop : 10}}>
                        <Grid style={{ marginTop : 40}}>
                            <WordCloud 
                                data={props.data}
                                width={180}
                                height={120}  
                                font="Roboto"
                                fontWeight="bold"
                                // fontSize={props.sentiment!=="" ? (word) => Math.log2(word.value) * 3 : props.daerah!=="" ?(word) => Math.log2(word.value) * 7 : props.topik!=="" ?(word) => Math.log2(word.value) * 3 : (word) => Math.log2(word.value) * 1.8}
                                // fontSize={(word) => (Math.log2(word.value)*2)-4}
                                fontSize={13}
                                rotate={rotate}
                                padding={1}
                                fill={(d, i) => schemeCategory10ScaleOrdinal(i)}
                                // random={0}
                                // onWordClick={(word) => {
                                // console.log(`onWordClick: ${word}`);
                                // }}
                                // onWordMouseOver={(word) => {
                                // console.log(`onWordMouseOver: ${word}`);
                                // }}
                                // onWordMouseOut={(word) => {
                                // console.log(`onWordMouseOut: ${word}`);
                                // }}
                                />
                        </Grid>
                    </Grid>
                    <Grid  item sm={5} style={{ marginTop : -50}}>
                        {renderForBarWordCloud()}
                    </Grid>
                </Grid>
        </div>
    )
}