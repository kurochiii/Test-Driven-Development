// import { addPost } from "./postController";
// import { jest } from "@jest/globals";

const { addPost } = require("./postController");
// import postController from "./post.controller";
const postModel = require("../models/post");
// import postModel from "../models/post";

jest.mock('../models/post', () => ({
    create: jest.fn(),
    getByUser: jest.fn(),
    getById: jest.fn()
}));

describe('Post controller', () =>{
    // Setup the responses
    let req;
    let res;
    let error = new Error({ error: 'some error message'});

    beforeEach(() => {
        req = {
            body: {
                author: 'stswenguser',
                title: 'My first test post',
                content: 'Random content'
            },
            // params: {
            //     id: '507asdghajsdhjgasd',
            // },
            session: {
                user: 'stswenguser' // Mocking a user id for the session
            },
            flash: jest.fn()
        };

        res = {
            redirect: jest.fn()
        };


    });

    describe('addPost', () => {
        it('should create a post and redirect to /posts on success', () => {
            // Arrange
            postModel.create.mockImplementation((data, callback)=> callback(null,data));

            // Act
            addPost(req, res);

            // Assert
            expect(postModel.create).toHaveBeenCalledWith(req.body, expect.any(Function));
            expect(res.redirect).toHaveBeenCalledWith('/posts');
            

            // expect(req.flash).not.toHaveBeenCalled(); // No error message should be flashed
        });

        it('should handle errors and redirect to /posts/add on failure', () => {
            // Arrange
            postModel.create.mockImplementation((data, callback)=> callback(error,null));

            // Act
            addPost(req, res);

            // Assert
            expect(postModel.create).toHaveBeenCalledWith(req.body, expect.any(Function));
            expect(res.redirect).toHaveBeenCalledWith('/posts/add');
    

            // expect(req.flash).toHaveBeenCalledWith('error_msg', 'Could not create post. Please try again.');
        });
        
    });

    
});


