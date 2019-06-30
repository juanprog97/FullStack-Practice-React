import React,{ Component }  from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem , Button,Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label,Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({dish}){ 
    return(
        <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
         <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
         </Card>
        </FadeTransform> 
    );
    
}

function RenderComments({comments, postComment, dishId}){
    if(comments != null)
        return(
            <div className="col-12 col-md-5 m-1 text-left">
                <h4>Comments</h4>
                <ul class= "list-unstyled">
                <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
                        </Stagger>
                    <CommentForm dishId={dishId} postComment={postComment} />
                </ul>
                
            </div>
        );
    
}



class CommentForm extends Component {
    constructor(props){
        super(props);
        
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
    }
 
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        // event.preventDefault();
    }
    
   
    render() { 
        return ( 
            <div>

                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-md"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submmit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        
                            <FormGroup>
                                <Label htmlFor="rating"><h6>Rating</h6></Label>
                                <Control.select model=".rating"  id="rating"
                                    placeholder="1" validateOn="blur" defaultValue='1' className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                     
                                     
                                     
                                </FormGroup>
                                <FormGroup>
                                <Label htmlFor="author"><h6>Your Name</h6></Label>
                                    <Control.text model = ".author" type="name" id="author"
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
                                     <Control.textarea model=".comment" id="comment" 
                                        rows="6"
                                        className="form-control" />
                                </FormGroup>
                                <Button type="submit" className="bg-primary">Submit</Button>
                       
                    </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
         );
    }
}
 



const DishDetail = (props)=>{
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null)
    
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
                        <RenderComments comments={props.comments}
                           postComment={props.postComment}
                            dishId={props.dish.id}
                        />
                        
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