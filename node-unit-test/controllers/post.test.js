const { addPost } = require("./postController");
const { registerUser } = require("./userController");
const postModel = require("../models/post");
const userModel = require("../models/user");

jest.mock('../models/post', () => ({
    create: jest.fn(),
}));

jest.mock('../models/user', () => ({
    create: jest.fn(),
    getOne: jest.fn()
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn((password, saltRounds, callback) => callback(null, 'hashedPassword')),
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
        it('create a post and redirect to /posts', () => {
            // Arrange
            postModel.create.mockImplementation((data, callback)=> callback(null,data));

            // Act
            addPost(req, res);

            // Assert
            expect(postModel.create).toHaveBeenCalledWith(req.body, expect.any(Function));
            expect(res.redirect).toHaveBeenCalledWith('/posts');
            
        });

        it('handle errors and redirect to /posts/add', () => {
            // Arrange
            postModel.create.mockImplementation((data, callback)=> callback(error,null));

            // Act
            addPost(req, res);

            // Assert
            expect(postModel.create).toHaveBeenCalledWith(req.body, expect.any(Function));
            expect(res.redirect).toHaveBeenCalledWith('/posts/add');
    
        });
        
    });

    
});

describe('User controller', () =>{
    // Setup the responses
    let req;
    let res;
    let error = new Error({ error: 'some error message'});

    beforeEach(() => {
        req = {
            body: {
                name: 'UserName',
                email: 'SomeEmail@gmail.com',
                password: '123456'
            },
            flash: jest.fn()
        };

        res = {
            redirect: jest.fn()
        };

    });

    describe('registerUser', () => {
        it('create a user and redirect to /login', () => {
            // Arrange
            userModel.create.mockImplementation((data, callback)=> callback(null, data));
            userModel.getOne.mockImplementation((email, callback)=> callback(null, null));

            // Act
            registerUser(req, res);

            const newUser = {
                name: 'UserName',
                email: 'SomeEmail@gmail.com',
                password: 'hashedPassword'
              };

            // Assert
            expect(userModel.create).toHaveBeenCalledWith(newUser, expect.any(Function));
            expect(res.redirect).toHaveBeenCalledWith('/login');
            
        });

        it('should handle errors and redirect to /register on failure', () => {
            // Arrange
            userModel.create.mockImplementation((data, callback)=> callback(error,null));

            // Act
            registerUser(req, res);

            const newUser = {
                name: 'UserName',
                email: 'SomeEmail@gmail.com',
                password: 'hashedPassword'
              };

            // Assert
            expect(userModel.create).toHaveBeenCalledWith(newUser, expect.any(Function));
            expect(res.redirect).toHaveBeenCalledWith('/register');
    
        });
        
    });

    
});


