import React,{ Component }  from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem , Button,Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label,Row} from 'reactstrap';
import { Link } from 'react-router-dom';

import { Control, Errors, LocalForm } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

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


class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);

        
    }
 
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        alert("Rating: "+this.rating.value+ " Name: " +this.name+ " Comment: " +this.message);
        // event.preventDefault();
    }
    
   
    render() { 
        return ( 
            <div>

                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-md"></span> Submit Comment</Button>
                {/* Task1 and task2 */}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submmit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm>
                        
                            <FormGroup>
                                <Label htmlFor="Rating"><h6>Rating</h6></Label>
                                <Input model=".rating" type="number" id="username" name="username"
                                    placeholder="1" validateOn="blur" defaultValue='1'
                                     min={1} max={5} />
                                </FormGroup>
                                
                                {/* Task3 */}
                                <FormGroup>
                                <Label htmlFor="name"><h6>Your Name</h6></Label>
                                    <Control.text model = "name.e" type="name" id="name" name="name"
                                                className="form-control"
                                                placeholder="Your Name"
                                                validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                                }}
                                        />
                                            
         
                                            <Errors
                                                className="text-danger"
                                                model="name.e"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                    minLength: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                            /> 
                                </FormGroup>
                                   
                                        
                                    
                            
                                <FormGroup>
                                    <Label htmlFor="Comment"><h6>Comment</h6></Label>
                                     <Control.textarea model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control" />
                                </FormGroup>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                       
                    </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
         );
    }
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
                <CommentForm/>
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