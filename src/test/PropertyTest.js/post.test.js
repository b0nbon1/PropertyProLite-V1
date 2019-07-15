/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import jwt from '../../utils/helpers/jwt';
import data from '../Mockdata/property';

let token;
const wrongToken = '654gyujy5ygre';

chai.use(chaiHttp);
chai.should();
before('generate token', () => {
    token = jwt.newToken({ email: 'testtest@tes.co', id: 1 });
});
describe('Create new advert', () => {
    it('should check if token available', (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send(data.property1)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
                res.body.message.should.equal('Token required');
                if (err) return done();
                done();
            });
    });
    it('should check if token is valid', (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send(data.property1)
            .set('authorization', `Bearer ${wrongToken}`)
            .end((err, res) => {
                res.should.have.status(403);
                if (err) return done();
                done();
            });
    });
    it('should create new ad successfully', (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send(data.property1)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.message.should.equal('successfully created an advert');
                if (err) return done();
                done();
            });
    });
    it('should have a price', (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send(data.property2)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Please fill all the fields');
                if (err) return done();
                done();
            });
    });
    it('should contain state where the property is', (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send(data.property3)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Please fill all the fields');
                if (err) return done();
                done();
            });
    });
    it('should contain a city', (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send(data.property4)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Please fill all the fields');
                if (err) return done();
                done();
            });
    });
    it('should contain type of property', (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send(data.property5)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Please fill all the fields');
                if (err) return done();
                done();
            });
    });
    it('should property should have an address', (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send(data.property6)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Please fill all the fields');
                if (err) return done();
                done();
            });
    });
    it('should property should have Valid price', (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send(data.property7)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Price should be a positive float');
                if (err) return done();
                done();
            });
    });
    it('should property should have a valid State', (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send(data.property8)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Please enter valid State');
                if (err) return done();
                done();
            });
    });
    it('should property should have a valid city name', (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send(data.property9)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Please enter valid city');
                if (err) return done();
                done();
            });
    });
    it('should property should have a valid type that exists', (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send(data.property10)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Please enter a valid type of property');
                if (err) return done();
                done();
            });
    });
    it('should property should have a valid address', (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .send(data.property11)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Please enter a valid address of property');
                if (err) return done();
                done();
            });
    });
    it('should successfully upload image from locally', (done) => {
        chai.request(app)
            .post('/api/v1/property')
            .field(data.property13)
            .attach('photo', data.image)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                const photo = res.body.data;
                res.should.have.status(201);
                res.body.should.be.a('object');
                photo.should.have.property('imageUrl');
                res.body.message.should.equal('successfully created an advert');
                if (err) return done();
                done();
            });
    });
});
