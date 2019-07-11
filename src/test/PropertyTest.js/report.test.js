/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import jwt from '../../utils/helpers/jwt';

let token;

chai.use(chaiHttp);
chai.should();
before('generate token', () => {
    token = jwt.newToken({ email: 'testtest@tes.co', id: 1 });
});
describe('Post fraud report property', () => {
    it('should create new report successfully', (done) => {
        chai.request(app)
            .post('/api/v1/property/2/flag')
            .send({
                reason: 'price',
                description: 'The price is to high for this property',
            })
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.message.should.equal('successfully created a report');
                if (err) return done();
                done();
            });
    });
    it('should have a reason', (done) => {
        chai.request(app)
            .post('/api/v1/property/2/flag')
            .send({
                reason: '',
                description: 'The price is to high for this property',
            })
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Please fill all fields');
                if (err) return done();
                done();
            });
    });
    it('should have a description', (done) => {
        chai.request(app)
            .post('/api/v1/property/2/flag')
            .send({
                reason: 'price',
                description: '',
            })
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Please fill all fields');
                if (err) return done();
                done();
            });
    });
    it('should find the property with the id', (done) => {
        chai.request(app)
            .post('/api/v1/property/12/flag')
            .send({
                reason: 'price',
                description: 'The price is to high for this property',
            })
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.message.should.equal('Property with such id does not exists');
                if (err) return done();
                done();
            });
    });
    it('user should be logged in', (done) => {
        chai.request(app)
            .post('/api/v1/property/2/flag')
            .send({
                reason: 'price',
                description: 'The price is to high for this property',
            })
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
                res.body.message.should.equal('Token required');
                if (err) return done();
                done();
            });
    });
});
