import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
chai.should();
describe('Register', () => {
    it('should register new user successfully', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                firstname: 'bonbon',
                lastname: 'vic',
                email: 'bonbo@test.com',
                phoneNumber: '+254742087558',
                address: 'kenya',
                password: 'f5e4xhr43dh4t',
            })
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
            .send({
                firstname: '',
                lastname: 'vic',
                email: 'bonbon@tes.com',
                phoneNumber: '+254742087558',
                address: 'kenya',
                password: 'ftdtfr5e4xh4t',
            })
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
            .send({
                firstname: 'bonbon',
                lastname: '',
                email: 'bonbon@tes.com',
                phoneNumber: '+254742087558',
                address: 'kenya',
                password: 'ftdtfr5e4xhr4t',
            })
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
            .send({
                firstname: 'bonbon',
                lastname: 'vic',
                email: '',
                phoneNumber: '+254742087558',
                address: 'kenya',
                password: 'ftdtfr5e4xhr44t',
            })
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
            .send({
                firstname: 'bonbon',
                lastname: 'vic',
                email: 'bonbon@tst.com',
                phoneNumber: '+254742087558',
                address: '',
                password: 'ftdtfr5e4xhr4t',
            })
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
            .send({
                firstname: 'bonbon',
                lastname: 'vic',
                email: 'bonbon@tst.com',
                phoneNumber: '',
                address: 'nairobi, kenya',
                password: 'ftdtfr5e4xhr4t',
            })
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
            .send({
                firstname: 'bonbon',
                lastname: 'vic',
                email: 'bonbon@tst.com',
                phoneNumber: '45478',
                address: 'nairobi, kenya',
                password: 'ftdtfr5e4xhr4t',
            })
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
            .send({
                firstname: 'bonbon',
                lastname: 'vic',
                email: 'bobon@test.com',
                phoneNumber: '+254742087558',
                address: 'kenya',
                password: '',
            })
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
            .send({
                firstname: 'bonbon',
                lastname: 'vic',
                email: 'bonon@test.com',
                phoneNumber: '+254742087558',
                address: 'kenya',
                password: 'ftdr',
            })
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
            .send({
                firstname: 'b&',
                lastname: 'vic',
                email: 'bonon@test.com',
                phoneNumber: '+254742087558',
                address: 'kenya',
                password: 'ftdr',
            })
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
            .send({
                firstname: 'bonbon',
                lastname: 'v%',
                email: 'bonon@test.com',
                phoneNumber: '+254742087558',
                address: 'kenya',
                password: 'ftdr',
            })
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
            .send({
                firstname: 'bonbon',
                lastname: 'vicker',
                email: 'bcom',
                phoneNumber: '+254742087558',
                address: 'kenya',
                password: 'ftdrgtytr5445',
            })
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
            .send({
                firstname: 'bonbon',
                lastname: 'vic',
                email: 'bonbo@test.com',
                phoneNumber: '+254742087558',
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
