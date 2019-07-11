/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import jwt from '../../utils/helpers/jwt';

let toke, wrongUser;

chai.use(chaiHttp);
chai.should();
before('generate JWT', () => {
    wrongUser = jwt.newToken({ email: 'testtest@test.com', id: 3 });
});
before('generate token', () => {
    toke = jwt.newToken({ email: 'testtest@tes.co', id: 1 });
});
before('generate new property', (done) => {
    chai.request(app)
        .post('/api/v1/property')
        .send({
            price: 400,
            state: 'Kenya',
            city: 'Nairobi',
            type: 'apartment',
            address: 'kenya, 5th street',
        })
        .set('authorization', `Bearer ${toke}`)
        .end((err) => {
            if (err) return done();
            done();
        });
});
describe('Delete property', () => {
    it('should delete his/her own posts', (done) => {
        chai.request(app)
            .delete('/api/v1/property/1')
            .set('authorization', `Bearer ${wrongUser}`)
            .end((err, res) => {
                res.should.have.status(406);
                res.body.should.be.a('object');
                res.body.message.should.equal('None of the ads with such id belongs to you');
                if (err) return done();
                done();
            });
    });
    it('should delete advert successfully', (done) => {
        chai.request(app)
            .delete('/api/v1/property/1')
            .set('authorization', `Bearer ${toke}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.equal('delete property successfully');
                if (err) return done();
                done();
            });
    });
    it('confirm the advert is deleted', (done) => {
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
