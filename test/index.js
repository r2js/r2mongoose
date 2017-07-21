const chai = require('chai');

const expect = chai.expect;
const mongoose = require('../index')({}, { database: 'r2mongoose' });

describe('r2mongoose', () => {
  describe('connection', () => {
    it('should connect to mongodb', () => {
      expect(mongoose).to.not.equal(undefined);
      expect(mongoose.connection.name).to.equal('r2mongoose');
    });
  });
});
