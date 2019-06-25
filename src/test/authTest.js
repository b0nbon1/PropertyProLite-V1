import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();
describe('Authentication', () => {
    describe('Register', () => {
        it('should register new user successfully', (done) => {
            chai.request(app)
                .post('/api/v1/register')
                .send({
                    firstname: 'bonbon',
                    lastname: 'vic',
                    email: 'bonbo@test.com',
                    address: 'kenya',
                    password: 'f5e4xhr43dh4t',
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('successfully created account');
                    if (err) return done();
                    done();
                });
        });
        it('should check user firstname', (done) => {
            chai.request(app)
                .post('/api/v1/register')
                .send({
                    firstname: '',
                    lastname: 'vic',
                    email: 'bonbon@tes.com',
                    address: 'kenya',
                    password: 'ftdtfr5e4xh4t',
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('make sure all fields are filled');
                    if (err) return done();
                    done();
                });
        });
        it('should check user lastname', (done) => {
            chai.request(app)
                .post('/api/v1/register')
                .send({
                    firstname: 'bonbon',
                    lastname: '',
                    email: 'bonbon@tes.com',
                    address: 'kenya',
                    password: 'ftdtfr5e4xhr4t',
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('make sure all fields are filled');
                    if (err) return done();
                    done();
                });
        });
        it('should check user email', (done) => {
            chai.request(app)
                .post('/api/v1/register')
                .send({
                    firstname: 'bonbon',
                    lastname: 'vic',
                    email: '',
                    address: 'kenya',
                    password: 'ftdtfr5e4xhr44t',
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('make sure all fields are filled');
                    if (err) return done();
                    done();
                });
        });
        it('should check user address', (done) => {
            chai.request(app)
                .post('/api/v1/register')
                .send({
                    firstname: 'bonbon',
                    lastname: 'vic',
                    email: 'bonbon@tst.com',
                    address: '',
                    password: 'ftdtfr5e4xhr4t',
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('make sure all fields are filled');
                    if (err) return done();
                    done();
                });
        });
        it('should check user password', (done) => {
            chai.request(app)
                .post('/api/v1/register')
                .send({
                    firstname: 'bonbon',
                    lastname: 'vic',
                    email: 'bobon@test.com',
                    address: 'kenya',
                    password: '',
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('make sure all fields are filled');
                    if (err) return done();
                    done();
                });
        });
        it('should check user password if it has more than 6 characters', (done) => {
            chai.request(app)
                .post('/api/v1/register')
                .send({
                    firstname: 'bonbon',
                    lastname: 'vic',
                    email: 'bonon@test.com',
                    address: 'kenya',
                    password: 'ftdr',
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    if (err) return done();
                    done();
                });
        });
        it('should check user valid first name', (done) => {
            chai.request(app)
                .post('/api/v1/register')
                .send({
                    firstname: 'b&',
                    lastname: 'vic',
                    email: 'bonon@test.com',
                    address: 'kenya',
                    password: 'ftdr',
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('invalid first name');
                    if (err) return done();
                    done();
                });
        });
        it('should check user valid last name', (done) => {
            chai.request(app)
                .post('/api/v1/register')
                .send({
                    firstname: 'bonbon',
                    lastname: 'v%',
                    email: 'bonon@test.com',
                    address: 'kenya',
                    password: 'ftdr',
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('invalid last name');
                    if (err) return done();
                    done();
                });
        });
        it('should check user valid email', (done) => {
            chai.request(app)
                .post('/api/v1/register')
                .send({
                    firstname: 'bonbon',
                    lastname: 'v%',
                    email: 'bcom',
                    address: 'kenya',
                    password: 'ftdr',
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('invalid email');
                    if (err) return done();
                    done();
                });
        });
        it('should check if user email exists', (done) => {
            chai.request(app)
                .post('/api/v1/register')
                .send({
                    firstname: 'bonbon',
                    lastname: 'vic',
                    email: 'bonbon@test.com',
                    address: 'kenya',
                    password: 'ftdtfr5e4x4t',
                })
                .end((err, res) => {
                    res.should.have.status(409);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('email account exists');
                    if (err) return done();
                    done();
                });
        });
    });
});
