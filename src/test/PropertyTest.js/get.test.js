import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
chai.should();
describe('get all adverts', () => {
    it('should get all advert successfully', (done) => {
        chai.request(app)
            .get('/api/v1/property')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.equal('got all properties successfully');
                if (err) return done();
                done();
            });
    });
});
describe('get specific adverts', () => {
    it('should get specific advert successfully', (done) => {
        chai.request(app)
            .get('/api/v1/property/2')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.equal('got property successfully');
                if (err) return done();
                done();
            });
    });
    it('should find the property with the id', (done) => {
        chai.request(app)
            .get('/api/v1/property/14')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.message.should.equal('Property with such id does not exists');
                if (err) return done();
                done();
            });
    });
});
describe('Get specific property', () => {
    it('should get properties by specific type', (done) => {
        chai.request(app)
            .get('/api/v1/properties?type=apartment')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.equal('got specific type Successful');
                if (err) return done();
                done();
            });
    });
    it('property type should exist should', (done) => {
        chai.request(app)
            .get('/api/v1/properties?type=bedroom')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.message.should.equal('adverts with this type does not exists');
                if (err) return done();
                done();
            });
    });
    it('should have the query', (done) => {
        chai.request(app)
            .get('/api/v1/properties?type=')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.message.should.equal('Please ensure there is query type made');
                if (err) return done();
                done();
            });
    });
});
