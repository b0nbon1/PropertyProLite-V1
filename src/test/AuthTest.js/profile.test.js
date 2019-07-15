import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import data from '../Mockdata/user';

let token;

chai.use(chaiHttp);
chai.should();
describe('Profile', () => {
    before('generate JWT', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(data.user14)
            .end((err, res) => {
                // eslint-disable-next-line prefer-destructuring
                token = res.body.data;
                if (err) return done();
                done();
            });
    });
    it('should get user successfully', (done) => {
        chai.request(app)
            .get('/api/v1/auth/user')
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.equal('Successful got the data');
                if (err) return done();
                done();
            });
    });
    it('User should be authenticated', (done) => {
        chai.request(app)
            .get('/api/v1/auth/user')
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
                if (err) return done();
                done();
            });
    });
});
