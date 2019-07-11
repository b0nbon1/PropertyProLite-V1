import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
chai.should();
describe('Login', () => {
    before('generste new user', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                firstname: 'bonbon',
                lastname: 'vic',
                email: 'boybunny@test.com',
                phoneNumber: '+254742087558',
                address: 'kenya',
                password: 'f5e4xhr43dh4t',
            })
            .end((err) => {
                if (err) return done();
                done();
            });
    });
    it('should Login user successfully', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'boybunny@test.com',
                password: 'f5e4xhr43dh4t',
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                res.body.message.should.equal('successfully logged in');
                if (err) return done();
                done();
            });
    });
    it('should check user email', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send({
                email: '',
                password: 'ftdtfr5e4x4t',
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Please fill all the fields');
                if (err) return done();
                done();
            });
    });
    it('should check all fields present', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send({
                email: '',
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
    it('should check user password', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'bonhdfsd@test.com',
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
    it('should confirm if user exists', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'bonhdfsd@test.com',
                password: 'ftdtfr5e4x4t',
            })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.message.should.equal('User is not registered. Sign up to create account');
                if (err) return done();
                done();
            });
    });
    it('should check if the password matches', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'boybunny@test.com',
                password: 'ftdtfr5u6g',
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.message.should.equal('wrong password!');
                if (err) return done();
                done();
            });
    });
});
