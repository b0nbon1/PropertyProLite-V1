import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import data from '../Mockdata/user';

chai.use(chaiHttp);
chai.should();
describe('Register', () => {
    it('should register new user successfully', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(data.user1)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.message.should.equal('successfully created account');
                if (err) return done();
                done();
            });
    });
    it('should check user firstname', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(data.user2)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Please fill all the fields');
                if (err) return done();
                done();
            });
    });
    it('should check user lastname', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(data.user3)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Please fill all the fields');
                if (err) return done();
                done();
            });
    });
    it('should check user email', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(data.user4)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Please fill all the fields');
                if (err) return done();
                done();
            });
    });
    it('should check user address', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(data.user5)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Please fill all the fields');
                if (err) return done();
                done();
            });
    });
    it('should check user phone Number', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(data.user6)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Please fill all the fields');
                if (err) return done();
                done();
            });
    });
    it('should check invalid user phone Number', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(data.user7)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Enter valid phone Number');
                if (err) return done();
                done();
            });
    });
    it('should check user password', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(data.user8)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Please fill all the fields');
                if (err) return done();
                done();
            });
    });
    it('should check user password if it has more than 6 characters', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(data.user9)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('enter valid password. should be 6 character and more and contain letters and numbers');
                if (err) return done();
                done();
            });
    });
    it('should check user valid first name', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(data.user10)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('enter valid firstname');
                if (err) return done();
                done();
            });
    });
    it('should check user valid last name', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(data.user11)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('enter valid lastname');
                if (err) return done();
                done();
            });
    });
    it('should check user valid email', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(data.user12)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('enter valid email e.g user@gmail.com');
                if (err) return done();
                done();
            });
    });
    it('should check if user email exists', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(data.user13)
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.be.a('object');
                res.body.message.should.equal('email account exists');
                if (err) return done();
                done();
            });
    });
});
