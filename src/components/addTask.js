import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';


const AddTaskForm = ({updateTask, onAddTask, onEditTask }) => {
    console.log("updateTask:", updateTask);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [state, setState] = useState('');
    const [isAdd, setIsAdd] = useState(true);

    useEffect(() => {
      // Update form fields when updateTask prop changes
      setTitle(updateTask.title || '');
      setDescription(updateTask.description || '');
      setDate(updateTask.date || '');
      setState(updateTask.state || '');
      if(updateTask.id) {
        setIsAdd(false);
      }
    }, [updateTask]);
  
    const handleSubmit = useCallback((e) => {
      e.preventDefault();
      const newTask = { title, description, date, state, id: isAdd? null: updateTask.id};
      if(isAdd) {
        onAddTask(newTask);
      } else {
        onEditTask(newTask);
      }
      setTitle('');
      setDescription('');
      setDate('');
      setState('');
      setIsAdd(true);
  }, [title, description, date, state, onAddTask]);

  const handleTitleChange = useCallback((e) => {
      setTitle(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e) => {
      setDescription(e.target.value);
  }, []);

  const handleDateChange = useCallback((e) => {
      setDate(e.target.value);
  }, []);

  const handleStateChange = useCallback((e) => {
      setState(e.target.value);
  }, []);

    return (
        <Container>            
            <Row className="justify-content-md-center add-task-form-container">
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label className="left-float mt-10">Title</Form.Label>
                <Form.Control 
                className="form-control-box"
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </Form.Group>
  
              <Form.Group controlId="description">
                <Form.Label className="left-float mt-10">Description</Form.Label>
                <Form.Control 
                className="form-control-box"
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </Form.Group>
  
              <Form.Group controlId="date">
                <Form.Label className="left-float mt-10">Date</Form.Label>
                <Form.Control
                className="form-control-box"
                  type="date"
                  placeholder="Enter date"
                  value={date}
                  onChange={handleDateChange}
                />
              </Form.Group>
  
              <Form.Group controlId="state">
                <Form.Label className="left-float mt-10">State</Form.Label>
                <Form.Control
                className="form-control-box"
                  as="select"
                  value={state}
                  onChange={handleStateChange}
                >
                  <option value="">Select state</option>
                  <option value="New">New</option>
                  <option value="In progress">In Progress</option>
                  <option value="Done">Done</option>
                </Form.Control>
              </Form.Group>
  
              <Button className='add-task-btn' variant="primary" type="submit">
                {
                  isAdd ? <span>Add Task</span> : <span>Update Task</span>
                }
              </Button>
            </Form>
          </Col>
        </Row>
        </Container>
    );
};

export default AddTaskForm;
