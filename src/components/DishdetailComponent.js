import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
    

function RenderDish({dish}){
    return(
        <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
            <CardTitle className="text-left">
            <h5>{dish.name}</h5>
            </CardTitle>
            <CardText className="text-left">{dish.description}</CardText>
        </CardBody>
        </Card>  
    );
    
}
function RenderComments({comments}){
    const coment = comments.map((lo)=>{
        var padding ={
            paddingTop: '10px',
            paddingBottom: '10px',
        }
        var alig = {
            marginLeft: '-15px'
        }
        return(

                <div className="col-12 md-5 text-left" style={alig}>
                    <li style={padding}><h7>{lo.comment}</h7></li>
                   <li style={padding}><h7> <h7>-- </h7>{lo.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(lo.date)))}</h7></li>
                </div>
        );
    });
    return(
        <div className="col-12 col-md-5 m-1 text-left">
            <h4>Comments</h4>
            <ul class= "list-unstyled">
                {coment}
            </ul>
            
        </div>
    );
    
}


const DishDetail = (props)=>{
    if (props.dish != null){
       // const comment = this.renderComments(this.props.dish)
        return(
                <div className ="container">
                     <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>    
                     <div className="row">
                        <div  className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish}/>
                        </div>
                        <RenderComments comments={props.comments}/>
                    </div>
                </div>
               
        );
    }
    else
        return(
            <div></div>
        );
}
    


export default DishDetail;